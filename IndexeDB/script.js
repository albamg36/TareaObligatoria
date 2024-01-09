document.addEventListener('DOMContentLoaded', () => {
    loadNotes();
});

function addNote() {
    const noteText = document.getElementById('note-input').value;
    if (noteText.trim() === '') return;

    const note = {
        text: noteText,
        timestamp: new Date().getTime()
    };

    saveNoteToDB(note);
    loadNotes();
    document.getElementById('note-input').value = '';
}

function deleteNote(timestamp) {
    deleteNoteFromDB(timestamp);
    loadNotes();
}

function deleteAllNotes() {
    deleteAllNotesFromDB();
    loadNotes();
}

function loadNotes() {
    const noteContainer = document.getElementById('note-container');
    noteContainer.innerHTML = '';

    getAllNotesFromDB().then(notes => {
        notes.forEach(note => {
            const noteElement = createNoteElement(note);
            noteContainer.appendChild(noteElement);
        });
    });
}

function createNoteElement(note) {
    const noteElement = document.createElement('div');
    noteElement.className = 'note';

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'Eliminar';
    deleteButton.className = 'delete-button';
    deleteButton.onclick = () => deleteNote(note.timestamp);

    noteElement.innerHTML = `<p>${note.text}</p>`;
    noteElement.appendChild(deleteButton);

    return noteElement;
}

// IndexedDB functions
function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('notesDB', 1);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            const objectStore = db.createObjectStore('notes', { keyPath: 'timestamp' });
        };

        request.onsuccess = (event) => {
            resolve(event.target.result);
        };

        request.onerror = (event) => {
            reject('Error al abrir la base de datos');
        };
    });
}

function saveNoteToDB(note) {
    openDB().then(db => {
        const transaction = db.transaction(['notes'], 'readwrite');
        const objectStore = transaction.objectStore('notes');

        objectStore.add(note);
    });
}

function deleteNoteFromDB(timestamp) {
    openDB().then(db => {
        const transaction = db.transaction(['notes'], 'readwrite');
        const objectStore = transaction.objectStore('notes');

        objectStore.delete(timestamp);
    });
}

function deleteAllNotesFromDB() {
    openDB().then(db => {
        const transaction = db.transaction(['notes'], 'readwrite');
        const objectStore = transaction.objectStore('notes');

        objectStore.clear();
    });
}

function getAllNotesFromDB() {
    return new Promise((resolve, reject) => {
        openDB().then(db => {
            const transaction = db.transaction(['notes'], 'readonly');
            const objectStore = transaction.objectStore('notes');

            const getAllRequest = objectStore.getAll();

            getAllRequest.onsuccess = (event) => {
                resolve(event.target.result || []);
            };

            getAllRequest.onerror = (event) => {
                reject('Error al obtener las notas de la base de datos');
            };
        });
    });
}
