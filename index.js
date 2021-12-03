import * as Tone from 'tone';



const keyMappings = {
    'a': 'C4',
    'w': 'C#4',
    's': 'D4',
    'e': 'D#4',
    'd': 'E4',
    'f': 'F4',
    't': 'F#4',
    'g': 'G4',
    'y': 'G#4',
    'h': 'A4',
    'u': 'A#4',
    'j': 'B4',
    'k': 'C5',
    'o': 'C#5',
    'l': 'D5'

}


//                                                 <img src="bell-svg.svg" className="note-button" id="C5" data-note="C5">
//                                                     <img src="bell-svg.svg" className="note-button" id="D5"
//                                                          data-note="D5">

const joyToTheWorld = [
    'C5', 'B4', 'A4', 'G4', 'F4', 'E4', 'D4', 'C4',
    'G4', 'A4', 'A4', 'B4', 'B4', 'C5', 'C5', 'C5',
    'B4', 'A4', 'G4', 'G4', 'F4', 'E4', 'C5', 'C5',
    'B4', 'A4', 'G4', 'G4', 'F4', 'E4', 'E4', 'E4',
    'E4', 'E4', 'F4', 'G4', 'E4', 'D4', 'D4', 'D4',
    'E4', 'F4', 'D4', 'C4', 'C5', 'A4', 'G4', 'F4',
    'E4', 'F4', 'E4', 'D4', 'C4'
];

const ohTannenbaum = [
    'C4', 'F4', 'F4', 'F4', 'G4', 'A4', 'A4', 'A4',
    'A4', 'G4', 'A4', 'A#4', 'E4', 'G4', 'F4',
    'C4', 'F4', 'F4', 'F4', 'G4', 'A4', 'A4', 'A4',
    'A4', 'G4', 'A4', 'A#4', 'E4', 'G4', 'F4',
     'C5', 'C5', 'A4', 'D5', 'C5',
    'C5', 'A#4', 'A#4', 'A4', 'A#4', 'G4', 'C5', 'A#4',
    'A#4', 'A4', 'A4',
    'C4', 'F4', 'F4', 'F4', 'G4', 'A4', 'A4', 'A4',
    'A4', 'G4', 'A4', 'A#4', 'E4', 'G4', 'F4',
]

const jingleBells = [
    'E4', 'E4', 'E4', 'E4', 'E4', 'E4',
    'E4', 'G4', 'C4', 'D4', 'E4',
    'F4', 'F4', 'F4', 'F4', 'F4', 'E4', 'E4',
    'E4', 'E4', 'E4', 'D4', 'D4', 'E4', 'D4', 'G4',
    'E4', 'E4', 'E4', 'E4', 'E4', 'E4',
    'E4', 'G4', 'C4', 'D4', 'E4',
    'F4', 'F4', 'F4', 'F4', 'F4', 'E4', 'E4',
    'E4', 'E4', 'G4', 'G4', 'F4', 'D4', 'C4', 'G4'
]

const godRestYeMerryGentlemen = [
    'D4', 'D4', 'A4', 'A4', 'G4', 'F4', 'E4', 'D4', 'C4', 'D4', 'E4', 'F4', 'G4', 'A4',
    'D4', 'D4', 'A4', 'A4', 'G4', 'F4', 'E4', 'D4', 'C4', 'D4', 'E4', 'F4', 'G4', 'A4',
    'A4', 'A#4', 'G4', 'A4', 'A#4', 'C5', 'D5', 'A4', 'G4', 'F4', 'D4', 'E4', 'F4', 'G4',
    'F4', 'G4', 'A4', 'A#4', 'A4', 'A4', 'G4', 'F4',  'E4', 'D4',  'F4',  'E4', 'D4', 'G4',
    'F4', 'G4', 'A4', 'A#4', 'C5', 'D5', 'A4', 'G4', 'F4',  'E4', 'D4'
]

const songs = [joyToTheWorld, ohTannenbaum, jingleBells, godRestYeMerryGentlemen];

let noteIndex = 0;
let song;
let synth;

initializeSong(0);


function updateNextNote(playedNote) {
    const lastNote = song[noteIndex];

    if (playedNote === lastNote) {

        console.log('lastNote', lastNote, document.getElementById(lastNote));

        document.getElementById(lastNote).classList.remove('next-note');

        noteIndex = noteIndex + 1 < song.length ? noteIndex + 1 : 0;

        const currentNote = song[noteIndex];

        document.getElementById(currentNote).classList.add('next-note');
    }
}

function playNote(note) {
    synth.triggerAttackRelease(note);

    const element = document.getElementById(note);

    element.classList.add('playing');
    setTimeout(() => {
        element.classList.remove('playing');
    }, 500)
}

function initializeSong(index) {

    song = songs[index];

    for (const element of document.getElementsByClassName('song-button')) {
        element.classList.remove('active');
    }

    document.querySelector(`[data-song-index="${index}"]`).classList.add('active');


    for (const element of document.getElementsByClassName('note-button')) {
        element.classList.remove('next-note');
    }


    noteIndex = 0;
    document.getElementById(song[noteIndex]).classList.add('next-note');


}

function setupNoteActions() {
    const currentNote = song[noteIndex];

    console.log('currentNote', currentNote);

    document.getElementById(currentNote).classList.add('next-note');

    for (const element of document.getElementsByClassName('note-button')) {

        console.log('addEventListener', element.getAttribute('data-note'));

        element.addEventListener('mousedown', () => {

            const note = element.getAttribute('data-note');

            console.log('note', note);

            playNote(note);

            updateNextNote(note);
        });
    }
}


function setupSongActions() {

    console.log('setup songs');

    for (const element of document.getElementsByClassName('song-button')) {

        console.log('song action', element.getAttribute('data-song-index'));


        element.addEventListener('mouseover', () => {
            synth.triggerAttackRelease(Math.random() > 0.5 ? 'C1': 'D1');
        });

        element.addEventListener('click', () => {
            const index = element.getAttribute('data-song-index');
            initializeSong(index);
        });
    }
}

document.addEventListener('DOMContentLoaded', function () {



    document.getElementById('modal-close').addEventListener('click', () => {

        synth = new Tone.Sampler({
            'C1': './jingle.mp3',
            'D1': './jingle2.mp3',
            'E4': './hand_bell.mp3'
        }).toDestination();

        setupNoteActions();

        setupSongActions();

        document.getElementById('modal').style.display = 'none';
    });

});

document.addEventListener('keydown', (event) => {

    const note = keyMappings[event.key];

    if (note) {
        playNote(note);

        updateNextNote(note);
    }
});


