import React from "react";
import mainImag from "../assets/mainBanner.png";

const Quality = () => {
  return (
    <div className="w-full overflow-hidden px-6">
      <div className="mx-auto w-full">
        <img
          src={mainImag}
          alt=""
          className="block w-full h-auto object-contain"
        />
      </div>
    </div>
  );
};

export default Quality;