import React from "react";
import "./Documentation.css";
import { FileTextOutlined } from '@ant-design/icons';
import PictureAsPdfRoundedIcon from '@mui/icons-material/PictureAsPdfRounded';
import FolderZipIcon from '@mui/icons-material/FolderZip';


const Documentation = ({ data }) => {
  //console.log(data.productDetail);

  const downloadFile = async (downloadToken, fileName) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/product/download`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ downloadToken }),
      });
     
      const data = await response.json();
      if (data.downloadUrl) {
        const link = document.createElement("a");
        link.href = data.downloadUrl;
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        alert(`Failed to get download URL for ${fileName}`);
      }

    } catch (error) {
      console.error("Error:", error);
    }
  };

  const { productDocuments } = data.productDetail;

  const getFileIcon = (filePath) => {
    if (!filePath) return null;

    const extension = filePath.split(".").pop().toLowerCase();

    switch (extension) {
      case 'pdf':
        return <PictureAsPdfRoundedIcon style={{ color: 'red', fontSize: "21px" }} />;
      case 'zip':
      case 'rar':
        return <FolderZipIcon style={{ color: '#f0d872', fontSize: "21px" }} />;
      case 'txt':
        return <FileTextOutlined style={{ color: 'black', fontSize: "20px" }} />;
      default:
        return <FolderZipIcon style={{ color: '#f0d872', fontSize: "21px" }} />;
    }
  };

  return (
    <div className="Documentation-container">
      {productDocuments.map((section) => (
        <div key={section.sectionId} className="Documentation-section">
          <h3 className="Documentation-heading">{section.sectionTitle}</h3>
          <ol className="Documentation-list">
            {section.items.map((item) => (
              <li key={item.itemId}>
                <button onClick={() => downloadFile(item.downloadToken, item.itemFilePath)} className="Documentation-subsection">
                  {getFileIcon(item.itemFilePath)} {item.itemTitle}
                </button>
              </li>
            ))}
          </ol>
        </div>
      ))}
    </div>
  );
}

export default Documentation;
