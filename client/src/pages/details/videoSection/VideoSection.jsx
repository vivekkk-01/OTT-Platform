import React, { useState } from "react";

import "./videoSection.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import VideoPopup from "../../../components/videoPopup/VideoPopup";
import Img from "../../../components/lazyLoadImage/Img";
import { PlayIcon } from "../PlayBtn";

const VideoSection = ({ data, loading }) => {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);

  const loadingSkeleton = () => {
    return (
      <div className="skItem">
        <div className="thumb skeleton"></div>
        <div className="row skeleton"></div>
        <div className="row2 skeleton"></div>
      </div>
    );
  };

  return (
    <div className="videosSection">
      <ContentWrapper>
        <div className="sectionHeading">Official Videos</div>
        {!loading ? (
          <div className="videos">
            {data?.results &&
              data?.results?.map((item) => {
                return (
                  <div
                    className="videoItem"
                    onClick={() => {
                      setShow(true);
                      setVideoId(item.key);
                    }}
                    key={item.id}
                  >
                    <div className="videoThumbnail">
                      <Img
                        src={`https://img.youtube.com/vi/${item.key}/mqdefault.jpg`}
                      />
                      <PlayIcon />
                    </div>
                    <div className="videoTitle">{item.title || item.name}</div>
                  </div>
                );
              })}
          </div>
        ) : (
          <div className="videoSkeleton">
            {loadingSkeleton()}
            {loadingSkeleton()}
            {loadingSkeleton()}
            {loadingSkeleton()}
          </div>
        )}
      </ContentWrapper>
      <VideoPopup
        show={show}
        setShow={setShow}
        videoId={videoId}
        setVideoId={setVideoId}
      />
    </div>
  );
};

export default VideoSection;
