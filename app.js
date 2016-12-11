/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

var cfenv = require('cfenv');

// create a new express server
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io').listen(http);;



var io = require('socket.io')(http);

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

var request = require("request");

var jsonQuery = require('json-query');

var bodyParser = require('body-parser');
var algoliasearch = require('algoliasearch');

var client = algoliasearch('2C13013W9H', '3271e6270d39bfce9c5357b3014470da');
var index = client.initIndex('futuras_job');

app.all('/*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "GET, POST", "PUT");
  next();
});


var posts = [
  { "entreprise": "Netapsys Madagascar", "poste": "Développeurs Symfony 2", "date": "22 janvier", "contenue": "Vous êtes rattaché à un chef d'équipe qui va vous diriger dans le développement de vos projets. Si votre profil correspond à cette. Vous êtes rattaché à un chef d'équipe qui va vous diriger dans le développement de vos projets. Si votre profil correspond à cette offre veuillez nous contacter pour plus d'information.", "likes": 25 },
  { "entreprise": "Bocasay", "poste": "Développeurs Javascript", "date": "15 février", "contenue": "Bocasay recher les meilleurs développeurs javascript à Madagascar. Notre missier est de réaliser le meilleur logiciel malgache", "likes": 45 },
  { "entreprise": "Vivetic", "poste": "SI (Testeur)", "date": "25 février", "contenue": "Pour étouffer son équipe, vivetic est actuellement à la recherche d'un testeur de qualité. Rejoingner l'entreprise leader dans le domaine de traitement client.", "likes": 35 },
  { "entreprise": "Hello Tana", "poste": "Développeur PHP", "date": "25 juin", "contenue": "Pour étouffer son équipe, vivetic est actuellement à la recherche d'un testeur de qualité. Rejoingner l'entreprise leader dans le domaine de traitement client.", "likes": 41 },
  { "entreprise": "TanaScript", "poste": ".DotNet", "date": "17 avril", "contenue": "Pour étouffer son équipe, vivetic est actuellement à la recherche d'un testeur de qualité. Rejoingner l'entreprise leader dans le domaine de traitement client.", "likes": 45 }
];

var developpeurs = {
  prince: { id: 1, username: "prince", password: "Google7557", nom: "BABAY", prenom: "Prince", avatar: "images (15).jpg", competence: [{ language: "Javascript", nom: "AngularJs" }, { language: "PHP", nom: "Symfony" }] },
  bil: { id: 2, username: "bil", password: "Google7557", nom: "BIL", prenom: "Gates", avatar: "o-ROBIN-THICKE-BLURRED-LINES-ALBUM-facebook.jpg", competence: [{ language: "C#", nom: "Visual Studio" }] },
  bob: { id: 3, username: "bob", password: "Google7557", nom: "BOB", prenom: "Marley", avatar: "71rqP13SVRL._SL1043_.jpg", competence: [{ language: "Music", nom: "Reggey" }] },
  zaz: { id: 4, username: "zaz", password: "Google7557", nom: "ZAZ", prenom: "Sos", avatar: "500x500 (1).jpg", competence: [{ language: "Music", nom: "Pop" }] },
  malma: { id: 5, username: "malma", password: "Google7557", nom: "MALMA", prenom: "Martiora", avatar: "artworks-000116389673-lyihro-t500x500.jpg", competence: [{ language: "Music", nom: "Rap" }] },
  charlie: { id: 6, username: "charlie", password: "Google7557", nom: "CHARLIE", prenom: "Puth", avatar: "Charlie_Puth_-_Nine_Track_Mind.png", competence: [{ language: "Music", nom: "Pop" }] },
  blacko: { id: 7, username: "blacko", password: "Google7557", nom: "BLACKO", prenom: "Gamers", avatar: "dualite.jpg", competence: [{ language: "Music", nom: "Pop" }] },
  rachel: { id: 7, username: "rachel", password: "Google7557", nom: "RACHEL", prenom: "Platten", avatar: "Fight_Song_by_Rachel_Platten.png", competence: [{ language: "Music", nom: "Pop" }] },
};

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/login', login);

app.post('/login', authentification);

app.get('/posts', getPosts);

app.get('/developpeurs', listeDeveloppeur);

app.get('/meteo/observation/:latitude/:longitude', meteoObservation);

app.post('/search/post', searchJob);

app.post('/save/offre', saveOffre);

function listeDeveloppeur(req, res) {
  res.send(developpeurs);
}

function saveOffre(req, res) {
  posts.unshift(req.body.offre);
  res.send(req.body.offre);
}

function searchJob(req, res) {
  index.search(req.body.key, function searchDone(err, content) {
    res.send(content);
  });
}

function getPosts(req, res) {
  res.send(posts);
}

function meteoObservation(req, res) {
  var options = {
    method: 'GET',
    url: 'https://cff26ae0-786f-4fbd-a947-641d7b5dfb79:zq0Uw9SXTX@twcservice.mybluemix.net:443/api/weather/v1/geocode/' + req.params.latitude + '/' + req.params.longitude + '/observations.json',
    qs: { language: 'fr-FR' }
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    res.send(body);
  });

}

function login(req, res) {
  res.sendFile(__dirname + '/public/src/authentification/view/login.html');
}

function authentification(req, res) {
  var user = req.body.user;
  var developpeur = developpeurs[user.email];
  if (developpeur) {
    if (developpeur.password == user.password) {
      res.send({ status: true, user: developpeur });
    }
  } else {
    res.send({ status: false, error: "Erreur mots de combinaison email/password" })
  }
}

io.on('connection', function (socket) {
  socket.on('discussion', function (msg) {
    io.emit('discussion', msg);
  });
  socket.on('private message', function (from, msg) {
    console.log('I received a private message by ', from, ' saying ', msg);
  });
  socket.on('updatesocketuser', function (user) {
    developpeurs[user.username].idSocket = user.idSocket;
  });
  socket.on("sendmsg", function (from, to) {
    var user = developpeurs[to.username];
    console.log(user.idSocket)
    socket.broadcast.to(user.idSocket).emit('message', to.msg.txt);
  });
});

// start server on the specified port and binding host
/*http.listen(appEnv.port, '0.0.0.0', function () {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});*/


http.listen(3001, function(){
  console.log('listening on *:6001');
});
