import React from 'react'
// import videoFile from 'assets/Slider.mp4';

import "../styles/Slide.scss"


// import videoFile from '/public/assets/Slider.mp4'; // Ensure the path is correct
// import "../styles/Slide.scss";

const Slide = () => {
  return (
    <div className="video-container">
      <video
        autoPlay
        loop
        muted
        
        className="video"
      >
        <source src="/assets/Slider.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Slide;
