// Represents all of the types used to program the consistency model widgets.
//
// Most of these type definitions come from: https://arxiv.org/abs/1512.00168
// If they do, the relevant section will be given in the relevant comment.

export enum OperationType {
    Read = 1,
    Write,
}

// As defined at the beginning of §2.2
export interface Operation {
    // The process ID that is executing this operation
    proc: number
    // A unique, human readable event name for this operation
    operationId: string

    // The type of operation being applied to the given object
    operationType: OperationType
    // The object (denoted as a string) on which the operation is taking place
    obj: string
    // The input value to the operation, which might not exist
    ival: number | null
    // The output value from the operation, which might not exist
    oval: number | null

    // The starting time of the operation
    stime: number
    // The ending time of the operation, which might not exist if the operation does not return
    etime: number | null
    // Not a field as defined in the paper, but it represents the linearization point, if there is
    // one. This value must be greater than or equal to stime, and less than etime.
    ltime?: number
}

// While an OperationHistory is defined to be a Set<Operation> in the paper, it's better for us to
// represent it as an array of arrays. The outer array represents all the processes, and the inner
// arrays represent the Operations that that process undertakes.
//
// This is to say that a OperationHistory has the following invariant:
//      ∀i ∈ processIds, ∀op ∈ OperationHistory[i] : op.proc == i
export type OperationHistory = Operation[][]

// Defined at the end of §2.2: a serialization represents the order in which an execution process
// may observe writes from the system.
export type Serialization = Operation[][]

// This is never explicitly defined in the paper, but it should be clear that linearizable, causal,
// sequentially consistent, etc. are all consistency predicates.
export type ConsistencyPredicate = (
    h: OperationHistory,
    s: Serialization
) => boolean
