import React from "react";
import FoodList from "@/components/foodList";

type PageProps = {
  params: {
    getImages: string;
  };
};

const search = async (getImages: string) => {
  const key = process.env.SERPAPI_API_KEY;

  const res = await fetch(
    `https://serpapi.com/search.json?engine=google_images&q=${getImages}&safe=active&api_key=${key}`
  );
  const data = await res.json();
  const imageResults = data["images_results"]
    .filter((obj: { original_width: number }) => obj.original_width > 650)
    .map((obj: { original: any }) => obj.original)
    .slice(0, 5);

  return imageResults;
};

async function getImages({ params: { getImages } }: PageProps) {
  let searchImages: string[] = [];
  if (getImages !== "undefined") {
    searchImages = await search(getImages);
  }

  return (
    <div className={` `}>
      <FoodList links={searchImages} />
    </div>
  );
}

export default getImages;
