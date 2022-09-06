import { describe, expect, test, beforeEach } from '@jest/globals'
import {
    isSequentiallyConsistent,
    PRAM,
    RVal,
    SequentiallyConsistent,
    SingleOrder,
} from './predicates'
import {
    generateOperationHistoryFromString,
    generateSerialization,
} from './test-utils'
import { OperationHistory, OperationType, Serialization } from './types'

describe('read-after-write consistency', () => {
    test('consistent reads are consistent for a single process', () => {
        const history = `
        ---[A:x<-3]-------[B:x->3]-----[C:x<-4]---
        `
        const serialization = `---A---B---C`
    })

    test('inconsistent reads are inconsistent for a single process', () => {
        const history = `
        ----[A:x<-3]----[B:x->3]----[C:x->4]
        `
        const serialization = `---A---B---C`
    })

    test('reads can return the most recent write on their process, or the most recent write in arb', () => {
        const latestReadHistory = `
        ----[A:x<-3]--------------[C:x->4]
        --------------[B:x<-4]------------
        `
        const latestReadSerialization = `
        ---A---B---C
        ---A---B----
        `

        const staleReadHistory = `
        ----[A:x<-3]--------------[C:x->3]
        --------------[B:x<-4]------------
        `
        const staleReadSerialization = `
        ---A---B---C
        ---A---B----
        `
    })

    test('all processes are checked for read-after-write consistency', () => {})
})

describe('PRAM consistency', () => {
    const historyString = `
    ---[A:x<-1]-----[C:x<-3]-------[E:x<-5]----------------[G:x<-7]
    -------------[B:x<-2]-------[D:x<-4]------[F:x<-6]---[H:x<-8]--
    `
    const history = generateOperationHistoryFromString(historyString)

    test('PRAM consistent serialization that is not sequentially consistent', () => {
        const S_P0 = generateSerialization(history, 'A B C E D G F H')
        const S_P1 = generateSerialization(history, 'A C E G B D F H')

        expect(PRAM(history, [S_P0, S_P1])).toBe(true)
    })

    test('PRAM consistent serialization that is sequentially consistent', () => {
        const S_P0 = generateSerialization(history, 'A B C E D G F H')

        expect(PRAM(history, [S_P0, S_P0])).toBe(true)
    })

    test('PRAM consistent serialization that is linearizable', () => {
        const S_P0 = generateSerialization(history, 'A C B D E F H G')

        expect(PRAM(history, [S_P0, S_P0])).toBe(true)
    })

    test('PRAM inconsistent serialization due to out-of-order writes on one process', () => {
        // Switch A and C
        const S_P0 = generateSerialization(history, 'C A E G B D F H')

        expect(PRAM(history, [S_P0, S_P0])).toBe(false)
    })
})

describe('RVal consistency', () => {
    test('single process consistency', () => {
        const historyString = `
        -----[A:x<-3]---[B:x->3]---[C:x<-4]---[D:x->4]
        `
        const history = generateOperationHistoryFromString(historyString)
        const serialization = generateSerialization(history, 'A B C D')

        expect(RVal(history, [serialization])).toBe(true)
    })

    test('single process inconsistency because of an old value', () => {
        const historyString = `
        -----[A:x<-3]---[B:x->3]---[C:x<-4]---[D:x->3]
        `
        const history = generateOperationHistoryFromString(historyString)
        const serialization = generateSerialization(history, 'A B C D')

        expect(RVal(history, [serialization])).toBe(false)
    })

    test('RVal inconsistency because of a never-written-before value', () => {
        const historyString = `
        -----[A:x<-3]---[B:x->4]---[C:x<-4]---[D:x->5]
        `
        const history = generateOperationHistoryFromString(historyString)
        const serialization = generateSerialization(history, 'A B C D')

        expect(RVal(history, [serialization])).toBe(false)
    })
})

describe('sequential consistency', () => {
    // single order, pram, and rval

    const historyString = `
    ---[A:x<-1]-----[C:x<-3]-------[E:x<-5]----------------[G:x<-7]
    -------------[B:x<-2]-------[D:x<-4]------[F:x<-6]---[H:x<-8]--
    `
    const history = generateOperationHistoryFromString(historyString)

    test('sequentially inconsistent because not single order', () => {
        // PRAM and RVAL. There's no RVAL to check!
        const S_P0 = generateSerialization(history, 'A C E G B D F H')
        const S_P1 = generateSerialization(history, 'B D F H A C E G')

        expect(SingleOrder(history, [S_P0, S_P1])).toBe(false)
        expect(PRAM(history, [S_P0, S_P1])).toBe(true)
        expect(RVal(history, [S_P0, S_P1])).toBe(true)

        expect(SequentiallyConsistent(history, [S_P0, S_P1])).toBe(false)
    })

    test('sequentially inconsistent because not pram', () => {
        // Single order
        const S_P0 = generateSerialization(history, 'A E C G B D F H')
        const S_P1 = generateSerialization(history, 'A E C G B D F H')

        expect(SingleOrder(history, [S_P0, S_P1])).toBe(true)
        expect(PRAM(history, [S_P0, S_P1])).toBe(false)
        expect(RVal(history, [S_P0, S_P1])).toBe(true)

        expect(SequentiallyConsistent(history, [S_P0, S_P1])).toBe(false)
    })

    test('sequentially inconsistent because not rval', () => {
        // TODO(neil): How come the paper never includes reads in the serialization?
    })

    test('multiple different sequentially consistent serializations are accepted for the same history', () => {
        const S_P0 = generateSerialization(history, 'A B C E D G F H')
        const S_P1 = generateSerialization(history, 'A C E G B D F H')

        expect(SequentiallyConsistent(history, [S_P0, S_P0])).toBe(true)
        expect(SequentiallyConsistent(history, [S_P1, S_P1])).toBe(true)
    })
})
