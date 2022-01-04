import { Center } from 'components/Center'
import React from 'react'
import { useTwosComplement } from './useTwosComplement'
import { DecimalRangePolicy } from './util'
import { Widget } from './Widget'

interface Props {
    minimumWidth: number
    initialWidth: number
    maximumWidth: number

    initialDecimalValue: number
    decimalRangePolicy: DecimalRangePolicy
}

export const TwosComplement = (props: Props): JSX.Element => {
    const { minimumWidth, initialWidth, maximumWidth, initialDecimalValue, decimalRangePolicy } =
        props

    const tcState = useTwosComplement({
        minimumWidth,
        maximumWidth,
        initialWidth,
        initialDecimalValue,
        decimalRangePolicy,
    })

    return (
        <Center>
            <Widget
                width={tcState.width}
                widthLowerBound={tcState.minimumWidth}
                widthUpperBound={tcState.maximumWidth}
                onIncreaseWidth={tcState.onIncrementWidth}
                onDecreaseWidth={tcState.onDecrementWidth}
                decimalLowerBound={tcState.minimumDecimal}
                decimalUpperBound={tcState.maximumDecimal}
                onIncreaseDecimal={tcState.onIncrementDecimal}
                onDecreaseDecimal={tcState.onDecrementDecimal}
                binary={tcState.bitArray}
                decimal={tcState.decArray}
            />
        </Center>
    )
}
