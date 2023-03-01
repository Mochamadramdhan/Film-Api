import './App.css';
import { getMovieList, seacrhMovie } from './api';
import { useEffect, useState } from 'react';

const  App = () => {
  const [popularMovie,setPopularMovie]= useState([])
  const search = async (q)=>{
    if (q.length >3){
    const query = await seacrhMovie(q)
    setPopularMovie(query.results)
    }
  }
  useEffect (()=>{
    getMovieList().then((result)=>{
      setPopularMovie(result)
    })
  },[])

  const PopularMovieList =() =>{
    return popularMovie.map((movie,i)=>{
      return(        
          <div className='Movie-wrapper' key={i}>
            <div className='Movie-title'>{movie.title}</div>
            <img className='Movie-image' src={`${process.env.REACT_APP_BASEIMGURL}/${movie.poster_path}`} alt={`${movie.title} Poster`} />
            <div className='Movie-date'>Relese : {movie.release_date}</div>
            <div className='Movie-rate'>{movie.vote_average}</div>
          </div>
      )
    })
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>Ramdhan Movie</h1>
        <input placeholder='cari film kesayangan' 
        className='Movie-search' onChange={({target})=>
        search(target.value) }>

        </input>
        <div className='Movie-container'>
          <PopularMovieList/>
        </div>
      </header>
    </div>
  );
}

export default App;
