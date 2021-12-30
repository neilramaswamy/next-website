import React from 'react'
import styles from './TwosComplementLabelled.module.scss'
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Zap, ZapOff } from 'react-feather'
import cc from 'util/cc'

const MIN_BIT_WIDTH = 2
const DEFAULT_BIT_WIDTH = 4
const MAX_BIT_WIDTH = 5
type Bit = 0 | 1

// Determines the numerical value we can interpret each bit to be, where bits is a twos-complement
// representation of a number.
//
// If bits were [0, 1, 0, 1], then we would return [0, 4, 0, 1] = [0, 2^2, 0, 2^0]
// If bits were [1, 1, 0, 1], then we would return [-8, 4, 0, 1] = [-(2^3), 2^2, 0, 2^0]
const generateDecimalValuesForBits = (bits: Bit[]): number[] => {
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

const convertToTwosComplement = (n: number, width: number): Bit[] => {
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

export const TwosComplementLabelled = (): JSX.Element => {
    const [width, setWidth] = React.useState(DEFAULT_BIT_WIDTH)
    const [bits, setBits] = React.useState<Bit[]>([])
    const [decimalValues, setDecimalValues] = React.useState<number[]>([])

    const currentSum = decimalValues.reduce((acc, v) => acc + v, 0)

    const smallestPossible = -Math.pow(2, width - 1)
    const isAtSmallestPossible = currentSum === smallestPossible
    const largestPossible = Math.pow(2, width - 1) - 1
    const isAtLargetPossible = currentSum === largestPossible

    React.useEffect(() => {
        setBits(new Array(width).fill(1))
    }, [width])

    // Bits can change either from increment/decrement or width
    React.useEffect(() => {
        setDecimalValues(generateDecimalValuesForBits(bits))
    }, [bits])

    const decrementNumber = (): void => {
        if (isAtSmallestPossible) {
            return
        }

        setBits(convertToTwosComplement(currentSum - 1, width))
    }

    const incrementNumber = (): void => {
        if (isAtLargetPossible) {
            return
        }

        setBits(convertToTwosComplement(currentSum + 1, width))
    }

    const canDecreaseWidth = width > MIN_BIT_WIDTH
    const canIncreaseWidth = width < MAX_BIT_WIDTH

    const decreaseWidth = (): void => {
        if (canDecreaseWidth) {
            setWidth(width - 1)
        }
    }

    const increaseWidth = (): void => {
        if (canIncreaseWidth) {
            setWidth(width + 1)
        }
    }

    let somethingSpecial = false
    let specialMessage = 'Nothing notable about this value.'
    if (currentSum === 0) {
        somethingSpecial = true
        specialMessage = `This is the only way to represent 0 with ${width} bits.`
    } else if (currentSum === -1) {
        somethingSpecial = true
        specialMessage = 'Note that all 1s represents -1, regardless of the number of bits.'
    } else if (currentSum === -Math.pow(2, width - 1)) {
        somethingSpecial = true
        specialMessage = `This is the smallest number representable by ${width} bits. Note that only the MSB is 1, and all other bits are 0.`
    } else if (currentSum === Math.pow(2, width - 1) - 1) {
        somethingSpecial = true
        specialMessage = `This is the largest number representable by ${width} bits in Two's Complement.`
    }

    // Man, I don't miss front-end
    return (
        <div className={styles.container}>
            <div className={styles.specialsBox}>
                <span className={styles.zap}>
                    {somethingSpecial ? <Zap className={styles.zap} /> : <ZapOff />}
                </span>
                <span className={styles.specialsMessage}>{specialMessage}</span>
            </div>

            <div className={styles.bitsAndIncrementer}>
                <div className={styles.bitsAndDecimals}>
                    {bits.map((bit, index) => (
                        <div className={styles.bitBox}>
                            <span>{bit}</span>
                            <span
                                className={cc(
                                    decimalValues[index] !== 0 && styles.highlightedDecimal,
                                )}
                            >
                                {decimalValues[index]}
                            </span>
                        </div>
                    ))}
                </div>

                <div className={styles.incDecContainer}>
                    <button
                        onClick={incrementNumber}
                        className={cc(styles, 'controlChevron', isAtLargetPossible && 'disabled')}
                    >
                        <ChevronUp />
                    </button>

                    <span className={cc(currentSum !== 0 && styles.highlightedDecimal)}>
                        {currentSum}
                    </span>

                    <button
                        onClick={decrementNumber}
                        className={cc(styles, 'controlChevron', isAtSmallestPossible && 'disabled')}
                    >
                        <ChevronDown />
                    </button>
                </div>
            </div>

            <div className={styles.widthContainer}>
                <button
                    onClick={decreaseWidth}
                    className={cc(styles, 'controlChevron', !canDecreaseWidth && 'disabled')}
                >
                    <ChevronLeft />
                </button>

                {`${width} bits`}
                <button
                    onClick={increaseWidth}
                    className={cc(styles, 'controlChevron', !canIncreaseWidth && 'disabled')}
                >
                    <ChevronRight />
                </button>
            </div>
        </div>
    )
}
