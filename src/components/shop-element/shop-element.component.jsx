import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import badge from "../../assets/badge.png";

import { setChosenElement } from "../../store/infrastructure/infrastructure.action";


import "./shop-element.styles.scss";

const ShopElement = ({ data, setIsShopModalOpen }) => {
  const [showInfo, setShowInfo] = useState(false);
  const dispatch = useDispatch();

  const { badgesRequired, title, value, trophy } = data;

  const handleInfoClick = (event) => {
    event.stopPropagation();
    setShowInfo(true);
  };

  const handleExitClick = (event) => {
    event.stopPropagation();
    setShowInfo(false);
  };

  const handleShopClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    dispatch(setChosenElement(data));
    setIsShopModalOpen(true);
  }

  return (
    <div className="shop__card" onClick={handleShopClick}>
      <div className="card__header">
        <div className="card__badge">1X</div>
        <div className="card__info" onClick={handleInfoClick}>
          <span className="sign">i</span>
        </div>
      </div>
      {showInfo && (
        <div className="card__description">
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <div className="x-sign" onClick={handleExitClick}>
              X
            </div>
          </div>

          <div className="decription__text__container">
            <p className="description__text">{value}</p>
          </div>
        </div>
      )}
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          pointerEvents: "none"
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
      <div className="card__img__container">
        <span className="card__amount">{badgesRequired}</span>
        <img
          src={badge}
          style={{ width: "40px" }}
          className="card__img"
          alt="badge"
        />
      </div>
    </div>
  );
};

export default ShopElement;
