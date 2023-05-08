const MongoClient = require('mongodb').MongoClient; // définit le middleware mongodb à charger et crée l’instance MongoClient
const pgClient = require('pg'); // définit le middleware pg à charger



//Envoyer les Posts au Angular
exports.getPosts = (request, response) => {

const dsnMongoDB = "mongodb://127.0.0.1:27017/";       

            // Connection Mongo
            MongoClient.connect(dsnMongoDB, function(err, db) {

                if (err) {throw err;
                }else {
                    console.log("Connected")
                }

                
                // Déclarer la Base de Données
                var dbo = db.db("db-CERI");

                // Récupérer la collection des posts 
                dbo.collection("CERISoNet").find({}).toArray(function(err, result) {
                if (err) throw err;
                else {


                        // Les Posts 
                        let Posts = result;
                        console.log("Posts : " + Posts.length);

                        response.send(Posts);

                    }
                  
                   
                    db.close();
                    });
                  
               
               
            
                   
                });

        
            }

// Envoyer Les Utlisateurs à l'Angular
exports.getUsers = (request, response) => {
   

                var pool = new pgClient.Pool({
                    user: 'uapv2101051', 
                    host: 'pedago01c.univ-avignon.fr', 
                    database:'etd', 
                    password: 'BvCnpE', 
                    port: 5432 }); 
                    // info de connexion à la BD PostGreSQL
                // Connexion à la base => objet de connexion : client
                // fonctionne également en promesse avec then et catch !
              
              
                          pool.connect(function(err, client, done) {
                             if(err) {
                                console.log('Error connecting to pg server' + err.stack);
                             }else{
                                console.log('Connection established with pg db server')
              
                             }
              
                          })
              
                    
                          pool.query("Select * from fredouil.users",(err, res) => {
              
                
                             if(err){
              
                                console.log(err.message);
            
                             }else if(res.rows){
                                    
                                console.log("Users : " + res.rows.length);

                                response.send(res.rows);

                             }
                         
                             pool.end;
                         
                         })
              
           
                
        
        
 }        

// Pour Ajouter des Commentaires
 exports.comment = (request, response) => {

            console.log(request.body);
    var postid = parseInt(request.body.postId)  ;

    var userid = parseInt(request.body.userid)  ;

            
   const dsnMongoDB = "mongodb://127.0.0.1:27017/";  
   
    // Connection Mongo
    MongoClient.connect(dsnMongoDB, function(err, db) {

        if (err) {throw err;
        }else {
            console.log("Connected")
        }

      // Déclarer la Base de Données
      var dbo = db.db("db-CERI");

        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        const heure = today.getHours() + ':' + today.getMinutes();
        console.log(heure); // 👉️ 13:27

        var day = yyyy + '-' + mm + '-' + dd;

       
                

      // Récupérer la collection des posts 
      dbo.collection("CERISoNet").updateOne(
        { _id: postid },
        {
            $push: {
                comments: {
                 $each: [ {text: request.body.comment, 
                    commentedBy: userid,
                    date: day,
                    hour : heure
                    } ],
                
              }
            }
          }
       )



}); 
}



// Pour Ajouter des likes 
exports.like = (request, response) => {
   

   

   var newlikes = parseInt(request.body.likes) + 1 ;

   var id = parseInt(request.body.postId)  ;

   console.log(newlikes);

   const dsnMongoDB = "mongodb://127.0.0.1:27017/";       

            // Connection Mongo
            MongoClient.connect(dsnMongoDB, function(err, db) {

                if (err) {throw err;
                }else {
                    console.log("Connected")
                }

                
                // Déclarer la Base de Données
                var dbo = db.db("db-CERI");

                // Récupérer la collection des posts 
                dbo.collection("CERISoNet").updateOne( { _id: id }, { $set: { likes: newlikes } } ) 
                
                   
                    });
                  
               


} 





