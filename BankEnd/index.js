const cors = require("cors");
const connectToMongo = require("./db");
const express = require("express");
const notes = require("./routes/notes");
const auth = require("./routes/auth");


connectToMongo();

const app = express();
const port = 5000;
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());



//avalible routes
app.use("/notes", notes);
app.use("/auth", auth);

app.get("/", (req, res) => {
  res.send("Hello Hussain!");
});

app.listen(port, () => {
  console.log(`iNoteBook listening on port ${port}`);
});
