import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  QuerySnapshot,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/common/Button/Button";
import Header from "../components/common/Header/Header";
import AudioPlayer from "../components/common/Podcasts/AudioPlayer/AudioPlayer";
import EpisodeDetails from "../components/common/Podcasts/EpisodeDetails/EpisodeDetails";
import { auth, db } from "../firebase";

const PodcastDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [podcast, setPodcast] = useState({});
  const [episodes, setEpisodes] = useState([]);
  const [playingFile, setPlayingFile] = useState();
  const [creatorName, setCreatorName] = useState("");

  console.log(id);
  useEffect(() => {
    if (id) {
      getData();
    }
  }, [id]);

  const getData = async () => {
    try {
      const docRef = doc(db, "podcasts", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data", docSnap.data());
        setPodcast({ id: id, ...docSnap.data() });
        toast.success("podcast found");
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such podcast");
        toast.error("No such podcast");
        navigate("/podcasts");
      }
    } catch (e) {
      toast.error(e.message);
    }
  };

  useEffect(() => {
    if (podcast.createdBy) {
      getUserDisplayName(podcast.createdBy);
    }
  }, [podcast]);

  //taking out the name of the creator
  const getUserDisplayName = async (userId) => {
    try {
      if (!userId) {
        console.log("User ID is empty.");
        return null;
      }

      const userDocRef = doc(db, "users", userId);

      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const userName = userData.name;
        console.log("userName", userName);
        setCreatorName(userName);
        return userName;
      } else {
        console.log("User document not found.");
        return null;
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "podcasts", id, "episodes")),
      (querySnapshot) => {
        const episodeData = [];
        querySnapshot.forEach((doc) => {
          episodeData.push({ id: doc.id, ...doc.data() });
        });
        setEpisodes(episodeData);
      },
      (error) => console.log("Error fetching episodes:", error)
    );
    return () => {
      unsubscribe();
    };
  }, [id]);

  return (
    <div>
      <Header />
      <div className="input-wrapper" style={{ marginTop: "0rem" }}>
        {podcast.id && (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <h1 className="podcast-title-heading">{podcast.title}</h1>
              <span>{creatorName}</span>
              {podcast.createdBy === auth.currentUser.uid && (
                <Button
                  style={{ width: "200px" }}
                  text="Create Episode"
                  onClick={() => navigate(`/podcast/${id}/create-an-episode`)}
                />
              )}
            </div>

            <div className="banner-wrapper">
              <img src={podcast.bannerImage} alt="banner image" />
            </div>
            <p className="podcast-description">{podcast.description}</p>
            <h1 className="podcast-title-heading">Episodes</h1>
            {episodes.length > 0 ? (
              <>
                {episodes.map((episode, index) => {
                  return (
                    <EpisodeDetails
                      key={index}
                      index={index + 1}
                      title={episode.title}
                      description={episode.description}
                      audioFile={episode.audioFile}
                      onClick={(file) => setPlayingFile(file)}
                    />
                  );
                })}
              </>
            ) : (
              <p>No Episodes yet</p>
            )}
          </>
        )}
      </div>
      {playingFile && (
        <AudioPlayer audioSrc={playingFile} image={podcast.displayImage} />
      )}
    </div>
  );
};

export default PodcastDetails;
