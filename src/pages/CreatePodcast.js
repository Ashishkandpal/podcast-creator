import React from "react";
import Header from "../components/common/Header/Header";
import CreatePodcastForm from "../components/PodcastComponents/CreatePodcastForm";

const CreatePodcast = () => {
  return (
    <div>
      <Header />
      <div className="input-wrapper">
        <CreatePodcastForm />
      </div>
    </div>
  );
};

export default CreatePodcast;
