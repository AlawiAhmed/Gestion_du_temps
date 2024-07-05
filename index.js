const express = require('express');
const app = express();
app.get("/home", (req, res) => {
    res.send("home")
});
app.get("/about", (req, res) => {
    res.send("about")
});
app.post("/abouts", (req, res) => {
    res.send("abouts")
});
app.listen(3000, () => {
    console.log("I am listening")
});