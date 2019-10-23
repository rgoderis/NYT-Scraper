// dependencies
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

// scraping tools
const cheerio = require("cheerio");
const axios = require("axios");
// initialize express
const app = express();

// require all models
const db = require("./models");