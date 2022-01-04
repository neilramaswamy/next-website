import React from 'react'
import {
    Bit,
    convertToTwosComplement,
    DecimalRangePolicy,
    generateDecimalValuesForBits,
} from './util'

interface Input {
    minimumWidth: number
    initialWidth: number
    maximumWidth: number

    initialDecimalValue: number
    decimalRangePolicy: DecimalRangePolicy
}

interface TwosComplementReturn {
    // Width stuff
    width: number
    minimumWidth: number
    maximumWidth: number
    canDecrementWidth: boolean
    canIncrementWidth: boolean
    onDecrementWidth: () => void
    onIncrementWidth: () => void

    // Useful constants
    decimalSum: number
    // Minimum/maximum as according to the range policy
    minimumDecimal: number
    maximumDecimal: number

    // The number arrays themselves
    bitArray: number[]
    decArray: number[]

    // Ways to mutate the current number
    canDecrementDecimal: boolean
    canIncrementDecimal: boolean
    onDecrementDecimal: () => void
    onIncrementDecimal: () => void
}

// Don't let width affect the bits, set the bits explicitly

export const useTwosComplement = (input: Input): TwosComplementReturn => {
    const { minimumWidth, initialWidth, maximumWidth, initialDecimalValue, decimalRangePolicy } =
        input

    // This is unsafe to return. When returning width, base it off of the bit array length
    const [width, setWidth] = React.useState(initialWidth)

    const [bitArray, setBitArray] = React.useState<Bit[]>([])
    const decimalValueGenerator = React.useCallback(
        () => generateDecimalValuesForBits(bitArray),
        [bitArray],
    )
    const decArray = decimalValueGenerator()

    // Some helpful constants
    const decimalSum = decArray.reduce((acc, v) => acc + v, 0)
    const minimumDecimal = decimalRangePolicy === 'non-negative' ? 0 : -Math.pow(2, width - 1)
    const maximumDecimal = decimalRangePolicy === 'negative' ? -1 : Math.pow(2, width - 1) - 1

    React.useEffect(() => {
        setBitArray(convertToTwosComplement(initialDecimalValue, width))
    }, [width])

    const canDecrementWidth = width > minimumWidth
    const onDecrementWidth = (): void => {
        if (canDecrementWidth) {
            setWidth(width - 1)
        }
    }

    const canIncrementWidth = width < maximumWidth
    const onIncrementWidth = (): void => {
        if (canIncrementWidth) {
            setWidth(width + 1)
        }
    }

    const canDecrementDecimal = decimalSum > minimumDecimal
    const onDecrementDecimal = (): void => {
        if (!canDecrementDecimal) {
            return
        }

        setBitArray(convertToTwosComplement(decimalSum - 1, width))
    }

    const canIncrementDecimal = decimalSum < maximumDecimal
    const onIncrementDecimal = (): void => {
        if (!canIncrementDecimal) {
            return
        }

        setBitArray(convertToTwosComplement(decimalSum + 1, width))
    }

    return {
        width,
        minimumWidth,
        maximumWidth,
        canDecrementWidth,
        canIncrementWidth,
        onDecrementWidth,
        onIncrementWidth,

        decimalSum,
        minimumDecimal,
        maximumDecimal,

        bitArray,
        decArray,

        canDecrementDecimal,
        canIncrementDecimal,
        onDecrementDecimal,
        onIncrementDecimal,
    }
}
