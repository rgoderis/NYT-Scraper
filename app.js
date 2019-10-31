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

const PORT = process.env.PORT || 3000;

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

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/nyt_scraper";

mongoose.connect(MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set("useCreatedIndex", true)

// ROUTES
// root route
app.get("/", (req, res)=>{
    db.Article.find({}, (err, docs)=>{
        if(err) throw err;
    })
    .then(dbArticle=>{
        const articleObj = {
            article: dbArticle
        }
        res.render("index", articleObj)
    });
});

// saved route
app.get("/saved", (req, res)=>{
    db.Article.find({}, (err, docs)=>{
        if(err) throw err;
    })
    .then(dbArticle=>{
        const savedObj = {
            article: dbArticle
        }
        res.render("saved", savedObj)
    });
});

// route to scrape new data
app.get("/api/articles", function(req, res){
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
            // create new article from result obj
            if(result.title !== "" || result.text !== ""){
                db.Article.create(result)
                .then(article => res.json(result))
                .catch(err=> console.log(err));
            }
        });
        res.send("Scrape Complete");
    });
});

// route to update saved 
app.put("/article/:id", (req, res)=>{
    // console.log(update)
    db.Article.findOneAndUpdate({_id: req.params.id}, {$set: {saved: true}})
    .then(updatedArticle=> res.json(updatedArticle));
});

// route to delete single article
app.delete("/article/:id", (req, res)=>{
    db.Article.findOneAndDelete({_id: req.params.id}, (err, deleted)=>{
        if(err) throw err;
    });
});

// route to delete all articles
app.get("/api/delete", (req, res)=>{
    db.Article.remove({}, (err, removed)=>{
        if(err) throw err;
        res.json(removed)
    });
});

// route to get a specific article's notes by its id
app.get("/article/:id", (req, res)=>{
    db.Article.findOne({_id: req.params.id})
    // populate the articles notes
    .populate("notes")
    .then(notes=> res.json(notes))
    .catch(err=>res.json(err));
});

// route to add a new note
app.post("/article/:id", (req, res)=>{
    db.Note.create(req.body)
    .then(dbNote=>{
        return db.Article.findOneAndUpdate({_id: req.params.id}, {$push:{notes: dbNote._id}}, {new: true});
    })
    .then(dbUser=>res.json(dbUser))
    .catch(err=>res.json(err));
});

// route to delete note
app.delete("/note/:id", (req, res)=>{
    db.Note.findOneAndDelete({_id: req.params.id}, (err) =>{
        if(err) throw err;
    })
})

// Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });
