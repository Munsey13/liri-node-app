require("dotenv").config();

const keys = require("./keys.js");
const spotify = require("node-spotify-api");
const axios = require("axios");
const fs= require("fs");
const moment = require("moment");
const userCommand = process.argv[2];
const userSearch = process.argv.slice(3).join(" ");
const spotify = new spotify(keys.spotify);
const 