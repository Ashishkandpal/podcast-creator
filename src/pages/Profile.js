import React, { useState, useEffect } from "react";
import Header from "../components/common/Header/Header";
import { useSelector } from "react-redux";
import { auth, db } from "../firebase";
import {
  onSnapshot,
  doc,
  getDocs,
  query,
  collection,
  where,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import toast from "react-hot-toast";
import Loader from "../components/common/Loader/Loader";
import PodcastCard from "../components/common/Podcasts/PodcastsCard/PodcastCard";

const Profile = () => {
  const user = useSelector((state) => state.user.user);
  const [podcasts, setPodcasts] = useState([]);
  let userProPic = '';
  useEffect(() => {
    const fetchDocs = async () => {
      const q = query(
        collection(db, "podcasts"),
        where("createdBy", "==", user.uid)
      );
      const querySnapshot = await getDocs(q);
      const docsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPodcasts(docsData);
    };
    if (user) {
      fetchDocs();
      if (user.profilePic) {
        localStorage.setItem('user', JSON.stringify(user));
      }
      console.log(user.profilePic);
    }
  }, [user]);

  console.log("My User", user);
  if (!user) {
    return <Loader />;
  }

  userProPic = JSON.parse(localStorage.getItem('user')).profilePic;
  console.log(userProPic);

  return (
    <div>
      <Header />
      <div className="wrapper">
        <h1>Profile</h1>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "2rem",
          }}
        >
          {/* <PodcastCard title={user.name} displayImage={user.profilePic} /> */}
          <div className="podcast-card">
            <img className="display-image-podcast" src={userProPic} />
            <p className="title-podcast">{user.name}</p>
          </div>
        </div>
        <h1 style={{ marginBottom: "2rem" }}>My Podcasts</h1>
        <div className="podcast-flex">
          {podcasts.length == 0 ? (
            <p style={{ fontSize: "1.2rem" }}>You Have Zero Podcasts</p>
          ) : (
            <>
              {podcasts.map((podcast) => (
                <PodcastCard
                  key={podcast.id}
                  id={podcast.id}
                  title={podcast.title}
                  displayImage={podcast.displayImage}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

// import { getAuth, updateProfile } from "firebase/auth";
// const auth = getAuth();
// updateProfile(auth.currentUser, {
//   displayName: "Jane Q. User", photoURL: "https://example.com/jane-q-user/profile.jpg"
// }).then(() => {
//   // Profile updated!
//   // ...
// }).catch((error) => {
//   // An error occurred
//   // ...
// });

// import { getAuth, updateEmail } from "firebase/auth";
// const auth = getAuth();
// updateEmail(auth.currentUser, "user@example.com").then(() => {
//   // Email updated!
//   // ...
// }).catch((error) => {
//   // An error occurred
//   // ...
// });

// import { getAuth, updatePassword } from "firebase/auth";

// const auth = getAuth();

// const user = auth.currentUser;
// const newPassword = getASecureRandomPassword();

// updatePassword(user, newPassword).then(() => {
//   // Update successful.
// }).catch((error) => {
//   // An error ocurred
//   // ...
// });
