import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route} from "react-router"
import Header from "./Components/Header/Header";
import SimpleBottomNavigation from "./Components/Header/MainNav";
import { Container } from "@mui/material";
import Trending from "./Pages/Trending/Trending";
import Movies from "./Pages/Movies/Movies";
import TvSeries from "./Pages/TvSeries/TvSeries";
import Search from "./Pages/Search/Search";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="App">
        <Container>
        <Routes>
          <Route path="*" Component={Trending} />
          <Route path="/" Component={Trending} />
          <Route path="/trending" Component={Trending} />
          <Route path="/movies" Component={Movies} />
          <Route path="/tv-series" Component={TvSeries} />
          <Route path="/search" Component={Search} />
        </Routes>
        </Container>
      </div>

      <SimpleBottomNavigation></SimpleBottomNavigation>
    </BrowserRouter>
  );
}

export default App;
