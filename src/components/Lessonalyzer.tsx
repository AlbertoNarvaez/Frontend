import CautionRule from "./CautionRule";
import LessonButton from "./LessonButton";
import KorvoAd from "./KorvoAd";
import PrivateLink from "./PrivateLink";
import WebDesignExpert from "./WebDesignExpert";
import PupaCoinAlert from "./PupaCoinAlert";

export default function Lessonalyzer() {
  return (
    <div id="main-container">
      <div id="solar-opposites-header">
        <img
          id="header-img"
          src="/img/header-image.4a423608.png"
          alt="Welcome to my web-site for The Solar Opposites."
        />
      </div>

      <div id="content-flex-container">
        <div style={{ marginBottom: "5px", width: "100%" }}>
          <CautionRule height="6px" barWidth={15} />
        </div>

        <div id="content-inner-flex-container">
          <LessonButton />
          <KorvoAd />
          <div id="bottom-caution-rule" style={{ marginTop: "5px", width: "100%" }}>
            <CautionRule height="6px" barWidth={15} />
          </div>
          <PrivateLink />
          <WebDesignExpert />
        </div>

        <PupaCoinAlert />
      </div>
    </div>
  );
}
