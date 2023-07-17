import React, { useEffect, useState } from "react";
import SingleContent from "../../Components/SingleContent/SingleContent";
import CustomPagination from "../../Components/Pagination/CustomPagination";
import Genres from "../../Components/Genras/Genres";

const Movies = () => {
  const [moviesData, setMoviesData] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [totalpages, setTotalpages] = useState(1);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genres, setGenres] = useState([]);

  let selectedGenresId = [];
  selectedGenres.map((genre) => selectedGenresId.push(genre.id))
  const generData=selectedGenresId.join(",")
  console.log(generData);

  const fetchMovies = async () => {
    const response = await fetch(`
    https://api.themoviedb.org/3/discover/movie?api_key=4fde116eb2b94e94d1a37a427a3981ba&language=en-US&page=${pageNum}&sort_by=popularity.desc&with_genres=${generData}`);
    const data = await response.json();
    setMoviesData(data);
    setTotalpages(data.total_pages);
  };

  useEffect(() => {
    fetchMovies();
    // eslint-disable-next-line
  }, [pageNum,selectedGenres]);

  return (
    <div>
      <span className="pageTitle">MOVIES</span>
      <Genres
        type="movie"
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
        setPageNum={setPageNum}
      />
      <div className="movies">
        {moviesData.results &&
          moviesData.results.map((data) => (
            <SingleContent
              key={data.id}
              id={data.id}
              media_type="movie"
              title={data.title || data.name}
              poster={data.poster_path}
              release_date={data.release_date || data.first_air_date}
              vote={data.vote_average}
            ></SingleContent>
          ))}
      </div>
      {totalpages > 1 && (
        <CustomPagination
          totalPages={totalpages <= 500 ? totalpages : 500}
          setPageNum={setPageNum}
        />
      )}
    </div>
  );
};

export default Movies;
