import React from "react";
import '../css/hero.css';
const Hero = () => {
  return (
    <div>
      <video autoPlay={true} muted loop>
        <source src="/resources/logo_animation.mp4" type="video/mp4" />
      </video>
    </div>

  );
};

export default Hero;