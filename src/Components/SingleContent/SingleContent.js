import React from "react";
import "./SingleContent.css";
import { img_300, unavailable } from "../../Config/Config";
import { Badge } from "@mui/material";
import ContentModal from "../Contentmodal/ContentModal";

const SingleContent = ({
  id,
  media_type,
  title,
  poster,
  release_date,
  vote,
}) => {
  return (
    <ContentModal id={id} media_type={media_type} >
      <Badge
        badgeContent={vote && vote.toFixed(1)}
        color={vote >= 6 ? "primary" : "secondary"}
      />
      <img
        className="poster"
        src={poster ? `${img_300}/${poster}` : unavailable}
        alt={title}
      />
      <b className="title">{title}</b>
      <div className="subTitle">
        <span>{media_type.toUpperCase()}</span>
        <span>{release_date}</span>
      </div>
    </ContentModal>
  );
};

export default SingleContent;
