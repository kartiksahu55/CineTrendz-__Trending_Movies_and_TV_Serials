import "./ContentModal.css";

import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { useEffect, useState } from "react";
import {
  img_500,
  unavailable,
  unavailableLandscape,
} from "../../Config/Config";
import Carousel from "../Carousel/Carousel";

const ContentModal = ({ children, id, media_type }) => {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [open, setOpen] = useState(false);
  const [contentData, setContentData] = useState([]);
  const [videotData, setVideotData] = useState([]);

  const fetchData = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/${media_type}/${id}?api_key=4fde116eb2b94e94d1a37a427a3981ba&language=en-US`
    );
    const data = await response.json();
    setContentData(data);
  };
  const fetchVideo = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=4fde116eb2b94e94d1a37a427a3981ba&language=en-US`
    );
    const data = await response.json();
    setVideotData(data.results[0]?.key);
  };

  useEffect(() => {
    fetchData();
    fetchVideo();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="media" onClick={handleOpen}>
        {children}
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
            <div className="box">
            <img
              className="portrate_mode"
              src={
                contentData.poster_path
                ? `${img_500}/${contentData.poster_path}`
                : unavailable
              }
              alt={contentData.title}
            />
            <img
              className="landscape_mode"
              src={
                contentData.backdrop_path
                  ? `${img_500}/${contentData.backdrop_path}`
                  : unavailableLandscape
              }
              alt={contentData.title}
            />
            
            <Carousel className="corousel" id={id} media_type={media_type} ></Carousel>
            <div className="content_details">
            <h2 className="title">{contentData.title || contentData.name}</h2>
              <p className="tagline">{contentData.tagline}</p>
              <textarea className="overview" value={contentData.overview} readOnly/>
              
              <Button 
              className="btn"
              href={`https://www.imdb.com/title/${contentData.imdb_id}`}  
              target="_blank"
              variant="contained" disableElevation>
                IMDB
              </Button>
              <Button 
              className="btn"
              href={`https://www.youtube.com/watch?v=${videotData}`} 
              target="_blank"
              color="error"
              variant="contained" disableElevation>
                <YouTubeIcon />
                Watch The Traler
              </Button>
            </div>
           
            
            </div>
        </Fade>
      </Modal>
    </>
  );
};

export default ContentModal;
