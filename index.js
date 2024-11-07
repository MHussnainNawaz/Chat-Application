const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");
const methOverride = require("method-override")

app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")))
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }))
app.use(methOverride("_method"))

main().then(() => {
    console.log("Connection successful");
}).catch((err) => {
    console.log(err);
});

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp', {

    });
}

const port = 8080;

app.get("/", (req, res) => {
    res.send("Root is working");
});

//index routes
app.get("/chats", async (req, res) => {
    let chats = await Chat.find();

    res.render("index.ejs", { chats })
})
//New routes
app.get("/chats/new", (req, res) => {

    res.render("new.ejs")
})
//create post
app.post("/chats", (req, res) => {
    let { from, to, msg } = req.body;

    let newChat = new Chat(
        {
            from: from,
            to: to,
            msg: msg,
            created_at: new Date,
        }
    );
    newChat.save()
        .then(res => {
            console.log("Save data")
        })
        .catch(err => {
            console.log(err)

        })
    res.redirect("/chats")
})

//Edit route
app.get("/chats/:id/edit", async (req, res) => {
    let { id } = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs", { chat })
})
//update route
app.put("/chats/:id", async (req, res) => {
    let { id } = req.params;
    let { msg } = req.body;
    let updatechat = await Chat.findByIdAndUpdate(
        id,
        { msg: msg }, { runValidators: true, new: true })
    console.log(updatechat);
    res.redirect("/chats")
})

// Delete route
app.delete("/chats/:id", async (req, res) => {
    let { id } = req.params;
    let deletedchat = await Chat.findOneAndDelete(id)
    consolo.log(deletedchat)
    res.redirect("/chats")
})

app.listen(port, () => {
    console.log(`Server is connected with port ${port}`);
});