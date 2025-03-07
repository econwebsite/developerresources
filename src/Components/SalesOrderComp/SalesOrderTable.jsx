import React from "react";
import { useState, useEffect } from "react";
import { Table, Input, Button } from "antd";
import axios from "axios";
import { SearchOutlined } from "@ant-design/icons";
import "./SalesOrderTable.css";

const { Column } = Table;

const SalesOrderTable = () => {
  const [soData, setSoData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [authToken, setAuthToken] = useState("");
  useEffect(() => {
    fetchAuthToken();
  }, []);

  useEffect(() => {
    if (authToken) {
      fetchSalesOrders();
    }
  }, [authToken]);

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

  const fetchSalesOrders = async (searchString = "") => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/product/getsalesorders/` + searchString,
        {
          headers: { Authorization: `Bearer ${authToken}` },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        setSoData(response.data.data || []);
      } else {
        console.warn("API Error:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching sales orders:", error.message);
    }
  };

  const handleSearch = () => {
    fetchSalesOrders(searchText.trim());
  };


  const groupedData = [];
  const rowSpanMap = {};
  let rowColorMap = {};
  let currentColor = false; 

  soData.forEach((product) => {
    const key = `${product.SoNumber}-${product.SalesOrderId}`;

    if (!rowSpanMap[key]) {
      rowSpanMap[key] = { count: 1, firstIndex: groupedData.length };
      currentColor = !currentColor; 
      rowColorMap[key] = currentColor;
    } else {
      rowSpanMap[key].count += 1;
    }

    groupedData.push({
      key: `${product.SoNumber}-${product.SalesOrderId}-${product.ProductTitle}`,
      soNumber: product.SoNumber,
      orderNumber: product.SalesOrderId,
      product: product.ProductTitle,
      quantity: product.Quantity,
      rowSpan: rowSpanMap[key].count,
      bgColor: rowColorMap[key] ? "grouped-row-light" : "grouped-row-dark", 
    });
  });

  groupedData.forEach((row, index) => {
    const key = `${row.soNumber}-${row.orderNumber}`;
    if (rowSpanMap[key].firstIndex === index) {
      row.rowSpanValue = rowSpanMap[key].count;
    } else {
      row.rowSpanValue = 0;
    }
  });

  return (
    <div className="sales-order-table-wrapper">
      <div className="search-bar">
      <Input
  placeholder="Search by SO Number or Products"
  value={searchText}
  onChange={(e) => setSearchText(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  }}
  className="search-input"
/>

        <Button
          icon={<SearchOutlined />}
          onClick={handleSearch}
          className="search-button"
        />
      </div>

      <div className="table-container">
        <Table
          dataSource={groupedData}
          className="sales-order-table"
          pagination={false}
          bordered
          rowClassName={(record) => record.bgColor} 
          scroll={{ x: "max-content" }}
        >
          <Column
            title="SO Number"
            dataIndex="soNumber"
            key="soNumber"
            className="so-number-column"
            render={(value, row) => ({
              children: value,
              props: {
                rowSpan: row.rowSpanValue,
                style: { textAlign: "center", verticalAlign: "middle" },
              },
            })}
          />

          <Column
            title="Order Number"
            dataIndex="orderNumber"
            key="orderNumber"
            className="order-number-column"
            render={(value, row) => ({
              children: value,
              props: {
                rowSpan: row.rowSpanValue,
                style: { textAlign: "center", verticalAlign: "middle" },
              },
            })}
          />

          <Column
            title="Products"
            dataIndex="product"
            key="product"
            className="products-column"
          />
          <Column
            title="Quantity"
            dataIndex="quantity"
            key="quantity"
            className="quantity-column"
          />
        </Table>
      </div>
    </div>
  );
};

export default SalesOrderTable;
