import React, { useEffect, useState } from "react";
import SingleContent from "../../Components/SingleContent/SingleContent";
import CustomPagination from "../../Components/Pagination/CustomPagination";

const Trending = () => {
  const [trendingData, setTrendingData] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [totalpages, setTotalpages] = useState(1);

  const fetchTrending = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/trending/all/day?api_key=4fde116eb2b94e94d1a37a427a3981ba&page=${pageNum}`
    );
    const data = await response.json();
    setTrendingData(data);
    setTotalpages(data.total_pages);
  };

  useEffect(() => {
    fetchTrending();
    // eslint-disable-next-line
  }, [pageNum]);

  return (
    <div>
      <span className="pageTitle">TRENDING</span>
      <div className="trending">
        {trendingData.results &&
          trendingData.results.map((data) => (
            <SingleContent
              key={data.id}
              id={data.id}
              media_type={data.media_type}
              title={data.title || data.name}
              poster={data.poster_path}
              release_date={data.release_date || data.first_air_date}
              vote={data.vote_average}
            ></SingleContent>
          ))}
      </div>
      {totalpages > 1 && (
        <CustomPagination totalPages={totalpages} setPageNum={setPageNum} />
      )}
    </div>
  );
};

export default Trending;
