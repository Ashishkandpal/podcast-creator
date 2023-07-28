import { collection, doc, onSnapshot, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/common/Header/Header";
import Input from "../components/common/Input/Input";
import PodcastCard from "../components/common/Podcasts/PodcastsCard/PodcastCard";
import { db } from "../firebase";
import { setPodcasts } from "../slices/podcastSlice";

const Podcasts = () => {
  const dispatch = useDispatch();
  const podcasts = useSelector((state) => state.podcasts.podcasts);
  const [search, setSearch] = useState("");
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "podcasts")),
      (querySnapshot) => {
        const podcastsData = [];
        querySnapshot.forEach((doc) => {
          podcastsData.push({ id: doc.id, ...doc.data() });
        });
        dispatch(setPodcasts(podcastsData));
      }
    );
    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  const filteredPodcasts = podcasts.filter((item) =>
    item.title.trim().toLowerCase().includes(search.trim().toLowerCase())
  );
  return (
    <div>
      <Header />
      <div className="input-wrapper" style={{ marginTop: "2rem" }}>
        <h1>Discover Podcasts</h1>
        <Input
          state={search}
          setState={setSearch}
          placeholder="Search"
          type="text"
          required={true}
        />
        {filteredPodcasts.length > 0 ? (
          <div className="podcasts-flex" style={{ marginTop: "2rem" }}>
            {filteredPodcasts.map((item) => {
              return (
                <PodcastCard
                  id={item.id}
                  title={item.title}
                  displayImage={item.displayImage}
                />
              );
            })}
          </div>
        ) : (
          <p>{search ? "Podcasts not found" : "No podcasts on platform"}</p>
        )}
      </div>
    </div>
  );
};

export default Podcasts;
