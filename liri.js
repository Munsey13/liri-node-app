require("dotenv").config();

const keys = require("./keys.js");
const Spotify = require("node-spotify-api");
const axios = require("axios");
const fs= require("fs");
const moment = require("moment");
const userCommand = process.argv[2];
const userSearch = process.argv.slice(3).join(" ");

function liriStart(userCommand, userSearch) {
    switch (userCommand){
        case "spotify-this-song":
            getSpoty(userSearch);
            break;
        case "concert-this":
            getBandsInTown(userSearch);
            break;
        case "movie-this":
            getOMDB(userSearch);
            break;
        case "do-what-it-says":
            getRandom();
            break;
        default:
            console.log("Please enter one of these commands: 'spotify-this-song', 'concert-this', 'movie-this', 'do-what-it-says' to continue");
    };
};

function getSpoty(songName){

    let spotify = new Spotify(keys.spotify);

    if (!songName) {
        songName = "Heros Never Die";
    };
        spotify.search({
            type: "track",
            query: songName
        }, function(err, data){
            if(err){
                throw console.log("Error occurred: " + err);
            };
            console.log("============");
            console.log("* Artist(s) Name: " + data.tracks.items[0].album.artists[0].name + "\r\n");
            console.log("* Song Name: " + data.tracks.items[0].name + "\r\n");
            console.log("* Song Preview Link: " + data.tracks.items[0].href + "\r\n");
            console.log("* Album: " + data.tracks.items[0].album.name + "\r\n");

            let songLog = "======Begin Spotify Log Engry======" + "\nArtist: " + data.tracks.items[0].album.artists[0].name + "\nSong Name: " + data.tracks.items[0].name + "\n Preview Link: " + data.tracks.items[0].href + "\nAlbum Name: " + data.tracks.items[0].album.name + "\n======End Spotify Log Entry======" + "\n";

            fs.appendFile("log.txt", songLog, function(err){
                if (err){
                    return err;
                }
            })

        
    });
};

function getBandsInTown(artist){

    if(!artist){
        artist = "Joe Hisaishi";
    };
    
    let bandURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    axios.get(bandURL).then(
        function(response){
            console.log(response);
            console.log("=============");
            console.log("Name of the venue: " + response.data[0].venue.name + "\r\n");
            console.log("Venue Location: " + response.data[0].venue.city + "\r\n");
            console.log("Date of event: " + moment(response.data[0].datetime).format("MM-DD-YYYY") + "\r\n");

            let concertLog = "========Begin Concert Log Entry========" + "\nName of the musician: " + artist + "\nName of the venue: " + bandResponse.data[0].venue.name + "\nVenue location: " + bandResponse.data[0].venue.city + "\n Date of event: " + moment(bandResponse.data[0].datetime).format("MM-DD-YYYY") + "\n======End Concert Log Entry======" + "\n";

            fs.appendFile("log.txt", concertLog, function(err){
                if(err){
                    return err;
                }
            })


    });
};

function getOMDB(movie){
    if(!movie){
        movie = "It";
    };

    let movieURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

    axios.request(movieURL).then(
        function(response){
            console.log("=============");
            console.log("* Title: " + response.data.Title + "\r\n");
            console.log("* Year Released: " + response.data.Year + "\r\n");
            console.log("* IMDB Rating: " + response.data.imdbRating + "\r\n");
            console.log("* Rotten Tomatoes Rating: " + response.data.Ratings[1].Value + "\r\n");
            console.log("* Country Where Produced: " + response.data.Country + "\r\n");
            console.log("* Plot: " + response.data.Plot + "\r\n");
            console.log("* Actors: " + response.data.Actors + "\r\n");

            let movieLog = "======Begin Movie Log Entry======" + "\nMovie title: " + response.data.Title + "\nYear released: " + response.data.Year + "\nIMDB rating: " + response.data.imdbRating + "\nRotten Tomatoes rating: " + response.data.Ratings[1].Value + "\nCountry where produced: " + response.data.Country + "\nLanguage: " + response.data.Language + "\nPlot: " + response.data.Plot + "\nActors: " + response.data.Actors + "\n======End Movie Log Entry======" + "\n";


            fs.appendFile("log.txt", movieLog, function(err){
                if(err) {
                    return err;
                }
            });
        });
};

function getRandom(){
    fs.readFile("random.txt", "UTF8", function(error, data){
        if(error){
            throw console.log(error);
        } else {
            console.log(data);
            
            let randomData = data.split(",");
            liriStart(randomData[0], randomData[1]);
        };
    });
};


liriStart(userCommand, userSearch);

