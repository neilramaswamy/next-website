import styles from './Key.module.scss'

const WHITE_HEIGHT_SCALE = 4.81
const BLACK_HEIGHT_SCALE = 3.05
const BLACK_WIDTH_SCALE = 0.55

interface KeyProps {
    onClick?: () => void

    // Positioning and size
    x: number
    y: number
    whiteKeyWidth: number

    // Visual appearance
    highlighted?: boolean
    isWhiteKey: boolean
}

const Key = (props: KeyProps): JSX.Element => {
    const { x, y, onClick, whiteKeyWidth, isWhiteKey, highlighted } = props

    let width: number, height: number
    if (isWhiteKey) {
        width = whiteKeyWidth
        height = whiteKeyWidth * WHITE_HEIGHT_SCALE
    } else {
        width = whiteKeyWidth * BLACK_WIDTH_SCALE
        height = whiteKeyWidth * BLACK_HEIGHT_SCALE
    }

    return (
        <div
            className={`${styles.pianoKey} ${isWhiteKey ? styles.whiteKey : styles.blackKey} ${
                highlighted && styles.highlightedKey
            }`}
            onClick={onClick}
            style={{
                position: 'absolute',
                width,
                height,
                left: x,
                top: y,
            }}
        />
    )
}

export default Key
