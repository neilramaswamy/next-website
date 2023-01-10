// Represents all of the types used to program the consistency model widgets.
//
// Most of these type definitions come from: https://arxiv.org/abs/1512.00168
// If they do, the relevant section will be given in the relevant comment.

export enum ConsistencyModel {
    Lin,
    SeqCon,
    Causal,
    Pram,
}

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
    // The ending time of the operation
    etime: number
    // Not a field as defined in the paper, but it represents the linearization point, if there is
    // one. This value must be greater than or equal to stime, and less than etime.
    ltime: number | undefined
}
