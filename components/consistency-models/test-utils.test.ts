import { describe, expect, test, beforeEach } from '@jest/globals'
import { generateSessionProjection } from './test-utils'
import { Operation, OperationType } from './types'

describe('generating a session projection', () => {
    test('generating a projection with one write and one read', () => {
        const proj = generateSessionProjection('---[x<-3]------[x->4]', 0)
        const expected: Operation[] = [
            {
                proc: 0,
                type: OperationType.Write,

                obj: 'x',
                ival: 3,
                oval: null,

                stime: 3,
                etime: 8,
            },
            {
                proc: 0,
                type: OperationType.Read,

                obj: 'x',
                ival: null,
                oval: 4,

                stime: 15,
                etime: 20,
            },
        ]

        expect(proj).toEqual(expected)
    })

    test('generating a projection with different objects', () => {
        const proj = generateSessionProjection(
            `[x<-10]---[y->11]---[x->10]---[z<-100]---[y->11]`,
            3
        )
        const expected: Operation[] = [
            {
                proc: 3,
                type: OperationType.Write,
                obj: 'x',
                ival: 3,
                oval: null,
                stime: 0,
                etime: 6,
            },
            {
                proc: 3,
                type: OperationType.Read,
                obj: 'y',
                ival: null,
                oval: 11,
                stime: 10,
                etime: 16,
            },
            {
                proc: 3,
                type: OperationType.Read,
                obj: 'x',
                ival: null,
                oval: 10,
                stime: 20,
                etime: 26,
            },
            {
                proc: 3,
                type: OperationType.Write,
                obj: 'z',
                ival: 100,
                oval: null,
                stime: 30,
                etime: 36,
            },
            {
                proc: 3,
                type: OperationType.Write,
                obj: 'y',
                ival: null,
                oval: 11,
                stime: 40,
                etime: 46,
            },
        ]
    })
})
