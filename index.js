const fs = require("fs");
const path = require("path");
const readline = require("readline");

// lay duong dan cua file notes
const filePath = path.join(__dirname, "notes.json");

// lay command tu cli
const command = process.argv[2]?.toLowerCase();

// doc file notes.json
const data = fs.readFileSync(filePath);

// parse JSON -> JS object
const note = JSON.parse(data);

if (command === "add") {
  // lay title tu cli
  const title = process.argv[3];

  // lay content tu cli
  const content = process.argv.slice(4).join(" ");
  if (!title) {
    console.log("chua nhap tieu de!");
  } else if (!content) {
    console.log("chua nhap content!");
  } else {
    // tao id moi dua tren id lon nhat
    const noteID =
      note.length > 0 ? Math.max(...note.map((item) => item.id)) + 1 : 1;

    // tao object note
    const newNote = {
      id: noteID,
      title: title,
      content: content,
    };

    // dua object newNote vao note
    note.push(newNote);

    // ghi de note vao file note.json
    fs.writeFileSync(filePath, JSON.stringify(note, null, 2));

    console.log(`Da them note ${newNote.id}. ${newNote.title}`);
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
      console.log(`ID: ${result.id}
Title: ${result.title}
Content: ${result.content}
`);
    } else {
      // khong tim thay id duoc truyen vao
      console.log(`khong co note id ${searchID}`);
    }
  }
} else if (command === "update") {
  // lay id tu cli
  const searchID = Number(process.argv[3]);

  // check xem user update truong nao
  const updateCommand = process.argv[4]?.toLowerCase();

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
  // lay id tu cli
  const searchID = Number(process.argv[3]);
  // bao loi id khong hop le
  if (!Number.isInteger(searchID) || searchID <= 0) {
    console.log("ID khong hop le!");
  } else {
    // tim index cua note
    const resultIndex = note.findIndex((item) => item.id === searchID);

    // neu tim thay -> log
    if (resultIndex !== -1) {
      const result = note[resultIndex];

      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      rl.question(
        `Bạn có chắc chắn muốn xoá note ${result.id}. Title: ${result.title}? (y/n) -> `,
        (answer) => {
          const normalizedAns = answer.trim().toLowerCase();
          if (normalizedAns === "y") {
            note.splice(resultIndex, 1);

            fs.writeFileSync(filePath, JSON.stringify(note, null, 2));

            console.log(`Da xoa note ${result.id}. Title: ${result.title}`);
          } else if (normalizedAns === "n") {
            console.log("Khong xoa note!");
          } else {
            console.log("Command không hợp lệ!");
          }

          rl.close();
        },
      );
    } else {
      // khong tim thay id duoc truyen vao
      console.log(`khong co note id ${searchID}`);
    }
  }
} else {
  console.log("command khong hop le!");
}
