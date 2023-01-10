import { useRef, useState } from 'react'
import { PRAM, SequentiallyConsistent } from './predicates'
import {
    generateOperationHistoryFromString,
    generateSerialization,
} from './test-utils'
import { Operation, OperationHistory, OperationType } from './types'
import styles from './DemoWidget.module.scss'
import Draggable from 'react-draggable'

interface Props {
    isInteractable: boolean
    history: OperationHistory
}

// Resize the operational history to fit within the range [0, outerBound).
//
// This is used because we have a fixed number of pixels into which to render the interactive
// component, and this number of pixels differs from the internal string-based representation
// of histories.
const resizeOperationHistory = (
    history: OperationHistory,
    outerBound: number
): OperationHistory => {
    // First, find the earliest start time and latest return time
    let earliestStart = Infinity
    let latestReturn = -Infinity

    history.forEach((program) =>
        program.forEach((operation) => {
            earliestStart = Math.min(operation.stime, earliestStart)
            latestReturn = Math.max(operation.etime, latestReturn)
        })
    )

    // Need to convert something like [0, 40] into [0, 800]
    const multiplicativeFactor = outerBound / latestReturn

    return history.map((program) =>
        program.map((operation) => {
            return {
                ...operation,
                stime: operation.stime * multiplicativeFactor,
                etime: operation.etime * multiplicativeFactor,
                ltime:
                    operation.ltime === undefined
                        ? undefined
                        : operation.ltime * multiplicativeFactor,
            }
        })
    )
}

const stringifyOperation = (operation: Operation): string => {
    if (operation.operationType === OperationType.Read) {
        return `${operation.operationId}:${operation.obj}→${operation.oval}`
    } else if (operation.operationType === OperationType.Write) {
        return `${operation.operationId}:${operation.obj}←${operation.ival}`
    } else {
        throw new Error('Not supported')
    }
}

const VisualHistory = (props: Props): JSX.Element => {
    const { isInteractable, history } = props

    // Pixels
    const width = 400

    const resizedHistory = resizeOperationHistory(history, width)

    return (
        <div className={styles.programsContainer}>
            {resizedHistory.map((program) => (
                <div style={{ width }} className={styles.programContainer}>
                    {program.map((operation) => (
                        <Draggable
                            axis="x"
                            defaultClassName={styles.operationContainer}
                            defaultPosition={{ x: operation.stime, y: -12 }}
                            bounds={{
                                left: 0,
                                right:
                                    width - (operation.etime - operation.stime),
                            }}
                        >
                            <span className={styles.operationText}>
                                {stringifyOperation(operation)}
                            </span>
                        </Draggable>
                    ))}

                    {/* This should be relatively positioned. */}
                    <div className={styles.programLine} />
                </div>
            ))}
        </div>
    )
}

export const DemoWidget = (): JSX.Element => {
    const [isPRAM, setIsPRAM] = useState(false)
    const [isSC, setIsSC] = useState(false)

    const [hString, setHString] = useState('')
    const [serString, setSerString] = useState('')

    return (
        <div>
            <h3>History</h3>

            <VisualHistory
                history={generateOperationHistoryFromString(`
            -------[A:x<-3]------------------[C:x<-4]---
            -------------------[B:x->3]-----------------
            `)}
                isInteractable={false}
            />

            <h3>Serialization</h3>

            <VisualHistory
                history={generateOperationHistoryFromString(`
            -------[A:x<-3]----[B:x->3]--------------[C:x<-4]---
            --[A:x<-3]----[B:x->3]--------------[C:x<-4]--------
            `)}
                isInteractable={true}
            />
            <br />

            <button
                onClick={() => {
                    // Validate that the history is ok
                    const history = generateOperationHistoryFromString(hString)
                    const processSerializations = serString.trim().split('\n')

                    const serializations = processSerializations.map((s) =>
                        generateSerialization(history, s)
                    )

                    setIsPRAM(PRAM(history, serializations))
                    setIsSC(SequentiallyConsistent(history, serializations))
                }}
            >
                Submit
            </button>

            <ul>
                <li>PRAM: {isPRAM ? 'true' : 'false'}</li>
                <li>Sequentially Consistent: {isSC ? 'true' : 'false'}</li>
            </ul>
        </div>
    )
}
