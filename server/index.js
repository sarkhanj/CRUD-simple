const express = require("express");
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");
const e = require("express");

const db = mysql.createPool({
  host: "127.0.0.1",
  port: 3306,
  user: "root",
  password: "SJefry12.",
  database: "CRUDDatabase",
});

app.use(cors()); //cors-headers
app.use(express.json()); // need this to request something from front-end
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/api/get", (req,res) => {
  const sqlSelect = "SELECT * FROM movie_reviews;";
  db.query(sqlSelect,(err,result)=>{
    if(err){
      console.error(err);
    }else{
      res.send(result);
    }
  })
})

app.post("/api/insert", (req, res) => {
  const movie_name = req.body.movie_name;
  const movie_review = req.body.movie_review;

  const sqlInsert =
    "INSERT INTO movie_reviews (movie_name,movie_review) VALUES (?,?);";
  db.query(sqlInsert, [movie_name, movie_review], (err, result) => {
    if (err) console.error(err);
  });
});

app.delete("/api/delete/:movie_name", (req,res)=>{
  console.log(req.params);
  const name = req.params.movie_name;
  const sqlDelete =
    "DELETE FROM movie_reviews WHERE movie_name = ?;";
  db.query(sqlDelete, name, (err,result) => {
    if(err) console.error(err);
  })
})

app.put("/api/update", (req, res) => {
  const movie_review = req.body.movie_review;
  const movie_name = req.body.movie_name;
  const sqlUpdate = "UPDATE movie_reviews SET movie_review = ? WHERE movie_name = ?;";
  db.query(sqlUpdate, [movie_review, movie_name], (err, result) => {
    if (err) console.error(err);
  });
});

app.listen(3001, () => {
  console.log("Running on port 3001");
});
