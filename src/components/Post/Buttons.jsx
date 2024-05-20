import React from "react";
import { CiShare2 } from "react-icons/ci";
import { FaHeart, FaRegHeart, FaRetweet } from "react-icons/fa";
import { LuMessageCircle } from "react-icons/lu";

const Buttons = ({ likeCount, toggleLike, isLiked }) => {
  return (
    <div className="flex justify-between items-center">
      <div className="p-2 rounded-full hover:bg-gray-900 cursor-pointer transition-colors ">
        <LuMessageCircle />
      </div>

      <div className="p-2 rounded-full hover:bg-gray-900 cursor-pointer transition-colors ">
        <FaRetweet />
      </div>

      <div
        onClick={toggleLike}
        className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-900 cursor-pointer transition-colors "
      >
        {isLiked ? <FaHeart className="text-red-600" /> : <FaRegHeart />}

        {likeCount}
      </div>

      <div className="p-2 rounded-full hover:bg-gray-900 cursor-pointer transition-colors ">
        <CiShare2 />
      </div>
    </div>
  );
};

export default Buttons;
