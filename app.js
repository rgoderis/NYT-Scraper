// dependencies
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

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

// connection to Mongo DB
mongoose.connect("mongodb://localhost/nyt_scraper", {useNewUrlParser: true});

// ROUTES
// route to scrape new data
app.get("/api/scrape", function(req, res){
    // retrieve info from nytimes
    axios.get("https://www.nytimes.com").then(response=>{
        const $ = cheerio.load(response.data);
        // loop over each article and grab data 
        $("article").each(i, element=>{
            // save empty result obj
            let result = {}
            // add title, text, and href of each link and save as properties of result
            result.title = $(this)
            .find("h2")
            .text()
            result.text = $(this)
            .find("p")
            .text()
            result.link = $(this)
            .find("a")
            .attr("href")
            console.log(result);

        });
    })
})