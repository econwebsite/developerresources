import React from "react";
import { YoutubeOutlined } from "@ant-design/icons";
import "./Releatedvideo.css";

const VideoSection = ({ data }) => {
  const videos = data?.Video || [];

  const getYoutubeThumbnail = (url) => {
    const videoId = url.split("v=")[1]?.split("&")[0];
    return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`; 
  };

  return (
    <div className="Releated-videos-section">
      {/* <h2 className="Releated-videos-title">Videos</h2> */}
      <div className="Releated-videos-container">
        {videos.map((video, index) => (
          <div key={index} className="Releated-videos-card">
            <a href={video.VideoLink} target="_blank" rel="noopener noreferrer" className="Releated-videos-link">
              <div className="Releated-videos-thumbnail-container">
                <img
                  src={getYoutubeThumbnail(video.VideoLink)}
                  alt={video.VideoTitle}
                  className="Releated-videos-thumbnail"
                />
<YoutubeOutlined 
  style={{ 
    fontSize: "24px", 
    backgroundColor: "#ff0000",  
    color: "#fff",  
    padding: "4px",  
    borderRadius: "4px",  
   }} 
  className="Releated-videos-icon" 
/>
              </div>
            </a>
            <h3 className="Releated-videos-video-title">{video.VideoTitle}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoSection;
