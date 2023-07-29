import React, { useEffect, useRef, useState } from "react";
import classes from "./AudioPlayer.module.css";
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import { BsFillSkipBackwardFill, BsFillSkipForwardFill } from "react-icons/bs";

const AudioPlayer = ({ audioSrc, image }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMute, setIsMute] = useState(false);
  const audioRef = useRef();
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);

  const handleDuration = (e) => {
    setCurrentTime(e.target.value);
    audioRef.current.currentTime = e.target.value;
  };

  const handleVolume = (e) => {
    setVolume(e.target.value);
    audioRef.current.volume = volume;
  };

  useEffect(() => {
    const audio = audioRef.current;
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetaData);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetaData);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetaData = () => {
    setDuration(audioRef.current.duration);
  };

  const handleEnded = () => {
    setCurrentTime(0);
    setIsPlaying(false);
  };

  const togglePlay = () =>
    isPlaying ? setIsPlaying(false) : setIsPlaying(true);

  const toggleMute = () => (isMute ? setIsMute(false) : setIsMute(true));

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (!isMute) {
      audioRef.current.volume = volume;
      setVolume(1);
    } else {
      audioRef.current.volume = 0;
      setVolume(0);
    }
  }, [isMute]);

  const forwardBy = () => {
    setCurrentTime((prev) => prev + 5);
    audioRef.current.currentTime += 5;
  };

  const backwardBy = () => {
    setCurrentTime((prev) => prev - 5);
    audioRef.current.currentTime -= 5;
  };

  return (
    <div className={classes["custom-audio-player"]}>
      <img
        className={classes["display-image-player"]}
        src={image}
        alt="display image"
      />
      <audio ref={audioRef} src={audioSrc} />
      <p className={classes["audio-btn"]} onClick={backwardBy}>
        <BsFillSkipBackwardFill />
      </p>
      <p className={classes["audio-btn"]} onClick={togglePlay}>
        {isPlaying ? <FaPause /> : <FaPlay />}
      </p>
      <p className={classes["audio-btn"]} onClick={forwardBy}>
        <BsFillSkipForwardFill />
      </p>
      <div className={classes["duration-flex"]}>
        <p>{formatTime(currentTime)}</p>
        <input
          type="range"
          max={duration}
          value={currentTime}
          step={0.01}
          onChange={handleDuration}
          className={classes["duration-range"]}
        />
        <p>-{formatTime(duration - currentTime)}</p>
        <p
          className={`${classes["audio-btn"]} ${classes["volume-btn"]}`}
          onClick={toggleMute}
        >
          {!isMute ? <FaVolumeUp /> : <FaVolumeMute />}
        </p>
        <input
          type="range"
          value={volume}
          max={1}
          min={0}
          step={0.01}
          onChange={handleVolume}
          className={classes["volume-range"]}
        />
      </div>
    </div>
  );
};

export default AudioPlayer;
