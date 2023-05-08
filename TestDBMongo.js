const express = require('express'); // définit expressJS
const MongoClient = require('mongodb').MongoClient; // définit le middleware mongodb à charger et crée l’instance MongoClient



const dsnMongoDB = "mongodb://127.0.0.1:27017/";



            MongoClient.connect(dsnMongoDB, function(err, db) {

                if (err) {throw err;
                }else {
                    console.log("Connected")
                }

                
                // Déclarer la Base de Données
                var dbo = db.db("db-CERI");

                // Récupérer la collection 
                dbo.collection("CERISoNet").find({}).toArray(function(err, result) {
                if (err) throw err;

                //console.log(result);

                console.log(result[2].date);
                db.close();
                });

            });
        






    




