import React from "react";
import { useState } from "react";
import { Pagination, Input } from "antd";
import "antd/dist/reset.css";
import "./Productpage.css";
import TotaldevTabs from "../../Components/DevelopersTabs/TotaldevTabs";
import { SearchOutlined } from "@ant-design/icons";

const Productpage = ({ productData }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  const formatDateTime = (dateTime) => {
    if (!dateTime) return "NA";
    const [date, time] = dateTime.split("T");
    const [hours, minutes, seconds] = time.split(":");
    
    let hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12;
    const [year, month, day] = date.split("-");
    return `${month}/${day}/${year}, ${hour}:${minutes}:${seconds.split(".")[0]} ${ampm}`;
  };

  const cardData = (productData?.userProducts || [])
    .map(userProduct => {
      return {
        title: userProduct.title || "NA",
        id: userProduct.id,
        createdDateTime: userProduct.createdDateTime
          ? formatDateTime(userProduct.createdDateTime)
          : "NA",
        saleOrderNumber: userProduct.saleOrderNumber || "N/A", 
        imageUrl: userProduct.imageUrl
          ? `https://developer.e-consystems.com/assets/images/${userProduct.name}/${userProduct.imageUrl}`
          : "test.jpg",
      };
    })
    .filter(card => 
      card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.saleOrderNumber.toLowerCase().includes(searchQuery.toLowerCase())
    ); 
  
  const pageSize = 9; 
  const startIndex = (currentPage - 1) * pageSize;
  const visibleCards = cardData.slice(startIndex, startIndex + pageSize);

  React.useEffect(() => {
    setNoResults(searchQuery.length > 0 && cardData.length === 0);
  }, [searchQuery, cardData]);

  return (
    <div className="ProductCardComp">
      {selectedProduct ? (
        <TotaldevTabs productId={selectedProduct} onClose={() => setSelectedProduct(null)} />
      ) : (
        <>
          <div className="ProductCardComp-searchContainer">
            <input
              type="text"
              placeholder="Search by product name or SO Number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="ProductCardComp-searchBar"
            />
            <button className="ProductCardComp-searchButton">
              <SearchOutlined size={18} />
            </button>
          </div>
          
          {noResults && <div className="ProductCardComp-noResults">No results found</div>}

          <div className="ProductCardComp-cardContainer">
            {visibleCards.map((card, index) => (
              <div
                key={index}
                className="ProductCardComp-card"
                onClick={() => setSelectedProduct(card.id)}
              >
                <div className="ProductCardComp-imageWrapper">
                  <div
                    className="ProductCardComp-image"
                    style={{ backgroundImage: `url(${card.imageUrl})` }}
                  />
                </div>

                <div className="ProductCardComp-cardInfo">
                  <h3 className="ProductCardComp-title">{card.title}</h3>

                  <div className="ProductCardComp-metaSection">
                    <div className="ProductCardComp-metaGroup">
                      <span className="ProductCardComp-metaLabel">Added Date:</span>
                      <span className="ProductCardComp-metaValue">{card.createdDateTime}</span>
                    </div>
                    <div className="ProductCardComp-metaGroup">
                      <span className="ProductCardComp-metaLabel">SO Number:</span>
                      <span className="ProductCardComp-metaValue ProductCardComp-soNumber">
                        {card.saleOrderNumber}
                      </span>
                    </div>
                  </div>

                  <div className="ProductCardComp-actionBar">
                    <button className="ProductCardComp-actionText">Download document</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {cardData.length > pageSize && !selectedProduct && (
            <div className="ProductCardComp-paginationContainer">
              <Pagination
                current={currentPage}
                onChange={setCurrentPage}
                total={cardData.length}
                pageSize={pageSize}
                showSizeChanger={false}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Productpage;
