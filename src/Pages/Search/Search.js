import { Button, Tab, Tabs, TextField, ThemeProvider } from "@mui/material";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import SingleContent from "../../Components/SingleContent/SingleContent";
import CustomPagination from "../../Components/Pagination/CustomPagination";

const Search = () => {
  const [type, setType] = useState(0);
  const [pageNum, setPageNum] = useState(1);
  const [totalpages, setTotalpages] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [invalidData, setInvalidData] = useState(false);

  const fetchSearch = async () => {
    const response = await fetch(`
    https://api.themoviedb.org/3/search/${
      type ? "tv" : "movie"
    }?api_key=4fde116eb2b94e94d1a37a427a3981ba&language=en-US&query=${searchInput}&page=${pageNum}`);
    const data = await response.json();
    setSearchData(data);
    setTotalpages(data.total_pages);
    invalidDataChecker(data);
  };

  const searchInputHandler = (event) => {
    setSearchInput(event.target.value);
  };

  const invalidDataChecker = (data) => {
    setInvalidData(false);
    if (setSearchInput.length > 0 && data.total_results === 0) {
      console.log(setSearchInput.length);
      setInvalidData(true);
    }
  };

  useEffect(() => {
    fetchSearch();
    // eslint-disable-next-line
  }, [type]);

  const darkTheme = {
    backgroundColor: "transparent",
    color: "white",
    flex: 0.5,
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", textAlign: "center" }}
    >
      <div style={{ display: "flex", justifyContent: "center", marginTop:"10px" }}>
        <TextField
          style={darkTheme}
          id="filled-search"
          label="Search field"
          type="Search"
          variant="filled"
          onChange={searchInputHandler}
        />
        <Button variant="contained" onClick={() => fetchSearch()}>
          <SearchIcon />
        </Button>
      </div>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <Tabs
          value={type}
          indicatorColor="primary"
          color="Primary"
          style={{ marginTop: "20px" }}
          onChange={(event, newVal) => {
            setType(newVal);
            console.log(newVal);
          }}
        >
          <Tab style={{ width: "150px" }} label="Movie" />
          <Tab style={{ width: "150px" }} label="Tv Series" />
        </Tabs>
      </div>
      <div className="movies">
        {searchData.results &&
          searchData.results.map((data) => (
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
      {invalidData && searchInput.length>0 &&
        (type ? <h1>No Tv Series Found</h1> : <h1>No Movie Found</h1>)}
      {console.log(searchInput.length)}
      {totalpages > 1 && (
        <CustomPagination
          totalPages={totalpages <= 500 ? totalpages : 500}
          setPageNum={setPageNum}
        />
      )}
    </div>
  );
};

export default Search;
