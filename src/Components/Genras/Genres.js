import { Chip } from "@mui/material";
import React, { useEffect } from "react";

const Genres = ({
  type,
  selectedGenres,
  setSelectedGenres,
  genres,
  setGenres,
  setPageNum,
}) => {
  const fetchGenres = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=4fde116eb2b94e94d1a37a427a3981ba&language=en-US`
    );
    const data = await response.json();
    setGenres(data.genres);
  };

  const addGenreHandler=(genre)=>{
    setSelectedGenres([...selectedGenres,genre])
    setGenres(genres.filter(element=>element.id!==genre.id))
    setPageNum(1)
  }

  const removeGenreHandler=(genre)=>{
    setGenres([genre,...genres])
    setSelectedGenres(selectedGenres.filter(element=>element.id!==genre.id))
    setPageNum(1)
  }

  useEffect(() => {
    fetchGenres();

    return () => setGenres([]);
    // eslint-disable-next-line
  }, []);

  return (
    <div style={{ padding: "10px" }}>
      {selectedGenres &&
        selectedGenres.map((genre) => {
          return (
            <Chip
              label={genre.name}
              style={{ margin: "2px" }}
              key={genre.id}
              clickable
              size="small"
              color="primary"
              onClick={()=>removeGenreHandler(genre)}
            />
          );
        })}
      {genres &&
        genres.map((genre) => {
          return (
            <Chip
              label={genre.name}
              style={{ margin: "2px" }}
              key={genre.id}
              clickable
              size="small"
              onClick={()=>addGenreHandler(genre)}
            />
          );
        })}
    </div>
  );
};

export default Genres;
