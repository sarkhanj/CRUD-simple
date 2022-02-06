import { useState, useEffect } from "react";
import "./App.css";

import axios from "axios ";

function App() {
  const [movieName, setMovieName] = useState("");
  const [review, setReview] = useState("");
  const [movieList, setMovieList] = useState([]);

  const [newReview, setNewReview] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/api/get").then((response, err) => {
      if (err) {
        console.error(err);
      } else {
        setMovieList(response.data);
      }
    });
  }, []);

  const submitReview = () => {
    axios.post("http://localhost:3001/api/insert", {
      movie_name: movieName,
      movie_review: review,
    });
    setMovieList([
      ...movieList,
      { movie_name: movieName, movie_review: review },
    ]);
  };

  const deleteReview = (movie_name) => {
    axios.delete(`http://localhost:3001/api/delete/${movie_name}`);
  }
  
  const updateReview = (movie_name) => {
    axios.put("http://localhost:3001/api/update", {
      movie_name: movie_name,
      movie_review: newReview
    });
    setNewReview("");
  }

  return (
    <div className="App">
      <h1>CRUD Application</h1>
      <div className="form">
        <label>Movie Name:</label>
        <input
          type="text"
          name="movieName"
          onChange={(e) => {
            setMovieName(e.target.value);
          }}
        />
        <label>Review:</label>
        <input
          type="text"
          name="review"
          onChange={(e) => {
            setReview(e.target.value);
          }}
        />
        <button onClick={submitReview}>Submit</button>
      </div>
      {movieList.map((movie, key) => {
        return (
          <div className="card" key={key}>
            <h1>{movie.movie_name}</h1>
            <p>{movie.movie_review}</p>
            <button id="deleteButton" onClick={()=>deleteReview(movie.movie_name)}>Delete</button>
            <input type="text" onChange={(e)=>setNewReview(e.target.value)}/>
            <button id="updateButton" onClick={()=>updateReview(movie.movie_name)}>Update</button>

          </div>
        );
      })}
    </div>
  );
}

export default App;
