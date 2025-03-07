import React from "react";
import { useState, useEffect } from "react";
import { Form, Input, Button, Modal } from "antd";
import axios from "axios";
import "./model.css";

const { TextArea } = Input;





const ContactUsForm = ({ visible, onClose, productDetails }) => {
  const [form] = Form.useForm();
  const [authToken, setAuthToken] = useState("");

  useEffect(() => {
    const fetchAuthToken = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/token`, {
          withCredentials: true,
        });
        if (response.data.success) {
          setAuthToken(response.data.token);
        }
      } catch (error) {
        console.error("Failed to retrieve token:", error);
      }
    };
    fetchAuthToken();
  }, []);

  const handleFinish = async (values) => {
    const formattedValues = {
      token: authToken,
      productId: productDetails?.productDetail?.id || "N/A",
      productTitle: productDetails?.productDetail?.title || "N/A",
      productName: productDetails?.productDetail?.name || "N/A",
      queries: values.queries,
      formType: "contactUs",
    };

    Modal.success({
      title: "Thank You!",
      content: "Your response has been submitted successfully. Our sales executive will contact you soon.",
      onOk: async () => {
        onClose();
        form.resetFields();
        try {
          await axios.post(`${import.meta.env.VITE_API_URL}/get/contact`, formattedValues, {
            headers: { Authorization: `Bearer ${authToken}` },
            withCredentials: true,
          });
        } catch (err) {
          console.error("Error submitting quote:", err);
        }
      },
    });
  };

  return (
    <Modal
      className="ContactForm-modal"
      title={<h2 className="ContactForm-title">Contact Us - <span>{productDetails?.productDetail?.name || ""}</span></h2>}
      open={visible}
      onCancel={onClose}
      footer={null}
      width={500}
    > <br></br>
      <Form form={form} name="quoteForm" onFinish={handleFinish} layout="vertical" className="ContactForm-container">
        <Form.Item label="Your Queries" name="queries" rules={[{ required: true, message: "Please enter your queries!" }]}> 
          <TextArea style={{color:"#003873"}} placeholder="Describe your queries here..." rows={4} className="ContactForm-input" />
        </Form.Item>

        <Form.Item style={{ textAlign: "center", marginTop: "15px" }}>
          <Button type="primary" htmlType="submit" className="ContactForm-button">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default ContactUsForm;