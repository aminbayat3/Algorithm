// ShopItem.js
import React from 'react';
import "./shop-page.styles.scss";

const ShopItem = ({ index, points, trophySrc, attributes }) => {
  return (
    <div className={`shop-item ${index < 9 ? 'view' : index < 12 ? 'scroll1' : 'scroll2'}`}>
      <div className="badge">1X</div>
      <div className="info">i</div>
      <div className="description">
        <p className="description-text">Trade your trophies for a fabulous sum of {points} Points</p>
        <div className="cross-button">X</div>
      </div>
      <img className="trophy" src={trophySrc} alt={`Trophy ${index + 1}`} />
      <div className="title">Title {index + 1}</div>
      <div className="shop-star-container">
        <span className="amount">{index + 1}</span>
        <img src='./assets/star.png' className='shop-star' alt='Star' />
      </div>
    </div>
  );
};

export default ShopItem;
