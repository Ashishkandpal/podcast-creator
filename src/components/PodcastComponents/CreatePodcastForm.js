import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth, db, storage } from "../../firebase";
import Button from "../common/Button/Button";
import FileInput from "../common/Input/FileInput";
import Input from "../common/Input/Input";

const CreatePodcastForm = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [displayImage, setDisplayImage] = useState();
  const [bannerImage, setBannerImage] = useState();
  const [imgName, setImgName] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    toast.success("working");
    if (title && desc && displayImage && bannerImage) {
      console.log("inside the create pod");
      //1. upload files => get downloadable links
      try {
        const bannerImageRef = ref(
          storage,
          `podcasts/${auth.currentUser.uid}/${Date.now()}`
        );
        await uploadBytes(bannerImageRef, bannerImage);
        const bannerImageUrl = await getDownloadURL(bannerImageRef);

        const displayImageRef = ref(
          storage,
          `podcasts/${auth.currentUser.uid}/${Date.now()}`
        );
        await uploadBytes(displayImageRef, displayImage);
        const displayImageUrl = await getDownloadURL(displayImageRef);
        toast.success("Image uploaded");
        const podcastData = {
          title: title,
          description: desc,
          displayImage: displayImageUrl,
          bannerImage: bannerImageUrl,
          createdBy: auth.currentUser.uid,
        };
        const docRef = await addDoc(collection(db, "podcasts"), podcastData);
        setTitle("");
        setDesc("");
        setBannerImage(null);
        setDisplayImage(null);
        setImgName((prev) => !prev);
        console.log(
          `display image ${displayImage} banner image ${bannerImage}`
        );
        toast.success("Podcast created");
      } catch (e) {
        toast.error(e.message);
      }
      //2. create a new doc in a new collection called podcasts
      //3. save this new podcast episodes states in our podcasts
    } else {
    }
  };

  const bannerImageHandlerFunc = (file) => {
    console.log("banner", file);
    setBannerImage(file);
  };
  const displayImageHandlerFunc = (file) => {
    setDisplayImage(file);
    console.log("display", file);
  };
  return (
    <>
      <h1>Create Podcast</h1>
      <Input
        state={title}
        setState={setTitle}
        placeholder="Title"
        type="text"
        required={true}
      />
      <Input
        state={desc}
        setState={setDesc}
        placeholder="Description"
        type="text"
        required={true}
      />
      <FileInput
        accept={"image/*"}
        id="diplay-image-input"
        fileHandlerFunc={displayImageHandlerFunc}
        imgName={imgName}
        text="Display Image"
      />
      <FileInput
        accept={"image/*"}
        id="banner-image-input"
        fileHandlerFunc={bannerImageHandlerFunc}
        imgName={imgName}
        text="Banner Image"
      />
      <Button
        text={loading ? "Loading..." : "Create Podcast"}
        disabled={loading}
        onClick={handleSubmit}
      />
    </>
  );
};

export default CreatePodcastForm;
