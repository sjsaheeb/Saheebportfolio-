import { useEffect } from "react";
import About from "./About";
import Career from "./Career";
import Contact from "./Contact";
import Cursor from "./Cursor";
import Landing from "./Landing";
import Navbar from "./Navbar";
import SocialIcons from "./SocialIcons";
import WhatIDo from "./WhatIDo";
import Work from "./Work";
import TechStackNew from "./TechStackNew";
import CallToAction from "./CallToAction";
import setSplitText from "./utils/splitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const MainContainer = () => {
  useEffect(() => {
    let cleanupTextAnimations = () => {};
    let resizeTimer = 0;

    const setupTextAnimations = () => {
      cleanupTextAnimations();
      cleanupTextAnimations = setSplitText();
      requestAnimationFrame(() => ScrollTrigger.refresh());
    };

    const resizeHandler = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(setupTextAnimations, 200);
    };

    // Run once for normal navigation, then recalculate when the loader has
    // unlocked scrolling and when the final web font metrics are available.
    setupTextAnimations();
    window.addEventListener("portfolio:ready", setupTextAnimations);
    window.addEventListener("resize", resizeHandler);
    document.fonts?.ready.then(setupTextAnimations);

    return () => {
      window.clearTimeout(resizeTimer);
      cleanupTextAnimations();
      window.removeEventListener("portfolio:ready", setupTextAnimations);
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  return (
    <div className="container-main">
      <Cursor />
      <Navbar />
      <SocialIcons />
      <div className="container-main">
        <Landing />
        <About />
        <WhatIDo />
        <Career />
        <Work />
        <TechStackNew />
        <CallToAction />
        <Contact />
      </div>
    </div>
  );
};

export default MainContainer;
