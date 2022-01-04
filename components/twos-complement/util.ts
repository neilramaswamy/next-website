export type Bit = 0 | 1
export type DecimalRangePolicy = 'non-negative' | 'negative' | 'all'

// Determines the numerical value we can interpret each bit to be, where bits is a twos-complement
// representation of a number.
//
// If bits were [0, 1, 0, 1], then we would return [0, 4, 0, 1] = [0, 2^2, 0, 2^0]
// If bits were [1, 1, 0, 1], then we would return [-8, 4, 0, 1] = [-(2^3), 2^2, 0, 2^0]
export const generateDecimalValuesForBits = (bits: Bit[]): number[] => {
    const decimalValues = Array<number>(bits.length).fill(0)
    for (let i = 0; i < bits.length; i++) {
        if (i == 0) {
            const isNegative = bits[0] == 1
            decimalValues[i] = isNegative ? -Math.pow(2, bits.length - 1) : 0
        } else {
            decimalValues[i] = Math.pow(2, bits.length - 1 - i) * bits[i]
        }
    }
    return decimalValues
}

export const convertToTwosComplement = (n: number, width: number): Bit[] => {
    // Validate
    const smallestPossible = -Math.pow(2, width - 1)
    const largestPossible = Math.pow(2, width - 1) - 1

    if (n < smallestPossible || n > largestPossible) {
        throw new Error(`Impossible value of ${n} to convert within ${width} bits`)
    }

    const bits = Array<Bit>(width).fill(0)

    const isNegative = n < 0
    let rest: number
    if (isNegative) {
        bits[0] = 1
        // (-2^(w - 1) + rest = n)
        // So, rest = 2^(w - 1) + n
        rest = -smallestPossible + n
    } else {
        rest = n
    }

    let restAsBinary = (rest >>> 0)
        .toString(2)
        .padStart(width - 1, '0')
        .split('')
        .map((v) => parseInt(v)) as Bit[]

    return [isNegative ? 1 : 0, ...restAsBinary]
}
