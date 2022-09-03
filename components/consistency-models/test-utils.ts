import { assert } from 'console'
import { Operation, OperationHistory, OperationType } from './types'

/**
 * Takes a string-based representation of an operation history and returns an OperationHistory that
 * logically represents the string.
 *
 * The string-based format must conform to the following format:
 *  - Each operation must be enclosed by pipes
 *  - Two operations are supported: reads (r) and writes (w). To denote writing a value v,
 *    use the syntax |w<-v|. To denote reading a value v, use the syntax |r->v|.
 *  - Between events in the same process, hyphens must be used
 *  - All lines must have the same length
 * @param h the string-based representation of a history
 */
export const generateOperationHistoryFromString = (
    h: string
): OperationHistory => {
    const processes = h
        .trim()
        .split('\n')
        .map((p) => p.trim())
    if (processes.length === 0) {
        return []
    }

    // Make sure that all processes are the same length
    const firstLength = processes[0].length
    processes.forEach((p, i) => {
        if (p.length !== firstLength) {
            throw new Error(
                `Line ${i} had length of ${p.length}, expected ${firstLength}`
            )
        }
    })

    return processes.map((line, proc) => generateSessionProjection(line, proc))
}

// No need to user an actual parser since this is fairly simple
export const generateSessionProjection = (
    line: string,
    proc: number
): Operation[] => {
    let operations: Operation[] = []
    for (let i = 0; i < line.length; i++) {
        if (line[i] === '-') {
            continue
        }

        const opIndex = i + 1
        const arrowStartIndex = i + 2
        const arrowEndIndex = i + 3
        const valueStartIndex = i + 4

        let operation = null
        let stime = null
        let etime = null
        let ival = null
        let oval = null

        // There should be at least
        if (line[i] === '[') {
            const endingBracketIndex = line.indexOf(']', opIndex)
            if (endingBracketIndex < 0) {
                throw new Error(
                    `Could not find matching '|' for starting pipe at index ${i} for line: ${line}`
                )
            }

            // Validate the operation
            const obj = line[i + 1]

            // Validate the arrow
            const arrow = line.substring(arrowStartIndex, arrowEndIndex + 1)
            if (arrow === '<-') {
                operation = OperationType.Write
            } else if (arrow === '->') {
                operation = OperationType.Read
            } else {
                throw new Error(`Expected "<-" after operation r, got ${arrow}`)
            }

            // Parse out the value
            const valueStr = line.substring(valueStartIndex, endingBracketIndex)
            const value = parseInt(valueStr, 10)
            assert(!isNaN(value), `Couldn't parse value ${value} into a number`)

            // Assemble all the values we need for the operation object
            stime = i
            etime = endingBracketIndex
            ival = operation === OperationType.Read ? null : value
            oval = operation === OperationType.Read ? value : null

            operations.push({
                proc,
                type: operation,

                obj,
                ival,
                oval,

                stime,
                etime,
            })

            i = endingBracketIndex + 1
        }
    }

    return operations
}

/*
const foo = `
|x<-3|---------|x->3|---------
-------|w<-10|----------------
`

const bar = `
|w<-3|---------|r<-10|--------
-------|w<-10|----------------
`
*/
