import { distance, note, Note } from '@tonaljs/core'
import { midiToNoteName } from '@tonaljs/midi'

export function isBlackKey(n: Note) {
    return [1, 3, 6, 8, 10].includes(n.chroma)
}

export function notesBetween(lower: Note, upper: Note): Note[] {
    let notes = []

    let currentNote = lower
    while (distance(currentNote, upper) !== '1P') {
        notes.push(currentNote)
        const maybeNextNote = note(midiToNoteName((currentNote.midi || 0) + 1))

        if (maybeNextNote.empty) {
            throw new Error('fucky wucky has happened wappened')
        }
        currentNote = maybeNextNote
    }

    return notes
}

export function countWhiteNotes(notes: Note[]): number {
    return notes.reduce((prev, note) => {
        return !isBlackKey(note) ? prev + 1 : prev
    }, 0)
}
