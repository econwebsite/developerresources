import React from "react";
import { useState } from "react";
import GetQuoteForm from "./GetQuoteForm";
import ContactUsForm from "./ContactUsForm"; 

const ModalButton = ({ className, productDetails, formType, children }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => setIsModalVisible(true);
  const handleCancel = () => setIsModalVisible(false);

  const isGetQuote = formType === "getQuote";
  const FormComponent = isGetQuote ? GetQuoteForm : ContactUsForm;

  return (
    <div>
      <div className={className} onClick={showModal} style={{ cursor: "pointer" }}>
        {children}
      </div>
      {isModalVisible && (
        <FormComponent
          visible={isModalVisible}
          onClose={handleCancel}
          productDetails={productDetails}
        />
      )}
    </div>
  );
};

export default ModalButton;
