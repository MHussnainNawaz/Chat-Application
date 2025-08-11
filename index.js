const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");
const methOverride = require("method-override");

app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(methOverride("_method"));

// MongoDB connection (Docker version)
main()
  .then(() => {
    console.log("✅ MongoDB connection successful");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });

async function main() {
  // Docker Compose me mongo container ka naam "mongo" hota hai
  await mongoose.connect("mongodb://mongo:27017/whatsapp");
}

const port = 8080;

// Root route → redirect to chats page
app.get("/", (req, res) => {
  res.redirect("/chats");
});

// Index route
app.get("/chats", async (req, res) => {
  let chats = await Chat.find();
  res.render("index.ejs", { chats });
});

// New chat form
app.get("/chats/new", (req, res) => {
  res.render("new.ejs");
});

// Create new chat
app.post("/chats", async (req, res) => {
  let { from, to, msg } = req.body;
  let newChat = new Chat({
    from,
    to,
    msg,
    created_at: new Date(),
  });
  try {
    await newChat.save();
    console.log("💾 Chat saved successfully");
    res.redirect("/chats");
  } catch (err) {
    console.error("❌ Error saving chat:", err);
    res.redirect("/chats");
  }
});

// Edit form
app.get("/chats/:id/edit", async (req, res) => {
  let { id } = req.params;
  let chat = await Chat.findById(id);
  res.render("edit.ejs", { chat });
});

// Update chat
app.put("/chats/:id", async (req, res) => {
  let { id } = req.params;
  let { msg } = req.body;
  let updatechat = await Chat.findByIdAndUpdate(
    id,
    { msg },
    { runValidators: true, new: true }
  );
  console.log("✏️ Chat updated:", updatechat);
  res.redirect("/chats");
});

// Delete chat
app.delete("/chats/:id", async (req, res) => {
  let { id } = req.params;
  let deletedchat = await Chat.findByIdAndDelete(id);
  console.log("🗑️ Chat deleted:", deletedchat);
  res.redirect("/chats");
});

app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});

