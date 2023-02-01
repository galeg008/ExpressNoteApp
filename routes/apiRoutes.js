const router = require("express").Router();
const path = require("path");
const fs = require("fs");


function readNote(){
    //GET all notes for the db.json
    var readFile = fs.readFileSync(path.join(__dirname, "../db/db.json"));
    //parse data stream from read db file
    var parseReadFile = JSON.parse(readFile)
    //send data back to file
    return parseReadFile;

}

router.get('/', (req,res) => {
    res.json(readNote())
    //get all the notes from DB
});
//used for creating new notes
function createNote(note) {
    var parsedData = readNote(note);
    //ID will keep track of current and future notes

    const { id, title, text } = note;

// POST add new note for the db.json
    newID= parsedData.length + 1;
    const newNote = { id : newID, title, text };

    parsedData.push(newNote);

    fs.writeFileSync(
        path.join(__dirname, "../db/db.json"),
        JSON.stringify(parsedData)
    );
 }

 router.post("/", (req, res) => {
    res.json(createNote(req.body));
 });



 router.delete("/:id", (req, res)=> {
    currentNote = readNote()
    
    for (i=0; i<currentNote.length;i++){
        if (currentNote[i].id == req.params.id){

            currentNote.splice(i,1)
        }
    }
    fs.writeFileSync(
        path.join(__dirname, "../db/db.json"),
        JSON.stringify(currentNote)
    )
res.json(readNote())
 });

 router.all('/', function(req, res, next) {
    res.send("don't do that.");
 })



module.exports = router;