import { Note } from '@tonaljs/core'
import { toMidi } from '@tonaljs/midi'
import styles from './Board.module.css'
import { Key } from './Key'
import { countWhiteNotes, isBlackKey, notesBetween } from './util'

// Relative to the width of a white key

interface BoardProps {
    width: number

    lowestNote: Note
    highestNote: Note
    onKeyClick?: (note: Note) => void

    highlights: string[]
}

export const Board = (props: BoardProps): JSX.Element => {
    const { width, lowestNote, highestNote, highlights, onKeyClick } = props

    const rawNotes = notesBetween(lowestNote, highestNote)
    const rawWhiteNotes = countWhiteNotes(rawNotes)

    const whiteKeyWidth = width / rawWhiteNotes

    let notes: JSX.Element[] = []
    let numWhiteSeen = 0
    let numBlackSeen = 0
    for (let i = 0; i < rawNotes.length; i++) {
        const currNote = rawNotes[i]
        const isWhiteKey = !isBlackKey(currNote)

        let x = 0
        if (isWhiteKey) {
            x = numWhiteSeen * whiteKeyWidth
        } else {
            if ([1, 6].includes(currNote.chroma)) {
                x = numWhiteSeen * whiteKeyWidth - 0.65 * (0.55 * whiteKeyWidth)
            } else if ([3, 10].includes(currNote.chroma)) {
                x = numWhiteSeen * whiteKeyWidth - 0.42 * (0.55 * whiteKeyWidth)
            } else if (currNote.chroma === 8) {
                x = numWhiteSeen * whiteKeyWidth - 0.5 * (0.55 * whiteKeyWidth)
            }
        }

        isWhiteKey ? numWhiteSeen++ : numBlackSeen++

        notes.push(
            <Key
                x={x}
                y={0}
                onClick={() => {
                    onKeyClick?.(currNote)
                }}
                isWhiteKey={isWhiteKey}
                highlighted={highlights.map((h) => toMidi(h)).includes(toMidi(currNote.name))}
                whiteKeyWidth={whiteKeyWidth}
            />,
        )
    }

    return (
        <div className={styles.ryanTheRelative} style={{ width, height: 4.81 * whiteKeyWidth }}>
            {notes}
        </div>
    )
}
