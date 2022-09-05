/**
 * Implements various consistency predicates. HISTORIES are not *technically* sequentially consistent or
 * a linearization. Those predicates apply only to serializations of histories. However, a linearizable
 * history means that there exists a valid serialization that is linearizable.
 *
 * Read Your Writes: every read in a serialization should return the value of the last write before it
 *
 * Monotonic reads: if you have two reads r_1 and r_2, then r_2 should only see values between
 * the value read at r_1 and writes before r_2.
 *
 * Monotonic writes: w is issued only on a replica only if the replica has applied all writes previous to w from
 * the session of w
 *
 * PRAM: all three of the above, or just that all processes see writes in the same order as they invoked
 * by the process
 *
 * Writes follow reads (session causality):
 *
 *
 * PRAM is a weak ordering guarantee: it says that the order of a process' writes are consistent
 * across all replicas.
 *
 * Causal:
 *
 * Sequentially consistency is a relatively strong ordering guarantee. It says that all replicas
 * have the same writes, in the same order. Also, reads return the latest value written.
 *
 * Linearizable: is sequentially consistent with a real-time recency guarantee. A write becomes
 * visible at some point between its invocation and its return.
 */

import { assert } from 'util/assert'
import { Operation, OperationHistory, Serialization } from './types'

/**
 * Determines whether each processes' serialization orders writes belonging to the same process
 * in the same way as the process does.
 *
 * Guarantee of ordering: a process' writes are applied in the same order globally.
 */
export const isPRAM = (h: OperationHistory, s: Serialization): boolean => {
    for (let i = 0; i < s.length; i++) {
        // The correct serialization is that from the *history*
        const correctSerialization = processOperationsToString(h[i])

        // For each serialization, verify that it gets the order right for process i, where the
        // "right" ordering is given by correctSerialization.
        for (let j = 0; j < s.length; j++) {
            const processIdSerializationForProcessI = processOperationsToString(
                s[j].filter((op) => op.proc === i)
            )

            if (processIdSerializationForProcessI !== correctSerialization) {
                return false
            }
        }
    }

    return true
}

/**
 * Returns whether all replicas serialize the history in the same way and that the ordering
 * determined by each process is preserved. Value written by the last write.
 *
 * Guarantee of ordering: total ordering. Not necessarily recent.
 */
export const isSequentiallyConsistent = (
    h: OperationHistory,
    s: Serialization
): boolean => {
    return true
}

/**
 * Guarantee of ordering and recency. Total order, real-time recent.
 *
 * Sequentially consistent, with the real-time guarantee.
 */
export const isLinearizable = (
    h: OperationHistory,
    s: Serialization
): boolean => {
    return true
}

/**
 * RealTime dictates that if a returns before b, then a must come before b in the arbitration
 * order.
 *
 * Internally, this function works by constructing the arb (a total order) from the given
 * serialization, as well as the returns-before relation from the history. Then, it checks that
 * every element in the returns-before relation is present in arb.
 *
 * NOTE: we could construct a serialization from the given history h, if it has linearization
 * points set.
 */
export const RealTime = (h: History, arb: Operation[]): boolean => {
    return true
}

/**
 * RVal is defined, for read/write storage, to be the value written by the last write according
 * to the arbitration order.
 */
export const RVal = (arb: Operation[]): boolean => {
    return true
}

/**
 * Returns whether all processes have serialized the operations in the same way.
 *
 * Internally, this function checks that the order of operation IDs for all processes equal
 * the first processes' order of operation IDs.
 */
export const SingleOrder = (h: History, s: Serialization): boolean => {
    if (s.length === 0) {
        return true
    }

    const extractOperationIds = (operations: Operation[]): string[] => {
        return operations.map((op) => op.operationId)
    }

    const firstProcOperationIds = extractOperationIds(s[0])
    return s.every((serialization) =>
        arrayElementEquality(
            firstProcOperationIds,
            extractOperationIds(serialization)
        )
    )
}

const arrayElementEquality = (a: string[], b: string[]): boolean => {
    return a.length === b.length && a.every((val, i) => val === b[i])
}

const processOperationsToString = (ops: Operation[]): string => {
    return ops.map((op) => op.operationId).join('-')
}
