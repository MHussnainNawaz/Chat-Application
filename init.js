const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/whatsapp";

main()
  .then(() => {
    console.log("Connection successful");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(mongoURI, {});
}

let allchats = [
  {
    from: "Ahad",
    to: "Mudassar",
    msg: "Hello Mudassar",
    created_at: new Date(),
  },
  {
    from: "Naeem",
    to: "Faisal",
    msg: "HY Faisal",
    created_at: new Date(),
  },
  {
    from: "Hafiz",
    to: "Awais",
    msg: "Hello everyone",
    created_at: new Date(),
  },
];

Chat.insertMany(allchats);

