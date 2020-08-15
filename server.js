const express = require("express"),
      bodyParser = require('body-parser'),
      app = express(),
      { getCharPosition, getPokemonEquivalent } = require('./PokeFinder.js');


app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

app.post("/", (req, resp) => {
  let hint = req.body.hint.toLowerCase();
  
  if(hint.includes("The wild pokémon is".toLowerCase())){
    hint = hint.split(" ");
    resp.send(getPokemonEquivalent(getCharPosition(hint[hint.length - 1].replace("!", ""))));
  } else {
    resp.send(getPokemonEquivalent(getCharPosition(hint)));
  }
  //
});

const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});