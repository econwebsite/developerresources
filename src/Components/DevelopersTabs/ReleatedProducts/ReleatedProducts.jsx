import React from "react";
import { Link } from "react-router-dom";
import "./ReleatedProducts.css"; 

const RelatedProduct = () => {
  const products = [
    {
      id: 1,
      imgUrl: "eCAM50CUONX/MicrosoftTeams-image%20(18).png",
      title: "Tara",
      description: "USB 3.0 Stereo Vision Camera",
    },
    {
      id: 2,
      imgUrl: "eCAM50CUONX/MicrosoftTeams-image%20(18).png",
      title: "See3CAM_CU130",
      description: "13MP Ultra HD USB 3.0 Camera with superior low light and NIR performance.",
    },
    {
      id: 3,
      imgUrl: "See3CAMCU83/See3CAMCU83.png",
      title: "See3CAM_81",
      description: "8MP Autofocus USB 3.0 Camera with enhanced image quality and speed.",
    },
  ];

  return (
    <div className="related-product-container">
      <div className="related-product-grid">
        {products.map((product) => {
          const imageUrl = `https://developer.e-consystems.com/assets/images/${product.imgUrl}`;

          return (
            <div key={product.id} className="related-product-card">
              <div className="related-product-image">
                <img src={imageUrl} alt={product.title} />
              </div>
              <div className="related-product-content">
                <h3>{product.title}</h3>
                <p>{product.description}</p>
                <Link to={`/product/${product.id}`} className="related-product-button">
                  Know More
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RelatedProduct;
