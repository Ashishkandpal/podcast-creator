import React from "react";
import Button from "../../Button/Button";

const EpisodeDetails = ({ index, title, description, audioFile, onClick }) => {
  console.log("title", title);
  return (
    <div style={{ width: "100%", marginBottom: "5rem" }}>
      <h1 style={{ textAlign: "left", marginBottom: "0" }}>
        {index}. {title}
      </h1>
      <p style={{ marginLeft: "1rem" }} className="podcast-description">
        {description}
      </p>
      <Button
        text="Play"
        onClick={() => onClick(audioFile)}
        style={{ width: "100px" }}
      />
    </div>
  );
};

export default EpisodeDetails;
