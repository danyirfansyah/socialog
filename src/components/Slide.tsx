import React from "react";
import Image from "next/image";

interface Props {
    img: string;
}

const Slide: React.FC<Props> = ({ img }) => {
  return ( 
    <div className="outline-none border-none relative">
      <div className="flex justify-center">
        <div className="w-full max-w-3xl">
          <Image
            src={img}
            alt={"banner"}
            layout="responsive"
            width={1000}
            height={500} 
            objectFit="cover" 
            className="rounded-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Slide;
