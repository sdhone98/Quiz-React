import React from "react";
import { useSelector } from "react-redux";

const ANIMATION_DURATION = 200;

function TopicHeroSection() {
  const topicList = useSelector((state) => state.topic.topics.data);

  if (!topicList?.length) return null;

  const infiniteList = [...topicList, ...topicList];

  return (
    <div className="relative w-full h-full p-2 overflow-hidden">
      <div
        className="infinite-scroll select-none"
        style={{
          height: "100%",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div
          className="scroll-inner flex items-center"
          style={{
            display: "flex",
            flexDirection: "column",
            animation: `scrollY ${ANIMATION_DURATION}s linear infinite`,
          }}
        >
          {infiniteList.map((ele, idx) => (
            <div
              key={idx}
              className="flex items-center mb-24 max-w-2xl w-fit h-fit text-9xl text-center text-color-bg-2 font-bold opacity-100 hover:opacity-100 hover:text-color-btn transition-colors duration-300 ease-in-out"
            >
              {ele.name}
            </div>
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-color-bg to-transparent z-20"></div>
      <div className="pointer-events-none absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-color-bg to-transparent z-20"></div>

      <style>{`
        @keyframes scrollY {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%);
          }
        }
        .infinite-scroll {
          height: 600px; /* Adjust as needed */
        }
      `}</style>
    </div>
  );
}

export default TopicHeroSection;
