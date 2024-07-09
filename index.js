const express = require('express');
const app = express();
app.use(express.json());

const Article = require("./models/Article");

const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://sa:12345@databasesdeployment.3nzlc8b.mongodb.net/?retryWrites=true&w=majority&appName=databasesdeployment"
).then(() => {
    console.log("connect successfully");
}).catch(error => {
    console.log("Error with connected", error)
});

app.get("/", (req, res) => {
    res.send("Bienvenu en node js verstion")
});

app.get("/home", (req, res) => {
    res.send("home")
});

app.get("/about", (req, res) => {
    res.send("about")
});

app.post("/abouts", (req, res) => {
    res.send("abouts")
});

app.get("/calcul/:num1/:num2", (req, res) => {
    const num1 = parseInt(req.params.num1);
    const num2 = parseInt(req.params.num2);
    res.send(`the total ${num1} and ${num2}`)
})

app.get("/sayHello", (req, res) => {
    console.log(req.body.name);
    console.log(req.query)
    res.send(`Bonjour ${req.body.name} et il a ${req.query.age}`);
});

app.get("/numbers", (req, res) => {
    // res.sendFile(__dirname + "/view/numbers.html")

    let num = "";
    for (let i = 0; i <= 100; i++) {
        num += i + " - ";
    }
    res.render("numbers.ejs", {
        name: "Omer",
        num: num,
    });
});

app.post("/article", async (req, res) => {

    const newArticle = new Article();
    const ArtTitle = req.body.Articletitle;
    const ArtBody = req.body.Articlebody;
    newArticle.title = ArtTitle;
    newArticle.body = ArtBody;
    newArticle.numberof = 0;

    await newArticle.save();

    res.json(newArticle);
});

app.get("/article", async (req, res) => {
    const articles = await Article.find();
    res.json(articles);
});

app.get("/article/:Idarticle", async (req, res) => {
    const id = req.params.Idarticle;
    try {
        const article = await Article.findById(id);
        res.json(article);
        return;
    } catch (error) {
        console.log("error with reading");
        return res.send(error);
    }
});

app.delete("/article/:Idarticle", async (req, res) => {
    const id = req.params.Idarticle;
    try {
        const article = await Article.findByIdAndDelete(id);
        res.json(article);
        return;
    } catch (error) {
        console.log("error with reading");
        return res.send(error);
    }
});

app.get('/showallarticles',async(req,res) => {
    const articles = await Article.find();

    res.render("articles.ejs",{
        AllArticleList: articles
    });
});

app.listen(3000, () => {
    console.log("I am listening")
});