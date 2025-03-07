import React from "react";
import { useState, useEffect } from "react";
import { Form, Input, Select, Button, Modal } from "antd";
import axios from "axios";
import "./model.css";

const { TextArea } = Input;
const { Option } = Select;





const GetQuoteForm = ({ visible, onClose, productDetails }) => {
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
    console.log("Product Details:", productDetails);

    const formattedValues = {
      token: authToken,
      productId: productDetails?.productDetail?.id || "N/A",
      productTitle: productDetails?.productDetail?.title || "N/A",
      productName: productDetails?.productDetail?.name || "N/A",
      quantity: values.quantities,
      queries: values.queries,
      formType: "getQuote",
    };

    console.log("Formatted Values:", formattedValues);

    Modal.success({
      title: "Thank You!",
      content:
        "Your response has been submitted successfully. Our sales executive will contact you soon.",
      onOk: async () => {
        onClose();
        form.resetFields();

        try {
          const response = await axios.post(`${import.meta.env.VITE_API_URL}/get/contact`, formattedValues, {
            headers: { Authorization: `Bearer ${authToken}` },
            withCredentials: true,
          });

          console.log("Form submitted successfully!", response.data);
        } catch (err) {
          console.error("Error submitting quote:", err);
        }
      },
    });
  };

  return (
    <Modal
      title={<h2 className="Getquote-form-title">Get a Quote - <span>{productDetails?.productDetail?.name || ""}</span></h2>}
      open={visible}
      onCancel={onClose}
      footer={null}
      width={500}
      className="Getquote-form-modal"
    >
      <Form form={form} name="quoteForm" onFinish={handleFinish} layout="vertical" className="Getquote-form">
        <Form.Item
          name="quantities"
          rules={[{ required: true, message: "Please select quantities" }]}
          className="Getquote-form-item"
        >
          <Select placeholder="Select Quantities" className="Getquote-form-select">
            <Option value="100-200">100-200</Option>
            <Option value="200-500">200-500</Option>
            <Option value="500-1000">500-1000</Option>
            <Option value="1000+">1000+</Option>
          </Select>
        </Form.Item>

        <Form.Item name="queries" className="Getquote-form-item">
          <TextArea placeholder="Describe Your Queries" rows={3} className="Getquote-form-textarea" />
        </Form.Item>

        <Form.Item style={{ textAlign: "center" }} className="Getquote-form-item">
          <Button type="primary" htmlType="submit" className="Getquote-form-submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default GetQuoteForm;
