
import TypingText from "../utilities/typing-text.component";

const TutorialStep = ({ guidImage, tutorialText, progressBarImage }) => {
    return (
        <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px",
          position: "relative",
          border: "1px dotted red",
          borderRadius: "40px",
          zIndex: 3,
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={guidImage}
            alt="guid"
            style={{ width: "80px", height: "100px", marginRight: "10px" }}
          />
          <div style={{fontSize: "14px"}}>
            <TypingText text={tutorialText} />
          </div>
        </div>
        <img
          src={progressBarImage}
          alt="progress-bar-1"
          style={{
            width: "55%",
            position: "absolute",
            bottom: "-37px",
          }}
        />
      </div>
    )
}

export default TutorialStep;