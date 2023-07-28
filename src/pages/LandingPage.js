import React, { useState, useEffect } from "react";
import Header from "../components/common/Header/Header";

const LandingPage = () => {
  const [headingContentIndex, setHeadingContentIndex] = useState(0);
  const headingContents = [
    "Podcasts that, inspire to Grow",
    "Create your own podcasts",
    "Listen to your favourite podcasts",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setHeadingContentIndex(
        (prevIndex) => (prevIndex + 1) % headingContents.length
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Header />
      <div className="wrapper">
        <section className="first">
          <div className="title">
            <div className="heading-container">
              <div className="heading">
                {headingContents[headingContentIndex]}
              </div>
            </div>
            <div></div>
            <div className="main-desc">
              We have the best podcasts about movies, politics,
            </div>
            <div className="main-desc">
              music, inspiration, relationships and more
            </div>
          </div>
          <div className="main-img-container">
            <img
              className="main-landing-img"
              src="./podcast.gif"
              alt="Your GIF"
            />
          </div>
        </section>

        <div className="divider"></div>
      </div>
    </div>
  );
};

export default LandingPage;

{
  /* <div className="title">
            <div className="">Podcasts that ,</div>
            <div>inspire to Grow</div>
            <div className="main-desc">
              We have the best podcasts about movies, politics,
            </div>
            <div className="main-desc">
              music, inspiration, relationships and more
            </div>
          </div> */
}
