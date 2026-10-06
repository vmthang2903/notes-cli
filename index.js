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
    // lay do dai cua file note.json
    const noteID = note.length;

    // tao object note
    const newNote = {
      id: noteID + 1,
      title: title,
    };

    // dua object newNote vao note
    note.push(newNote);

    // ghi de note vao file note.json
    fs.writeFileSync(filePath, JSON.stringify(note, null, 2));
  }
} else if (command === "list") {
  // lap qua mang note -> log ra terminal
  note.forEach((item) => {
    console.log(`${item.id}. ${item.title}`);
  });
} else if (command === "read") {
  // lay id tu cli
  const readID = Number(process.argv[3]);
  // bao loi id khong hop le
  if (!Number.isInteger(readID) || readID <= 0) {
    console.log("ID khong hop le!");
  } else {
    // dung find() tim note dua vao id
    const result = note.find((item) => item.id === readID);

    // neu tim thay -> log
    if (result) {
      // log result ra terminal
      console.log(`${result.id}. ${result.title}`);
    } else {
      // khong tim thay id duoc truyen vao
      console.log(`khong co note id ${readID}`);
    }
  }
} else if (command === "update") {
} else if (command === "delete") {
} else {
  console.log("command khong hop le!");
}
