import React from "react";
export default function Advertisment() {
  return (
    <div className="ads-restaurant-frame">
      <video
        className={"ads-video"}
        autoPlay={true}
        loop
        muted
        playsInline
        data-video-media=""
      >
        <source type="video/mp4" src="video/szims.mp4" />
      </video>
    </div>
  );
}
