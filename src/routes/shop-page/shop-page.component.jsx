// import ShopCard from "../../components/shop-card/shop-card.component";

// import { SHOP_PAGE_DATA } from "./shop-page-data";

// const ShopPage = () => {
//     return (
//         <div style={{display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "60px", width: "100%", marginTop: "50px"}}>
//             {SHOP_PAGE_DATA.map((data) => {
//             return <ShopCard data={data} />
//         })}
//         </div>
//     )
// }

// export default ShopPage;

// Shop.js
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Alert } from "@mui/material";
// import ShopItem from "./shop-item";
import { SHOP_PAGE_DATA } from "./shop-page-data";

import ShopElement from "../../components/shop-element/shop-element.component";

import ChosenElement from "../../components/chosen-element/chosen-element.component";

import { selectChosenElement } from "../../store/infrastructure/infrastructure.selector";

import { selectIsSuccessful } from "../../store/infrastructure/infrastructure.selector";

const ShopPage = () => {
  const [isShopModalOpen, setIsShopModalOpen] = useState(false);
  const isSuccessful = useSelector(selectIsSuccessful);
  const chosenElement = useSelector(selectChosenElement);

  // useEffect(() => {

  // }, [])

  return (
    <div style={{ display: "flex", flexWrap: "wrap", position: "relative" }}>
      {isSuccessful === true ? (<Alert variant="filled" sx={{position: "absolute", zIndex: 100,marginTop: "20px", width: "100%"}} severity="success">{`You Received ${chosenElement.discount} discount!`} </Alert>) : isSuccessful === false ? (<Alert sx={{position: "absolute", zIndex: 100, marginTop: "20px", width: "100%"}} variant="filled" severity="warning">You Don't have Enought badge!</Alert>) : (<></>)}
      {isShopModalOpen && (
        <>
          <div
            style={{
              backgroundColor: "black",
              opacity: 0.8,
              width: "100vw",
              height: "145vh",
              position: "absolute",
              left: "-25px",
              zIndex: 50,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          ></div>
          <div
            style={{
              width: "100%",
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              zIndex: 100,
            }}
          >
            <ChosenElement data={chosenElement} isShopModalOpen={isShopModalOpen} setIsShopModalOpen={setIsShopModalOpen} />
          </div>
        </>
      )}
      {SHOP_PAGE_DATA.map((data) => {
        return <ShopElement data={data} setIsShopModalOpen={setIsShopModalOpen} />;
      })}
    </div>
  );
};

export default ShopPage;
