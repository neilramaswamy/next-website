import React from 'react'
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from 'react-feather'
import cc from 'util/cc'
import styles from './Widget.module.scss'

const repeat = (str: string, times: number, withReverseCount?: boolean): string => {
    let ret = ''
    for (let i = 0; i < times; i++) {
        // I leave this line undocumented as a challenge to my future self
        ret += ` ${str}${withReverseCount ? `-${times - i - 1}` : ''}`
    }
    return ret.trim()
}

const getContainerGridAreaString = (
    totalNumBits: number,
): { gridTemplateAreas: string; gridTemplateColumns: string } => {
    // Probably, this is a bit of a hack. "-512" has 4 characters, so call this 4.
    const maxChars = '4ch'

    if (totalNumBits < 2) {
        return { gridTemplateAreas: '', gridTemplateColumns: '' }
    }

    const restBits = totalNumBits - 1

    // prettier-ignore
    let areaString = `
        ".       bitCount bitCount ${repeat('bitCount', restBits)     }  .  .     "
        "binText binMSB   .        ${repeat('binRest', restBits, true)}  .  .     "
        ".       .        .        ${repeat('.', restBits)            }  .  .     "
        "decText decMSB   plus     ${repeat('decRest', restBits, true)}  eq decNum"
    `

    let columnString = `
        max-content ${maxChars} max-content ${repeat(maxChars, restBits)} max-content ${maxChars}
    `

    return { gridTemplateAreas: areaString, gridTemplateColumns: columnString }
}

const WithChevronContainer = ({
    children,
    className,
    onClick,
}: {
    children: React.ReactNode
    className?: string
    onClick?: () => void
}): JSX.Element => {
    return (
        <div onClick={onClick} className={cc(styles.chevronContainer, className)}>
            {children}
        </div>
    )
}

interface Props {
    width: number
    widthLowerBound: number
    widthUpperBound: number
    onDecreaseWidth: () => void
    onIncreaseWidth: () => void

    decimalLowerBound: number
    decimalUpperBound: number
    onIncreaseDecimal: () => void
    onDecreaseDecimal: () => void

    binary: number[]
    decimal: number[]
}

export const Widget = (props: Props): JSX.Element => {
    const {
        width,
        widthLowerBound,
        widthUpperBound,
        onDecreaseWidth,
        onIncreaseWidth,
        decimalLowerBound,
        decimalUpperBound,
        onIncreaseDecimal,
        onDecreaseDecimal,
        binary,
        decimal,
    } = props

    const binMSB = binary[0]
    const binRest = binary.slice(1)
    const decMSB = decimal[0]
    const decRest = decimal.slice(1)

    const canDecreaseWidth = width > widthLowerBound
    const canIncreaseWidth = width < widthUpperBound

    const decimalTotal = decimal.reduce((acc, curr) => acc + curr, 0)
    const canDecreaseDecimal = decimalTotal !== decimalLowerBound
    const canIncreaseDecimal = decimalTotal !== decimalUpperBound

    return (
        <div className={styles.container} style={{ ...getContainerGridAreaString(binary.length) }}>
            <div className={styles.widthContainer} style={{ gridArea: 'bitCount' }}>
                <WithChevronContainer
                    onClick={() => {
                        if (canDecreaseWidth) {
                            onDecreaseWidth()
                        }
                    }}
                    className={cc(styles, 'chevronLeft', !canDecreaseWidth && 'disabled')}
                >
                    <ChevronLeft />
                </WithChevronContainer>

                <span>{width} bits</span>
                <WithChevronContainer
                    onClick={() => {
                        if (canIncreaseWidth) {
                            onIncreaseWidth()
                        }
                    }}
                    className={cc(
                        styles,
                        'chevron',
                        'chevronRight',
                        !canIncreaseWidth && 'disabled',
                    )}
                >
                    <ChevronRight />
                </WithChevronContainer>
            </div>

            <span style={{ gridArea: 'binText' }}>Binary: </span>
            <span className={styles.digitContainer} style={{ gridArea: 'binMSB' }}>
                {binMSB}
            </span>
            {binRest.map((bit, i) => (
                <span
                    className={styles.digitContainer}
                    style={{ gridArea: `binRest-${binRest.length - 1 - i}` }}
                >
                    {bit}
                </span>
            ))}

            <span style={{ gridArea: 'decText' }}>Decimal: </span>
            <span className={styles.digitContainer} style={{ gridArea: 'decMSB' }}>
                {decMSB}
            </span>
            <span style={{ gridArea: 'plus' }}>+</span>
            {decRest.map((bit, i) => (
                <span
                    className={styles.digitContainer}
                    style={{ gridArea: `decRest-${decRest.length - 1 - i}` }}
                >
                    {bit}
                </span>
            ))}

            <span style={{ gridArea: 'eq' }}> = </span>
            <div className={styles.totalContainer} style={{ gridArea: 'decNum' }}>
                <WithChevronContainer
                    onClick={() => {
                        if (canIncreaseDecimal) {
                            onIncreaseDecimal()
                        }
                    }}
                    className={cc(styles, 'chevronUp', !canIncreaseDecimal && 'disabled')}
                >
                    <ChevronUp />
                </WithChevronContainer>
                <span>{decimalTotal}</span>
                <WithChevronContainer
                    onClick={() => {
                        if (canDecreaseDecimal) {
                            onDecreaseDecimal()
                        }
                    }}
                    className={cc(styles, 'chevronDown', !canDecreaseDecimal && 'disabled')}
                >
                    <ChevronDown />
                </WithChevronContainer>
            </div>
        </div>
    )
}
