import React, { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
// import PinDropIcon from "@mui/icons-material/PinDrop";
import { MdPinDrop } from "react-icons/md";
import { IoMdHome } from "react-icons/io";
import { MdOutlineLocationCity } from "react-icons/md";
// import HomeIcon from "@material-ui/icons/Home";
// import LocationCityIcon from "@material-ui/icons/LocationCity";
// import PublicIcon from "@material-ui/icons/Public";
// import PhoneIcon from "@material-ui/icons/Phone";
import { FaPhoneAlt } from "react-icons/fa";
import { FaPersonWalking } from "react-icons/fa6";
// import TransferWithinAStationIcon from "@material-ui/icons/TransferWithinAStation";
import { Country, State } from "country-state-city";
import MetaData from "../layout/MetaData";
import { saveShippingInfo } from "../../features/cartSlice";
import CheckoutSteps from "../Cart/checkoutSteps.jsx";
import "./shipping.css";

const Shipping = ({ history }) => {
  const dispatch = useDispatch();
  const { shippingInfo } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingInfo?.address || "");
  const [city, setCity] = useState(shippingInfo?.city || "");
  const [state, setState] = useState(shippingInfo?.state || "");
  const [country, setCountry] = useState(shippingInfo?.country || "none");
  const [pinCode, setPinCode] = useState(shippingInfo?.pinCode || "");
  const [phoneNo, setPhoneNo] = useState(shippingInfo?.phoneNo || "");
  const [submitted, setSubmitted] = useState(false);

  const shippingSubmit = (e) => {
    e.preventDefault();
    console.log("shippingSubmit");

    // if (phoneNo.length < 10 || phoneNo.length > 10) {
    //   alert.error("Phone Number should be 10 digits Long");
    //   return;
    // }
    dispatch(
      saveShippingInfo({ address, city, state, country, pinCode, phoneNo })
    );
    // history.push("/order/confirm");
    setSubmitted(true);
  };

  return (
    <Fragment>
      <MetaData title="Shipping Details" />

      <CheckoutSteps activeStep={0} />

      <div className="shippingContainer">
        <div className="shippingBox">
          <h2 className="shippingHeading">Shipping Details</h2>

          <form
            className="shippingForm"
            encType="multipart/form-data"
            onSubmit={shippingSubmit}
          >
            <div>
              <IoMdHome />
              <input
                type="text"
                placeholder="Address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div>
              <MdOutlineLocationCity />
              <input
                type="text"
                placeholder="City"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div>
              <MdPinDrop />
              <input
                type="number"
                placeholder="Pin Code"
                required
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
              />
            </div>

            <div>
              <FaPhoneAlt />
              <input
                type="number"
                placeholder="Phone Number"
                required
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                size="10"
              />
            </div>

            <div>
              {/* <PublicIcon /> */}

              <select
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="">Country</option>
                {Country &&
                  Country.getAllCountries().map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>

            {country && (
              <div>
                <FaPersonWalking />

                <select
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  <option value="">State</option>
                  {State &&
                    State.getStatesOfCountry(country).map((item) => (
                      <option key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
            )}
            <input
              type="submit"
              value="Continue"
              className="shippingBtn"
              disabled={state ? false : true}
            />
            {submitted && <Navigate to="/order/confirm" />}
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Shipping;
