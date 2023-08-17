"use client";
import React from "react";
import { useSelector } from "react-redux";
import { colorsAll } from "../app/layout";
import { RootState } from "utils/store";

export interface ImagesDisplayProps {
  links: string[];
}

export default function ImagesDisplay({ links }: ImagesDisplayProps) {
  const light = useSelector((state: RootState) => state.light.lightState);
  const colors = light ? colorsAll[0] : colorsAll[1];

  const [imageSrc, setImageSrc] = React.useState<string[]>(links);

  return (
    <div className={`h-fit w-fit ${colors.bodyPage}`}>
      <div className={`flex flex-col items-center space-y-10`}>
        <div>
          <img
            className={` mainImgSize rounded-2xl`}
            key={0}
            src={`${imageSrc[0]}`}
            alt="food"
          />
        </div>
        <div className={`flex justify-between space-x-4`}>
          {imageSrc.slice(1).map((src, index) => (
            <div
              className={`cursor-pointer transition-transform transform hover:scale-125 hover:z-10`}
            >
              <img
                className={` otherImgSize rounded-2xl`}
                key={index + 1}
                src={src}
                height={190}
                width={190}
                alt="food"
                onClick={() => {
                  setImageSrc((a) => {
                    const updated = [...a];
                    const temp = updated[0];
                    updated[0] = src;
                    updated[index + 1] = temp;
                    return updated;
                  });
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
