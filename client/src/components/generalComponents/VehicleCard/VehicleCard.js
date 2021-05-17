import React from "react";
import PropTypes from "prop-types";
import "./VehicleCard.scss";
import { fuel } from "./VehicleCardicons/fuel";
import { transmission } from "./VehicleCardicons/transmission";
import { year } from "./VehicleCardicons/year";
import { mileage } from "./VehicleCardicons/mileage";
import { auction } from "./VehicleCardicons/auction";

const VehicleCard = ({
  title,
  src,
  fuelText,
  transmissionText,
  yearNumber,
  mileageText,
  priceValue,
  auctionDate,
  page,
}) => {
  return (
    <div className="card__wrapper">
      <h3 className="card__title">{title}</h3>
      <div className="card__img-wrapper">
        <img className="card__img" src={src} alt=" " />
      </div>
      <div className="card__info-wrapper">
        <div className="card__fuel">
          <span className="card__fuel-img">{fuel()}</span>
          <p className="card__info-text">{fuelText}</p>
        </div>
        <div className="card__transmission">
          <span className="card__transmission-img">{transmission()}</span>
          <p className="card__info-text">{transmissionText}</p>
        </div>
        {page === "/catalog-in-stock" && (
          <div className="card__year">
            <span className="card__year-img">{year()}</span>
            <p className="card__info-text">{yearNumber}</p>
          </div>
        )}
        {page !== "/catalog-in-stock" && (
          <div className="card__auction">
            <span className="card__auction-img">{auction()}</span>
            <p className="card__info-text">{auctionDate}</p>
          </div>
        )}

        <div className="card__mileage">
          <span className="card__mileage-img">{mileage()}</span>
          <p className="card__info-text">{mileageText}</p>
        </div>
      </div>
      <span className="card__line"></span>
      {page === "/catalog-in-stock" && (
        <div className="card__price">
          <p className="card__price-text">Цена :</p>
          <p className="card__price-value">{priceValue}</p>
        </div>
      )}
      {page !== "/catalog-in-stock" && (
        <>
          <div className="card__details">
            <p className="card__details-title">Title/Sale Doc:</p>
            <p className="card__details-name">SALVAGE-VA</p>
          </div>
          <span className="card__line"></span>
          <div className="card__additionally-primary">
            <p className="card__additionally-title">Primary Damage:</p>
            <p className="card__additionally-name">Normal Wear</p>
          </div>
          <div className="card__additionally-highlits">
            <p className="card__additionally-title">Highlits:</p>
            <p className="card__additionally-name">
              Offsite Sales, Run and Drive
            </p>
          </div>
          <div className="card__additionally-seller">
            <p className="card__additionally-title">Seller:</p>
            <p className="card__additionally-name">Progressive</p>
          </div>
        </>
      )}
    </div>
  );
};

VehicleCard.propTypes = {
  onClick: PropTypes.func,
  title: PropTypes.string.isRequired,
  fuelText: PropTypes.string.isRequired,
  yearNumber: PropTypes.string,
  transmissionText: PropTypes.string.isRequired,
  mileageText: PropTypes.string.isRequired,
};

export default VehicleCard;
