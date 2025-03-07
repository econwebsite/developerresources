import React from "react";
import "./Overview.css";
// import ModalButton from "../../../ModelForm/ModalButton"

const Overview = ({ data }) => {
  if (!data?.productDetail) {
    return <div>No product details available</div>;
  }

  const {productOverview } = data.productDetail;

  return (
    <div className="Overview-container">
      
      <h1 className="Overview-title">Product Overview</h1>
      {productOverview?.overview && (
        <div className="Overview-paragraph"
          dangerouslySetInnerHTML={{ __html: productOverview.overview }}
        ></div>
        
      )}
  {/* <ModalButton productDetails={data} formType="ContactUs" className="Overview-Btn">Contact Us</ModalButton> */}

    </div>
  );
};

export default Overview;
