// dependencies
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");

// scraping tools
const cheerio = require("cheerio");
const axios = require("axios");

// require all models
const db = require("./models");

const PORT = 3000;

// initialize express
const app = express();

// middleware
// morgan logger for logging requests
app.use(logger("dev"));
// parse req.body as JSON
app.use(express.urlencoded({exteded: true}));
app.use(express.json());
// set public as static
app.use(express.static("public"));

// Handlebars
app.engine(
    "handlebars",
    exphbs({
      defaultLayout: "main"
    })
  );
app.set("view engine", "handlebars");

// connection to Mongo DB
mongoose.connect("mongodb://localhost/nyt_scraper", {useNewUrlParser: true});

// ROUTES
// root route
app.get("/", (req, res)=>{
    res.render("index")
})

// route to scrape new data
app.post("/api/articles", function(req, res){
    // retrieve info from nytimes
    axios.get("https://www.nytimes.com").then(response=>{
        const $ = cheerio.load(response.data);
        // loop over each article and grab data 
        $("article").each(function(i, element){
            // save empty result obj
            let result = {}
            // add title, text, and href of each link and save as properties of result
            result.title = $(this)
            .find("h2")
            .text();
            result.text = $(this)
            .find("p")
            .text();
            result.link = "https://www.nytimes.com"+$(this)
            .find("a")
            .attr("href");
            console.log(result);
            // create new article from result obj
            db.Article.create(result)
            .then(dbArticle =>{
                // log added result
                console.log(dbArticle)
                res.json(result)
            }).catch(err=>{
                // log and errors
                console.log(err)
            });
        });
        console.log("Scrape complete");
    });
});

// route for retreiving all articles
app.get("/api/articles", (req, res)=>{
    db.Article.find({}, (err, docs)=>{
        if(err) throw err;
        res.json(docs)
    });
});

// route to delete all articles
app.get("/api/delete", (req, res)=>{
    db.Article.remove({}, (err, removed)=>{
        if(err) throw err;
        res.json(removed)
    });
});

// Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });
