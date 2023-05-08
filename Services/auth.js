const pgClient = require('pg');
const crypto = require('crypto');


const session = require("express-session");



exports.login = (request, response) => {
   

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
      
            
                  pool.query("Select * from fredouil.users where identifiant = '"+request.body.username+"'",(err, res) => {
      
                    // cryptage du mot de passe avec SHA1
                     var hashedPassword = crypto.createHash("sha1").update(request.body.password).digest();
                    
                
      
      
                     if(err){
      
                        console.log(err.message);
      
                     
                 
                     }else  if ((res.rows[0] != null) && (res.rows[0].motpasse == hashedPassword.toString('hex'))  ) {
                        
                    
    
                        // Creation d'une session
                        const id = res.rows[0].id ;
                        const identifiant = res.rows[0].identifiant ;
                        const nom = res.rows[0].nom ;
                        const prenom = res.rows[0].prenom;
                        const avatar = res.rows[0].avatar;
                        const statut_connexion = res.rows[0].statut_connexion;

                        const sessionID = request.session.id;
                        
                        
                        // créer la date de derniere connextion
                        var today = new Date();
                        var dd = String(today.getDate()).padStart(2, '0');
                        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                        var yyyy = today.getFullYear();
                
                        const heure = today.getHours() + ':' + today.getMinutes();
                        console.log(heure); // 👉️ 13:27

                        const lastDateconnection = "H: "+heure+" D: "+ yyyy + '-' + mm + '-' + dd;
                        
                        
                        // mise à jour du statut_connexion de 0 à 1
                        pool.query("UPDATE fredouil.users SET statut_connexion = 1 WHERE id = "+id+";");
      
                        // stocker l'user dans la session
                         request.session.authenticated = true;
                         request.session.user = {
                            id , identifiant , nom , prenom , avatar , statut_connexion , sessionID , lastDateconnection
                         };



                   
                         
                         response.send(JSON.stringify(request.session.user));

                        

                       
                     }else  if ((res.rows[0] != null) && (res.rows[0].motpasse != hashedPassword.toString('hex'))  ) {

                       
                        response.send(JSON.stringify(1));
                     }
                      else {
      
                        console.log('Connexion échouée : informations de connexion incorrecte');
                       
                        response.send();
                     }
                 
                     pool.end;
                 
                 })
      
   
        


    }



exports.logout = (request, response) => {

      console.log(request.body);


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


               pool.query("UPDATE fredouil.users SET statut_connexion = 0 WHERE id = "+request.body.userid+";",(err,res) =>{
                              if(err){
                                 response.send();
                              }else{
                                 response.send(JSON.stringify(1));
                              }

               });



    }
