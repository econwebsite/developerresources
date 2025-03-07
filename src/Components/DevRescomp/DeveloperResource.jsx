import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  TextField,
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Tabs,
  CircularProgress,
  Tab,
} from "@mui/material";
import { MessageSquare, Mail, ClipboardList , Wrench } from "lucide-react"; 
// import ModalButton from "../../ModelForm/ModalButton";
import {FileExclamationOutlined} from "@ant-design/icons";
import Productpage from "../../Components/ProductComp/Productpage";
import SalesOrderTable from "../../Components/SalesOrderComp/SalesOrderTable";
import "./DeveloperResource.css";


const DeveloperResource = () => {

    const [open, setOpen] = useState(false);
    const [activeTab, setActiveTab] = useState(0);
    const [salesOrderNumber, setSalesOrderNumber] = useState("");
    const [productData, setProductData] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [reload, setReload] = useState(false);
    const [authToken, setAuthToken] = useState("");
  
    // Fetch Auth Token
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
  
    useEffect(() => {
      fetchAuthToken();
    }, []);
  
    useEffect(() => {
      if (!authToken) return;
  
      const getProducts = async () => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_API_URL}/product/getproducts`, {
            headers: { Authorization: `Bearer ${authToken}` },
            withCredentials: true,
          });
  
          if (response.data.success) {
            setProductData(response.data);
            setError("");
          } else {
            setError("");
          }
        } catch (error) {
          setError("Failed to fetch products.");
        }
      };
  
      getProducts();
    }, [reload, authToken]);
  
    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleTabChange = (event, newValue) => setActiveTab(newValue);
    const handleSalesOrderChange = (e) => setSalesOrderNumber(e.target.value);
  
    const handleAddProduct = async () => {
      if (salesOrderNumber.trim().length !== 17) {
        setError("Please enter a valid 17-digit SO number.");
        return;
      }
  
      setLoading(true);
      setError("");
      setSuccessMessage("");
  
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/product/addproduct/${salesOrderNumber}`, {
          headers: { Authorization: `Bearer ${authToken}` },
          withCredentials: true,
        });
  
        if (response.data.success) {
          const productInfo = response.data.data;
          setSuccessMessage(
            productInfo.map((product) => {
              if (product.ProductStatus === "SUCCESS") {
                return `${product.Title} added successfully.`;
              } else if (product.ProductStatus === "EXIST") {
                return `${product.Title} already exists.`;
              } else if (product.ProductStatus === "INVALID") {
                return `${product.Title} is invalid.`;
              } else {
                return `Unexpected status for ${product.Title}.`;
              }
            }).join("\n")
          );
  
          setReload((prev) => !prev);
          setSalesOrderNumber("");
        } else {
          setError("No products found.");
        }
      } catch (error) {
        setError("An error occurred while adding the product.");
      } finally {
        setLoading(false);
      }
    };


    return (
        <Box className="developer-resources">
        <div  className="mainContainer">
        <div className="banner-container">
    <Box className="two-column-layout">
      <Typography variant="h6" style={{ color: "#003873", textAlign: "center", padding: "5px" }}>
        Add your so Number
      </Typography>
      <TextField
        label="Enter your sales order Number"
        variant="outlined"
        fullWidth
        value={salesOrderNumber}
        onChange={handleSalesOrderChange}
        error={!!error}
        helperText={error}
      />
      <div style={{ display: "flex"}}>
        <button className="Addsobutton" onClick={handleAddProduct}>
          + Add So Number
        </button>
      </div>
      <div className="dev-notetot">
        <div className="dev-note">
          <div className="dev-innernote">
            Note: Please enter the correct 17-digit SO number (e.g., 386000XXXXXXXXX) to download the software packages and product documents.
          </div>
        </div>
      </div>
      <div>
        <Button variant="text" style={{ color: "#344ea1", fontSize: "0.9em",textTransform:"lowercase" }} onClick={handleClickOpen}>
          Where to find SO Number?
        </Button>
      </div>
    </Box>
  </div>
  
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>
            Please follow the steps below to locate the SO number
            <IconButton aria-label="close" onClick={handleClose} className="dialog-icon-button" />
          </DialogTitle>
          <DialogContent dividers>
            <Typography>1. Check the "Thank You" card placed in the delivery box.</Typography>
            <Typography>2. The email used for the purchase should have received an automatic email from us containing the SO number.</Typography>
            <Typography>3. You may also check with your purchasing department.</Typography>
            <Typography>
              If you're still unable to find it, please contact our technical support team at{" "}
              <strong>
                <a href="mailto:techsupport@e-consystems.com" style={{ textDecoration: "none", color: "black" }}>
                  techsupport@e-consystems.com
                </a>
              </strong>.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">Close</Button>
          </DialogActions>
        </Dialog>
        <br></br>
        {!productData && (
    <Box  className="dev-resourec-user">
      <p><FileExclamationOutlined  className="file-icon" />
         Please enter your SO number to download documents
      </p>
    </Box>
  )}
    {loading && (
          <Box display="flex" alignItems="center" mt={2}>
            <CircularProgress size={20} />
            <Typography variant="body2" ml={1}>Loading...</Typography>
          </Box>
        )}
  
        {successMessage && (
          <Typography style={{ color: "green", marginTop: "10px", whiteSpace: "pre-line" }}>
            {successMessage}
          </Typography>
        )}
  
        {productData ? (
          <div className="Developerreso-sec"> 
          <Box className="tabs-section">
            <Tabs value={activeTab} onChange={handleTabChange} aria-label="Tabs for Product, My Account, Sales Order" centered>
              <Tab label="Product" />
              <Tab label="Sales Order" />
            </Tabs>
            <Box className="tab-content">
              {activeTab === 0 && <Productpage productData={productData} />}
              {activeTab === 1 && <SalesOrderTable />}
            </Box>
          </Box>
          </div>
          
        ) : (
          error && <Typography color="error">No products found. Please check your SO number.</Typography>
        )}
        </div>
        <div className="Developerreso-sec"> 
          <Box className="tabs-section1">
      <div className="devtabsupport-container">
        <a href="javascript:void($zopim.livechat.say('hi'))">
        <div className="devtabsupport-card">
          <MessageSquare size={40} className="devtabsupport-icon devtabsupport-chat-icon" />
          <h2 className="devtabsupport-title">Chat Support</h2>
          <p className="devtabsupport-description">Monday - Friday<br />5:30 AM UTC - 8:30 PM UTC</p>
          <a href="javascript:void($zopim.livechat.say('hi'))">
  
          <button className="devtabsupport-button devtabsupport-chat-button">
            Contact Support
          </button>
          </a>
        </div>
        </a>
        <a href="mailto:techsupport@e-consystems.com">
        <div className="devtabsupport-card">
          <Mail size={40} className="devtabsupport-icon devtabsupport-mail-icon" />
          <h2 className="devtabsupport-title">Mail Support</h2>
          <p className="devtabsupport-description">Reach out to our support team via email.</p>
          <a href="mailto:techsupport@e-consystems.com">
  
          <button  className="devtabsupport-button devtabsupport-mail-button">
            Contact Support
          </button>
          </a>
        </div>
        </a>
        <a href="https://supporttickets.e-consystems.com/portal/en/signin">
        <div className="devtabsupport-card">
          <ClipboardList  size={40} className="devtabsupport-icon devtabsupport-ticket-icon" />
          <h2 className="devtabsupport-title">Support Tickets</h2>
          <p className="devtabsupport-description">Submit a ticket for quick assistance.</p>
          <a href="https://supporttickets.e-consystems.com/portal/en/signin">
          <button className="devtabsupport-button devtabsupport-ticket-button">
            Contact Support
          </button>
          </a>
        </div></a>
         <a href="https://ordersupport.e-consystems.com/portal/en/signin">
        <div className="devtabsupport-card">
          <Wrench size={40} className="devtabsupport-icon devtabsupport-tech-icon" />
          <h2 className="devtabsupport-title">Order Support</h2>
          <p className="devtabsupport-description">Get assistance with order-related issues.</p>
          <a href="https://ordersupport.e-consystems.com/portal/en/signin"> <button className="devtabsupport-button devtabsupport-tech-button">      
  
            Contact Support
          </button></a>
        </div>
        </a>
      </div>
           
          </Box>
          </div>
      </Box>
    );
}

export default DeveloperResource;
