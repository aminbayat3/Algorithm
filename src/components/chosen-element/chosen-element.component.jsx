
import badge from "../../assets/badge.png";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { selectNumOfBadges } from "../../store/infrastructure/infrastructure.selector";

import { setNumberOfBadges, setShowDiscount } from "../../store/infrastructure/infrastructure.action";

import { setIsSuccessful } from "../../store/infrastructure/infrastructure.action";
import { selectIsSuccessful } from "../../store/infrastructure/infrastructure.selector";

import "./chosen-element.styles.scss";

const ChosenElement = ({data, isShopModalOpen, setIsShopModalOpen}) => {
    const { badgesRequired, title, trophy } = data;
    const isSuccessful = useSelector(selectIsSuccessful);
    const numOfBadges = useSelector(selectNumOfBadges);
    const dispatch = useDispatch();

    useEffect(() => {
        if(isShopModalOpen && isSuccessful) {
            setTimeout(() => {
                dispatch(setIsSuccessful(null));
            }, 4000);

            setIsShopModalOpen(false);
        }

    }, [isSuccessful, isShopModalOpen])

    const handleButtonClick = () => {
        if(numOfBadges >= badgesRequired) {
            dispatch(setNumberOfBadges(-badgesRequired));
            dispatch(setIsSuccessful(true));
            dispatch(setShowDiscount(true));
        } else { 
            dispatch(setIsSuccessful(false));
        }
    }

    const handleQuit = () => {
        setIsShopModalOpen(false);
        dispatch(setIsSuccessful(null));
    }

  return (
    <div style={{cursor: "auto"}} className="shop__card">
      <div className="card__header">
        <div className="card__badge">1X</div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <div className="x-sign" onClick={handleQuit}>
              X
            </div>
          </div>
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          className="trophy"
          src={trophy}
          style={{
            width: "11rem",
            height: "9rem",
            marginTop: "1rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "5px 8px 0 8px",
          }}
          alt="trophy"
        />
      </div>
      <div className="card__title">{title}</div>
      <div className="card__button__container" style={{width: "100%", display: 'flex', justifyContent: 'center'}}>
      <button className="card__button" onClick={handleButtonClick}>
        <span className="card__amount">{badgesRequired}</span>
        <img
          src={badge}
          style={{ width: "40px" }}
          className="card__img"
          alt="badge"
        />
      </button>
      </div>
      
    </div>
  );
};

export default ChosenElement;
