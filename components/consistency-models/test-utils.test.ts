import { describe, expect, test, beforeEach } from '@jest/globals'
import {
    generateOperationHistoryFromString,
    generateSerialization,
    generateSessionProjection,
} from './test-utils'
import { Operation, OperationType } from './types'

describe('generating a session projection', () => {
    test('generating a projection with one write and one read', () => {
        const proj = generateSessionProjection('---[A:x<-3]------[B:x->4]', 0)
        const expected: Operation[] = [
            {
                proc: 0,
                operationId: 'A',

                operationType: OperationType.Write,
                obj: 'x',
                ival: 3,
                oval: null,

                stime: 3,
                etime: 10,
            },
            {
                proc: 0,
                operationId: 'B',

                operationType: OperationType.Read,
                obj: 'x',
                ival: null,
                oval: 4,

                stime: 17,
                etime: 24,
            },
        ]

        expect(proj).toEqual(expected)
    })

    test('generating a projection with different objects', () => {
        const proj = generateSessionProjection(
            `[A:x<-1]---[B:y->2]---[C:x->1]---[D:z<-3]---[E:y->4]`,
            3
        )
        const expected: Operation[] = [
            {
                proc: 3,
                operationId: 'A',
                operationType: OperationType.Write,
                obj: 'x',
                ival: 1,
                oval: null,
                stime: 0,
                etime: 7,
            },
            {
                proc: 3,
                operationId: 'B',
                operationType: OperationType.Read,
                obj: 'y',
                ival: null,
                oval: 2,
                stime: 11,
                etime: 18,
            },
            {
                proc: 3,
                operationId: 'C',
                operationType: OperationType.Read,
                obj: 'x',
                ival: null,
                oval: 1,
                stime: 22,
                etime: 29,
            },
            {
                proc: 3,
                operationId: 'D',
                operationType: OperationType.Write,
                obj: 'z',
                ival: 3,
                oval: null,
                stime: 33,
                etime: 40,
            },
            {
                proc: 3,
                operationId: 'E',
                operationType: OperationType.Read,
                obj: 'y',
                ival: null,
                oval: 4,
                stime: 44,
                etime: 51,
            },
        ]

        expect(proj).toEqual(expected)
    })
})

describe('generating a serialization from a history and a string', () => {
    test('generating a two-process serialization', () => {
        const historyString = `
        ---[A:x<-3]----------[C:y->5]
        ------------[B:y->5]---------
        `
        const history = generateOperationHistoryFromString(historyString)

        const linearizableSerialization = generateSerialization(
            history,
            'A B C'
        )
        expect(linearizableSerialization).toEqual([
            history[0][0],
            history[1][0],
            history[0][1],
        ])

        const sequentiallyConsistentSerialization = generateSerialization(
            history,
            'B A C'
        )
        expect(sequentiallyConsistentSerialization).toEqual([
            history[1][0],
            history[0][0],
            history[0][1],
        ])
    })
})
