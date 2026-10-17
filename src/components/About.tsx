import { useEffect, useRef } from "react";
import "./styles/About.css";
import { config } from "../config";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextSplitter } from "../utils/textSplitter";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const paragraph = paragraphRef.current;
    if (!section || !title || !paragraph) return;

    const titleSplit = new TextSplitter(title, { type: "chars" });
    const paragraphSplit = new TextSplitter(paragraph, { type: "words" });
    const isMobile = window.matchMedia("(max-width: 899px)").matches;

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: isMobile ? "top 82%" : "top 65%",
        toggleActions: "play none none reverse",
        invalidateOnRefresh: true,
      },
    });

    timeline
      .fromTo(
        titleSplit.chars,
        { autoAlpha: 0, y: isMobile ? 28 : 60, rotate: isMobile ? 3 : 8 },
        {
          autoAlpha: 1,
          y: 0,
          rotate: 0,
          duration: isMobile ? 0.55 : 0.75,
          stagger: 0.035,
          ease: "power2.out",
        }
      )
      .fromTo(
        paragraphSplit.words,
        { autoAlpha: 0, y: isMobile ? 24 : 55, filter: "blur(4px)" },
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: isMobile ? 0.5 : 0.8,
          stagger: isMobile ? 0.018 : 0.025,
          ease: "power3.out",
        },
        "-=0.2"
      );

    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      timeline.scrollTrigger?.kill();
      timeline.kill();
      titleSplit.revert();
      paragraphSplit.revert();
    };
  }, []);

  return (
    <div className="about-section" id="about" ref={sectionRef}>
      <div className="about-me">
        <h3 ref={titleRef}>{config.about.title}</h3>
        <p ref={paragraphRef}>
          {config.about.description}
        </p>
      </div>
    </div>
  );
};

export default About;
