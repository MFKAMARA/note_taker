const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require('../helpers/fsUtils');
//http://localhost:3001/api/notes/
// GET Route for retrieving all the notes
notes.get('/', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// GET Route for a specific notes
notes.get('/:notes_id', (req, res) => {
  const noteId = req.params.notes_id;
  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((notes) => notes.id === noteId);
      return result.length > 0
        ? res.json(result)
        : res.json('No notes with that ID');
    });
});

// DELETE Route for a specific note
notes.delete('/:note_id', (req, res) => {
  const noteId = req.params.note_id;
  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      // Make a new array of all tips except the one with the ID provided in the URL
      const result = json.filter((note) => note.id !== noteId);

      // Save that array to the filesystem
      writeToFile('./db/db.json', result);

      // Respond to the DELETE request
      res.json(result);
    });
});

// POST Route for a new UX/UI tip
//http://localhost:3001/api/notes/
notes.post('/', (req, res) => {
  console.log(req.body);

  const {title, text} = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };

    const parseData= readAndAppend(newNote, './db/db.json');
    res.json(parseData);
  } else {
    res.error('Error in adding tip');
  }
});

module.exports = notes;
