import "./styles/Landing.css";

const HeroPortrait = () => {
  return (
    <div className="character-model hero-portrait" aria-hidden="true">
      <div className="portrait-glow" />
      <img
        src="/images/muhammad-sakeeb-portrait.png"
        alt=""
        loading="eager"
        decoding="async"
      />
    </div>
  );
};

export default HeroPortrait;
