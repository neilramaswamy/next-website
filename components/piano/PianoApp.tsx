import { Note, note } from '@tonaljs/core'
import { Chord } from '@tonaljs/tonal'
import Board from './Board'
import styles from './PianoApp.module.scss'
import React from 'react'
import { midiToNoteName, toMidi } from '@tonaljs/midi'

// Equality function WHEN USING THE KEYBOARD should be:
// agnostic to enharmonic-ness
// should not care about octave
// shouldn't care about the order, or at least if it does, it should sort ascendingly
//
// I can imagine that the speech recognition version will:
// ABSOLUTELY care about enharmonic-nes
// not care about octave, as well

function getRandomChordName(): string {
    const c4Midi = toMidi('C4')
    if (c4Midi === null) {
        return ''
    }
    const chroma = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
    const baselineNoteNames = chroma.map((i) => midiToNoteName(c4Midi + i))

    const chordQualities = ['maj7', 'dim7', 'mM7', '7', 'm7']
    return `${baselineNoteNames[Math.floor(baselineNoteNames.length * Math.random())]} ${
        chordQualities[Math.floor(chordQualities.length * Math.random())]
    }`
}

const PianoApp = (): JSX.Element => {
    const [chordName, setChordName] = React.useState(getRandomChordName())

    const chordNotes = Chord.get(chordName)
    const [selectedNotes, setSelectedNotes] = React.useState<string[]>([])

    // Checks that selectedNotes are equal to the chord at hand
    const checkAnswer = (): boolean => {
        if (chordNotes.notes.length !== selectedNotes.length) {
            return false
        }

        for (let i = 0; i < chordNotes.notes.length; i++) {
            if (toMidi(chordNotes.notes[i]) !== toMidi(selectedNotes[i])) {
                console.log('they were different', chordNotes.notes[i], selectedNotes[i])
                return false
            }
        }

        return true
    }

    return (
        <div className={styles.container}>
            <h2>{chordName}</h2>

            <Board
                width={600}
                lowestNote={note('C4') as Note}
                highestNote={note('D6') as Note}
                onKeyClick={(note) => {
                    if (selectedNotes.includes(note.name)) {
                        setSelectedNotes(selectedNotes.filter((n) => n !== note.name))
                    } else {
                        setSelectedNotes([...selectedNotes, note.name])
                    }
                }}
                highlights={selectedNotes}
            />

            <div>
                <button
                    onClick={() => {
                        setChordName(getRandomChordName())
                        setSelectedNotes([])
                    }}
                    className={styles.newChordButton}
                >
                    New Chord
                </button>

                <button
                    onClick={() => {
                        if (checkAnswer()) {
                            alert('correct')
                            setSelectedNotes([])
                            setChordName(getRandomChordName())
                        } else {
                            alert('incorrect, wanted' + chordNotes.notes + 'got ' + selectedNotes)
                        }
                    }}
                >
                    Check Answer
                </button>
            </div>
        </div>
    )
}

export default PianoApp
