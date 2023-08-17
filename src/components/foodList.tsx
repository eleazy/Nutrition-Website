"use client";
import React, { useState, useEffect, useRef } from "react";
import data from "../app/registros_alimento.json";
import { ChakraProvider } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { colorsAll } from "../app/layout";
import { RootState } from "utils/store";
import { myTheme } from "utils/chakraUITheme";
import FoodInfo from "@/components/foodInfo";
import { scrollPageToTop, scrollToSearch } from "utils/scrollAnimation";
import ImagesDisplay, { ImagesDisplayProps } from "@/components/imagesDisplay";
import { useRouter } from "next/navigation";
import { plainInputValue } from "./search_food";
import { showInfo } from "utils/showFoodInfoSlice";
import { setFoodId } from "utils/foodIdSlice";
import { usePathname } from "next/navigation";

/* eslint-disable react-hooks/exhaustive-deps */

const allDataJson = data.map((item) => ({
  id: item.id || 0,
  Alimento: item.Alimento || "",
  Calorias: item.Energia || 0,
  Proteínas: item.Proteínas || 0,
  Carboidratos: item.Carboidratos || 0,
  Gorduras: item.Gorduras || 0,
  "Gorduras Saturadas": item["Gorduras Saturadas"] || 0,
  "Gorduras Monoinsaturadas": item["Gorduras Monoinsaturadas"] || 0,
  "Gorduras Poliinsaturadas": item["Gorduras Poliinsaturadas"] || 0,
  "Fibras Alimentares": item["Fibras Alimentares"] || 0,
  Sódio: item["Sódio"] || 0,
  Açucares: 0,
  Colesterol: 0,
  Cinzas: item.Cinzas || 0,
  Cálcio: item.Cálcio || 0,
  Magnésio: item.Magnésio || 0,
  Manganês: item.Manganês || 0,
  Fósforo: item.Fósforo || 0,
  Ferro: item.Ferro || 0,
  Potássio: item.Potássio || 0,
  Cobre: item.Cobre || 0,
  Zinco: item.Zinco || 0,
  Tiamina: item.Tiamina || 0,
  Piridoxina: item.Piridoxina || 0,
}));
const allDataJson_arr = Object.values(allDataJson);

export default function FoodList({ links }: ImagesDisplayProps) {
  const foodId = useSelector((id: RootState) => id.foodId.foodId);

  const showFoodInfo = useSelector(
    (state: RootState) => state.showFoodInfo.foodInfoState
  );

  const dispatch = useDispatch();

  const router = useRouter();

  const searchRef = useRef<HTMLInputElement | null>(null);

  const handleShowFoodInfo = (foodId: number, foodTitle: string) => {
    dispatch(setFoodId(foodId));
    dispatch(showInfo(true));
    scrollPageToTop();
    router.push(`/food_info/${foodTitle}`);
  };

  const light = useSelector((state: RootState) => state.light.lightState);
  const colors = light ? colorsAll[0] : colorsAll[1];
  const [inputValue, setInputValue] = useState("");

  const allowedPaths = allDataJson_arr
    .map((a) => a.Alimento)
    .concat("undefined");

  const pathname = usePathname();
  useEffect(() => {
    const validPath = allowedPaths.includes(
      decodeURIComponent(pathname.slice(11))
    );

    if (!validPath) router.push("/404");
  }, []);

  return (
    <div
      className={`flex flex-col ${colors.bodyPage} ${colors.text} text-xs 2xl:text-sm w-full mt-9 px-4 min-h-screen py-0 `}
    >
      <div
        className={`flex flex-col ${
          showFoodInfo ? "h-full lg:h-screen mt-0 2xl:mt-10" : "mt-10"
        }  w-full space-y-12 2xl:space-y-20 `}
      >
        <div
          className={`${
            showFoodInfo ? "flex" : "hidden"
          } items-center justify-center pt-12 lg:pt-4 2xl:pt-6`}
        >
          <div
            className={`flex justify-between items-center my-0 2xl:my-2 w-10/12 lg:w-4/12 h-fit ${colors.body} ${colors.text} ${colors.weight} rounded-full px-4 text-center `}
          >
            <input
              type="text"
              placeholder="Pesquisar"
              value={inputValue}
              onClick={() => {
                searchRef.current!.focus();
                scrollToSearch(searchRef);
              }}
              className="bg-transparent py-2 w-full outline-none"
            ></input>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className=" w-5 2xl:w-6 animate-pulse "
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </div>
        </div>
        <div
          className={`${
            !showFoodInfo && "hidden"
          } flex flex-col lg:flex-row space-y-20 lg:space-y-0 justify-evenly items-center h-fit w-full`}
        >
          {showFoodInfo && <ImagesDisplay links={links} />}
          <ChakraProvider theme={myTheme}>
            {showFoodInfo && <FoodInfo foodId={foodId} portionSize={100} />}
          </ChakraProvider>
        </div>
      </div>

      <div className="flex font-medium justify-center pb-4 pt-36 lg:pt-0">
        <div
          className={`flex justify-between items-center my-3 w-8/12 lg:w-4/12 h-fit ${colors.body} ${colors.text} ${colors.weight} rounded-full px-4 text-center `}
        >
          <input
            ref={searchRef}
            type="text"
            placeholder="Pesquisar"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            className="bg-transparent py-3 w-full outline-none"
          ></input>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className=" w-5 lg:w-6 animate-pulse "
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </div>
      </div>
      <div
        className={`flex flex-col self-center items-center justify-start rounded-md mb-10 px-2 w-10/12 lg:w-6/12 h-foodList overflow-y-scroll ${colors.weight} ${colors.body} ${colors.text} `}
      >
        {allDataJson_arr
          .filter((item) =>
            plainInputValue(item.Alimento).includes(plainInputValue(inputValue))
          )
          .sort((a) => {
            return inputValue ? inputValue.length - a.Alimento.length : 0;
          })
          .map((item, i) => (
            <div
              onClick={() => handleShowFoodInfo(item.id, item.Alimento)}
              key={i}
              className={`flex flex-col border-b h-fit w-full my-4 space-y-1 cursor-pointer ${colors.borderB} `}
            >
              <p>{`${item.Alimento}`}</p>
              <div className="flex space-x-4">
                <p className="mr-2 lg:mr-4">{`Em 100g`}</p>
                <p>{`${item.Calorias} kcal`}</p>
                <p>{`${item.Carboidratos} Carboidratos`}</p>
                <p>{`${item.Gorduras} Gorduras`}</p>
                <p>{`${item.Proteínas} Proteínas`}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
