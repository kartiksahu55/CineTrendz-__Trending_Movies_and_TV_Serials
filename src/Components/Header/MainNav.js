import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import MovieIcon from '@mui/icons-material/Movie';
import TvIcon from '@mui/icons-material/Tv';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const styleClass = {
  backgroundColor: "#2d313a",
  position: "fixed",
  bottom: 0,
  width: "100%",
  zIndex: 100,
};
export default function SimpleBottomNavigation() {
  const [value, setValue] = useState(0);
  const navigate=useNavigate()

  useEffect(()=>{
    if(value===0) navigate("/trending")
    else if(value===1) navigate("/movies")
    else if(value===2) navigate("/tv-series")
    else if(value===3) navigate("/search")
    window.scroll(0,0)
  },[value,navigate])

  return (
    <Box sx={{ width: 500 }}>
      <BottomNavigation
        showLabels
        style={styleClass}
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          style={{ color: "white" }}
          label="Trending"
          icon={<WhatshotIcon />}
        />
        <BottomNavigationAction
          style={{ color: "white" }}
          label="Movies"
          icon={<MovieIcon />}
        />
        <BottomNavigationAction
          style={{ color: "white" }}
          label="Tv Series"
          icon={<TvIcon />}
        />
        <BottomNavigationAction
          style={{ color: "white" }}
          label="Search"
          icon={<SearchIcon />}
        />
      </BottomNavigation>
    </Box>
  );
}
