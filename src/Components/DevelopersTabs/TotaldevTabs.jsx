import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Tabs, Button } from "antd";
import { FileTextOutlined, FileDoneOutlined, FileZipOutlined, AppstoreOutlined, ReadOutlined,VideoCameraOutlined } from "@ant-design/icons";
import { RiArrowGoBackLine } from "react-icons/ri";
import LocalGroceryStoreRoundedIcon from "@mui/icons-material/LocalGroceryStoreRounded";
import Documentation from "./Documentationcomp/Documentation";
import Overview from "./Overviewcomp/Overview";
import Newfile from "./Filescomp/Newfile";
import RelatedProduct from "./ReleatedProducts/ReleatedProducts";
import BlogComp from "./Blogcomp/Blogcomp";
import Releatedvideo from "./Videocomp/Releatedvideo"
import "./totaldevtabs.css";

const { TabPane } = Tabs;

const TotaldevTabs = ({ productId, onClose }) => {
  const [productDetails, setProductDetails] = useState(null);
  const [relatedResources, setRelatedResources] = useState(null);
  const [activeTab, setActiveTab] = useState("");
  const [authToken, setAuthToken] = useState("");

  useEffect(() => {
    fetchAuthToken();
  }, []);

  useEffect(() => {
    if (productId && authToken) {
      fetchProductDetails();
    }
  }, [productId, authToken]);

  useEffect(() => {
    if (productDetails?.productDetail) {
      const { productDocuments, productFiles, productOverview } = productDetails.productDetail;
      setActiveTab(
        productDocuments?.length > 0 ? "Document" : 
        productFiles?.length > 0 ? "Files" : 
        productOverview ? "Overview" : 
        relatedResources?.Blog?.length > 0 ? "Blogs" :
        "Related Products"
      );
    }
  }, [productDetails, relatedResources]);

  const fetchAuthToken = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/token`, { withCredentials: true });
      if (response.data.success) {
        setAuthToken(response.data.token);
      }
    } catch (error) {
      console.error("Failed to retrieve token:", error);
    }
  };

  const fetchProductDetails = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/product/details/${productId}`, {
        headers: { Authorization: `Bearer ${authToken}` },
        withCredentials: true,
      });

      setProductDetails(response.data);
      setRelatedResources(response.data?.resources?.[0]?.RelatedResources?.[0]);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  if (!productDetails) {
    return <div>Loading...</div>;
  }

  const { productDetail } = productDetails;
  const hasOverview = productDetail?.productOverview?.overview;
  const hasDocuments = productDetail?.productDocuments?.length > 0;
  const hasFiles = productDetail?.productFiles?.length > 0;
  const hasBlogs = relatedResources?.Blog?.length > 0;
  const hasvideos = relatedResources?.Video?.length > 0;


  const tabs = [
    hasOverview && { key: "Overview", label: "Overview", icon: <AppstoreOutlined />, component: <Overview data={productDetails} /> },
    hasDocuments && { key: "Document", label: "Document", icon: <FileTextOutlined />, component: <Documentation data={productDetails} /> },
    hasFiles && { key: "Files", label: "Packages", icon: <FileZipOutlined />, component: <Newfile data={productDetails} /> },
    { key: "Related Products", label: "Related Products", icon: <FileDoneOutlined />, component: <RelatedProduct data={relatedResources} /> },
    hasBlogs && { key: "Blogs", label: "Blogs", icon: <ReadOutlined />, component: <BlogComp data={relatedResources} /> },
    hasvideos && { key: "vedios", label: "Videos", icon: <VideoCameraOutlined />, component: <Releatedvideo data={relatedResources} /> },

  ].filter(Boolean); 

  return (
    <div className="Total-product-section">
      <div className="mainContainer">
        <div className="ProductTabs-container">
          <div className="totalProductTabs-header">
            <div className="totalProductTabs-title">
              <h2>{productDetail?.title || "NA"}</h2>
            </div>
            <div>
              <a href="https://www.e-consystems.com/webstore-dst.asp" style={{ textDecoration: "none" }}>
                <Button className="totalProductTabs-buy-again-button">
                  <LocalGroceryStoreRoundedIcon className="totalProductTabs-buy-again-icon" /> Buy Again
                </Button>
              </a>
            </div>
          </div>

          <div className="ProductTabs-content">
            <div className="tabs-sidebar">
              <Tabs activeKey={activeTab} onChange={setActiveTab} tabPosition="left" size="large" className="tabs-container">
                {tabs.map(tab => (
                  <TabPane
                    tab={<span className="tab-item">{tab.icon} {tab.label}</span>}
                    key={tab.key}
                  />
                ))}
              </Tabs>
            </div>
            <div className="tab-content1">
              {tabs.find(tab => tab.key === activeTab)?.component}
            </div>
          </div>

          <Button onClick={onClose} className="back-button">
            <RiArrowGoBackLine className="back-icon" /> Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TotaldevTabs;
