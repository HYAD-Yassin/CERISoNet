const pgClient = require('pg'); // définit le middleware pg à charger
const crypto = require('crypto');

     
 var pool = new pgClient.Pool({
            user: 'uapv2101051', 
            host: 'pedago01c.univ-avignon.fr', 
            database:'etd', 
            password: 'BvCnpE', 
            port: 5432 }); // info de connexion à la BD PostGreSQL
        // Connexion à la base => objet de connexion : client
        // fonctionne également en promesse avec then et catch !

            pool.connect(function(err, client, done) {
                            if(err) {
                                console.log('Error connecting to pg server' + err.stack);
                            }else{
                                console.log('Connection established with pg db server')

                            }

                        })

                        var name = 'Shadoow00'; var pwd = '123456';

                        var hash = crypto.createHash("sha1").update(pwd).digest();
                        console.log(hash.toString('hex'));

                        pool.query("Select * from fredouil.users where id = 18 ",(err, res) => {

                            if(!err){
                                    console.log(res.rows);
                                 

                        
                            }else {
                                console.log(err.message);
                            }
                        
                            pool.end;
                        
                        })



                      
