import React from "react";
import { useSelector } from "react-redux";

function TopicHeroSection() {
  const topicList = useSelector((state) => state.topic.topics.data);

  return (
    <div className="relative w-full h-full p-2">
      <div className="h-full overflow-y-auto overflow-hidden scrollbar-hide z-10 select-none py-25">
        {topicList.map((ele) => (
          <div
            className={
              "max-w-2xl w-full h-fit pb-24 text-9xl text-center text-color-text-light font-bold opacity-25 hover:opacity-100 hover:text-color-btn"
            }
          >
            {ele.name}
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-color-bg to-transparent z-20"></div>
      <div className="pointer-events-none absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-color-bg to-transparent z-20"></div>
    </div>
  );
}

export default TopicHeroSection;
