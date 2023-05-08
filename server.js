const express = require('express'); // définit expressJS
const session = require("express-session");
const bodyParser = require("body-parser");

const crypto = require('crypto');

const app = express(); // appel à expressJS
const cors = require("cors");
const router = express.Router();
const pgClient = require('pg'); // définit le middleware pg à charger

const auth = require("./Services/auth");
const posts = require("./Services/posts");

const MongoDBStore = require('connect-mongodb-session')(session);





// importer les libraries qu'on va utiliser pour supporter la connexion HTTPS
const https = require('https') 
const path = require('path')



// Pour lire les files
const fs = require('fs');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}) );

app.all("/*", function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  next();
});




// Pour appeler les fichies CSS + IMAGES


// Session
app.use(
   session({
     secret: "users",
     resave: false,
     store : new MongoDBStore({ // instance de connect-mongodb-session
      uri: 'mongodb://127.0.0.1:27017/mySessions3199', // New-York = BD dansMongoDb
      collection: 'mySessions3199', // mySessions=nom collection dansMongoDb
      touchAfter: 24 * 3600 // 1 sauvegarde toutes les 24h hormis sidonnées MAJ
      }),
     cookie : { maxAge : 30000},
     saveUninitialized: false,
   })
 );

 


// Generation de cle + Certificate pour le server HTTPS
const server = https.createServer(
   {
      key: fs.readFileSync(path.join(__dirname,'cert','key.pem')),
      cert : fs.readFileSync(path.join(__dirname,'cert', 'cert.pem')),

      },
      app
)

// Spécification du port d’écoute de Node pour les requêtes HTTP
server.listen(3199, () => 

console.log('Secure Server listening on Port : 3199')

)

const io = require('socket.io')(server); // définit le middleware socket.io et le serveur avec lequel la connexion full-duplex doit être établie

io.on('connection' , socket => {

  console.log(socket.id);
  
         socket.emit('notification', { hello: 'Bienvenue Sur CERISoNet... Notre Server est Prêt Pour vous Répondre' }); // renvoi message vers client
  
        });



app.use(express.static(path.join(__dirname, "./frontend/dist/frontend")));

 
//Conneexion PostgreSQL
app.post('/login',auth.login);


//Déconneexion PostgreSQL
app.post('/logout', auth.logout );

app.post('/getPosts', posts.getPosts);

app.post('/getUsers', posts.getUsers);


app.post('/comment', posts.comment);

app.post('/like', posts.like);
