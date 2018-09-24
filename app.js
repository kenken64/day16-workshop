require('dotenv').config()
const express =  require("express"),
      mysql = require("mysql"),
      q = require("q"),
      bodyParser = require("body-parser");

var app = express();
const NODE_PORT = process.env.PORT;

const sqlFindAllFilms = "SELECT * FROM film";

const sqlFindOneBook = "SELECT idbooks, name, author, publish_year, isbn FROM books WHERE idbooks=?";

console.log("DB USER : " + process.env.DB_USER);
console.log("DB NAME : " + process.env.DB_NAME);
/**
 * DB_HOST="localhost"
 * DB_PORT=3306
 * user=root
 * password=password@123
 * database=sakilla
 * 4
 */

function A (){
    var aaConfig = process.env.AA_CONFIG;
    connectGoogle(aaConfig);
}

var pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: process.env.DB_CONLIMIT
    //debug: true
})

var makeQuery = (sql, pool)=>{
    console.log(sql);
    
    return  (args)=>{
        var defer = q.defer();
        pool.getConnection((err, connection)=>{
            if(err){
                defer.reject(err);
                return;
            }
            console.log(args);
            connection.query(sql, args || [], (err, results)=>{
                connection.release();
                if(err){
                    defer.reject(err);
                    return;
                }
                console.log(">>> "+ results);
                defer.resolve(results); 
            })
        });
        return defer.promise;
    }
}

var findAllFilms = makeQuery(sqlFindAllFilms, pool);
var findOneBookById = makeQuery(sqlFindOneBook, pool);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/films", (req, res)=>{
    findAllFilms().then((results)=>{
        res.json(results);
    }).catch((error)=>{
        console.log(error);
        res.status(500).json(error);
    });
});

app.get("/books/:bookId", (req, res)=>{
    console.log("/books params !");
    var bookId = req.params.bookId;
    console.log(bookId);
    findOneBookById([parseInt(bookId)]).then((results)=>{
        console.log(results);
        res.json(results);
    }).catch((error)=>{
        res.status(500).json(error);
    })
    
})

app.get("/books", (req, res)=>{
    console.log("/books query !");
    var bookId = req.query.bookId;
    console.log(bookId);
    findOneBookById([parseInt(bookId)]).then((results)=>{
        console.log(results);
        res.json(results);
    }).catch((error)=>{
        res.status(500).json(error);
    })
})

app.listen(NODE_PORT, ()=>{
    console.log(`Listening to server at ${NODE_PORT}`)
})
