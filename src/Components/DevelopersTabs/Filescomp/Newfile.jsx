import React from "react";
import './Files.css';

import { 
  FileTextOutlined, 
  FileOutlined, 
} from '@ant-design/icons';
import PictureAsPdfRoundedIcon from '@mui/icons-material/PictureAsPdfRounded';
import FolderZipIcon from '@mui/icons-material/FolderZip';




const Newfile = ({data}) => {
  console.log(data.productDetail);

  const getFileIcon = (fileName) => {
    if (!fileName) return <FileOutlined style={{ color: '#807c6c' }} />;
    const extension = fileName.split('.').pop().toLowerCase();

    switch (extension) {
      case 'pdf':
        return <PictureAsPdfRoundedIcon style={{ color: 'red',fontSize:"21px" }} />;
      case 'zip':
      case 'rar':
        return <FolderZipIcon style={{ color: '#f0d872',fontSize:"21px" }} />;
      case 'txt':
        return <FileTextOutlined style={{ color: '#807c6c',fontSize:"20px" }} />;
      default:
        return <FolderZipIcon style={{ color: '#f0d872' ,fontSize:"21px"}} />;
    }
  };

  const downloadFile = async (downloadToken, fileName) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/product/download`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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


  const productFiles = data?.productDetail?.productFiles || [];

  return (
    <div className="File-comp-container">
      {productFiles.length === 0 ? (
        <div className="File-comp-no-data">No files available for this product.</div>
      ) : (
        productFiles.map((section) => (
          <div key={section.sectionId} className="File-comp-section">
            <h3 className="File-comp-heading">{section.sectionTitle}</h3>
            <ol className="File-comp-list">
              {section.items.map((item) => (
                <li key={item.itemId}>
                  <button
                    onClick={() => downloadFile(item.downloadToken, item.itemFilePath)}
                    className="File-comp-subsection"
                  >
                    {getFileIcon(item.itemFilePath)} {item.itemTitle}
                  </button>
                </li>
              ))}
            </ol>
          </div>
        ))
      )}
    </div>
  );
}

export default Newfile;
