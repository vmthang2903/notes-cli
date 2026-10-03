const fs = require("fs");
const path = require("path");

// lay duong dan cua file notes
const filePath = path.join(__dirname, "notes.json");

// lay command tu cli
const command = process.argv[2];

// lay title tu cli
const title = process.argv[3];

// doc file notes.json
const data = fs.readFileSync(filePath);

// parse JSON -> JS object
const note = JSON.parse(data);

if (command === "add") {
  if (!title) {
    console.log("chua nhap tieu de note!");
  } else {
    const noteID = note.length;
    const newNote = {
      id: noteID + 1,
      title: title,
    };

    note.push(newNote);

    fs.writeFileSync(filePath, JSON.stringify(note, null, 2));
  }
} else if (command === "list") {
} else if (command === "read") {
} else if (command === "update") {
} else if (command === "delete") {
} else {
  console.log("command khong hop le!");
}
