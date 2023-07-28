import React from "react";
import { Link } from "react-router-dom";
import classes from "./PodcastCard.module.css";

const PodcastCard = ({ id, title, displayImage }) => {
  return (
    <Link to={`/podcasts/${id}`}>
      <div className={classes["podcast-card"]}>
        <img className={classes["display-image-podcast"]} src={displayImage} />
        <p className={classes["title-podcast"]}>{title}</p>
      </div>
    </Link>
  );
};

export default PodcastCard;
