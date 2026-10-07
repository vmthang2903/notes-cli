const fs = require("fs");
const path = require("path");

// lay duong dan cua file notes
const filePath = path.join(__dirname, "notes.json");

// lay command tu cli
const command = process.argv[2];

// doc file notes.json
const data = fs.readFileSync(filePath);

// parse JSON -> JS object
const note = JSON.parse(data);

if (command === "add") {
  // lay title tu cli
  const title = process.argv[3];

  // lay content tu cli
  const content = process.argv[4];
  if (!title) {
    console.log("chua nhap tieu de!");
  } else if (!content) {
    console.log("chua nhap content!");
  } else {
    // lay do dai cua file note.json
    const noteID = note.length;

    // tao object note
    const newNote = {
      id: noteID + 1,
      title: title,
      content: content,
    };

    // dua object newNote vao note
    note.push(newNote);

    // ghi de note vao file note.json
    fs.writeFileSync(filePath, JSON.stringify(note, null, 2));
  }
} else if (command === "list") {
  // lap qua mang note -> log ra terminal
  note.forEach((item) => {
    console.log(`${item.id}. Title: ${item.title}
Content: ${item.content}
----------------------------------`);
  });
} else if (command === "read") {
  // lay id tu cli
  const searchID = Number(process.argv[3]);
  // bao loi id khong hop le
  if (!Number.isInteger(searchID) || searchID <= 0) {
    console.log("ID khong hop le!");
  } else {
    // dung find() tim note dua vao id
    const result = note.find((item) => item.id === searchID);

    // neu tim thay -> log
    if (result) {
      // log result ra terminal
      console.log(`${result.id}. ${result.title}`);
    } else {
      // khong tim thay id duoc truyen vao
      console.log(`khong co note id ${searchID}`);
    }
  }
} else if (command === "update") {
  // lay id tu cli
  const searchID = Number(process.argv[3]);

  // check xem user update truong nao
  const updateCommand = process.argv[4].toLowerCase();

  // lay content update
  const newContent = process.argv.slice(5).join(" ");

  // bien check update hop le
  let isUpdated = false;

  // bao loi id khong hop le
  if (!Number.isInteger(searchID) || searchID <= 0) {
    console.log("ID khong hop le!");
  } else if (!updateCommand || !newContent) {
    console.log("nhap truong update va noi dung!");
  } else {
    // dung find() tim note dua vao id
    const result = note.find((item) => item.id === searchID);

    // neu tim thay -> update
    if (result) {
      if (updateCommand === "title") {
        result.title = newContent;
        isUpdated = true;
      } else if (updateCommand === "content") {
        result.content = newContent;
        isUpdated = true;
      } else {
        console.log("nhap lai truong update!");
      }
    } else {
      // khong tim thay id duoc truyen vao
      console.log(`khong co note id ${searchID}`);
    }
    if (isUpdated) {
      fs.writeFileSync(filePath, JSON.stringify(note, null, 2));
      console.log("update thanh cong!");
    }
  }
} else if (command === "delete") {
} else {
  console.log("command khong hop le!");
}
