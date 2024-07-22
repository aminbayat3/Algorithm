import React, { useState } from "react";
import { Wheel } from "react-custom-roulette";
import badge from "../../assets/badge.png";
import { useDispatch } from "react-redux";
import "./fortune-wheel.styles.css";

import { setNumberOfBadges } from "../../store/infrastructure/infrastructure.action";
import CustomModal from "../custom-modal/custom-modal.component";

import { TUTORIAL_TEXT_SPIN_ALERT } from "../../utils/tutorial-texts";

const data = [
  { option: "10 Badges", style: { backgroundColor: "#cc8282" }, number: 10 },
  { option: "20 Badges", style: { backgroundColor: "#cc9f70" }, number: 20},
  { option: "30 Badges", style: { backgroundColor: "#c7cc64" }, number: 30},
  { option: "40 Badges", style: { backgroundColor: "#88b182" }, number: 40},
  { option: "50 Badges", style: { backgroundColor: "#61b2cc" }, number: 50},
  { option: "60 Badges", style: { backgroundColor: "#6373cc" }, number: 60 },
];

const FortuneWheel = ({isModalOpen, setIsModalOpen, setSpinCount}) => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [numOfBadgesWon, setNumOfBadgesWon] = useState(0);
  const [shouldBlink, setShouldBlink] = useState(false);

  const dispatch = useDispatch();

  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * data.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
  };

  return (
    <>
      <div
        style={{
          position: "absolute",
          width: "100vw",
          height: "93vh",
          top: "0px",
          left: "-24px",
          backgroundColor: "black",
          opacity: 0.8,
          zIndex: 10,
        }}
      ></div>
      <div style={{zIndex: 100, position: "absolute", left:"40%"}}>
      {isModalOpen && <CustomModal content={TUTORIAL_TEXT_SPIN_ALERT} setIsModalOpen={setIsModalOpen} /> }
      </div>
      
      <div
      className={shouldBlink ? "blinking" : ""}
        style={{
          position: "absolute",
          width: "18vw",
          height: "23vh",
          top: "38%",
          left: "45%",
          backgroundColor: "#f5b907",
          opacity: 0.4,
          zIndex: 10,
        }}
      ></div>
      <div style={{
        position: "absolute",
        top:"51%",
        left: "52.5%",
        display:"flex",
        zIndex: 150,
      }}>
        <h3 style={{fontWeight:"bold", color: "white", fontSize: "20px", marginRight: "15px"}}>{numOfBadgesWon}</h3>
        <img style={{width: "50px"}} src={badge} alt="badge" />
      </div>
      <div
        style={{
          position: "absolute",
          left: "40%",
          top: "30%",
          textAlign: "center",
          zIndex: 100,
        }}
      >
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          textColors={["#ffffff"]}
          fontFamily="Arial"
          fontSize={18}
          outerBorderColor="#faf602"
          outerBorderWidth={5}
          innerRadius={50}
          innerBorderColor="#000000"
          innerBorderWidth={5}
          radiusLineColor="#000000"
          radiusLineWidth={5}
          perpendicularText={true}
          textDistance={60}
          data={data}
          onStopSpinning={() => {
            setMustSpin(false);
            setNumOfBadgesWon(data[prizeNumber].number);
            setShouldBlink(true);
            dispatch(setNumberOfBadges(data[prizeNumber].number));
            setSpinCount(prevCount => prevCount + 1);
            // alert(`You won: ${data[prizeNumber].option}`);
          }}
        />
        <button
          onClick={handleSpinClick}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            boxShadow:
              "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          }}
        >
          Spin
        </button>
      </div>
    </>
  );
};

export default FortuneWheel;
