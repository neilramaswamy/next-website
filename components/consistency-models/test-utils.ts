import { assert } from 'console'
import {
    Operation,
    OperationHistory,
    OperationType,
    Serialization,
} from './types'

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

    const regex = /\[([A-Z]):([a-z])(<-|->)(\d)\]/g
    const matches = line.matchAll(regex)

    for (const match of matches) {
        const operationId = match[1]
        const obj = match[2]
        const arrow = match[3]
        const value = parseInt(match[4], 10)

        assert(
            match.index !== undefined,
            `Match index was undefined for ${match}`
        )

        const operationType =
            arrow === '->' ? OperationType.Read : OperationType.Write
        const ival = operationType === OperationType.Write ? value : null
        const oval = operationType === OperationType.Read ? value : null

        const stime = match.index || 0
        // Subtract one since the end time is inclusive
        const etime = stime + match[0].length - 1

        operations.push({
            proc,
            operationId,

            operationType,
            obj,
            ival,
            oval,

            stime,
            etime,
        })
    }

    return operations
}

/**
 * Generates an array of Operations using a history and a list of processId names separated by
 * space.
 */
export const generateSerialization = (
    history: OperationHistory,
    serialization: string
): Operation[] => {
    const map: { [key: string]: Operation } = {}
    history
        .flatMap((_) => _)
        .forEach((value) => (map[value.operationId] = value))

    const operationIds = serialization.split(' ')
    return operationIds.map((operationId) => map[operationId])
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
