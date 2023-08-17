"use client";
import React, { useState, useEffect } from "react";
import data from "../app/registros_alimento.json";
import { Dispatch, SetStateAction } from "react";
import { Item } from "./meal_each";
import { useSelector } from "react-redux";
import { RootState } from "../utils/store";
import { colorsAll } from "../app/layout";
/* eslint-disable react-hooks/exhaustive-deps */

export const allDataJson = data.map((item) => ({
  id: item.id,
  quantity: 100,
  Alimento: item.Alimento || "",
  Calorias: item.Energia || 0,
  Carboidratos: item.Carboidratos || 0,
  Gorduras: item.Gorduras || 0,
  Proteínas: item.Proteínas || 0,
}));

let exp_selected_items: object[] = [];

export const plainInputValue = (str: string) =>
  str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ /g, "");

export default function Search_food({
  setItems,
}: {
  setItems: Dispatch<SetStateAction<Item[]>>;
}) {
  const allDataJson_arr = Object.values(allDataJson);

  const [inputValue, setInputValue] = useState("");
  const searchRef = React.useRef<HTMLInputElement>(null);

  const [selected_items, set_selected_items] = useState<Item>({
    quantity: 100,
    Alimento: "",
    Calorias: 0,
    Carboidratos: 0,
    Gorduras: 0,
    Proteínas: 0,
  });
  useEffect(() => {
    exp_selected_items.push(selected_items);
    setItems((a) => [...a, ...exp_selected_items] as Item[]);
    exp_selected_items = [];

    searchRef.current!.focus();
  }, [selected_items]); //setItems

  const light = useSelector((state: RootState) => state.light.lightState);
  const colors = light ? colorsAll[0] : colorsAll[1];

  return (
    <div
      className={`flex flex-col ${colors.body} ${colors.text} w-full px-4 h-96 rounded-b-md `}
    >
      <div className="flex font-medium justify-center ">
        <div
          className={`flex justify-between items-center my-2 w-3/4 h-fit ${colors.bodySearchMeal} rounded-full p-1 px-5 text-center `}
        >
          <input
            ref={searchRef}
            type="text"
            placeholder="Pesquisar"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            className="bg-transparent  w-full outline-none"
          ></input>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className=" w-6 h-6 animate-pulse cursor-pointer "
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
        className={`flex flex-col self-center items-center justify-start rounded-md px-4 w-11/12 h-5/6 overflow-y-scroll hide_scrollbar ${colors.bodySearchMeal} ${colors.text}`}
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
              key={i}
              onClick={() => set_selected_items(item)}
              className={`flex flex-col border-b h-fit w-full text-xs lg:text-sm my-4 space-y-1 cursor-pointer border-b-zinc-400 "
               `}
            >
              <p>{`${item.Alimento}`}</p>
              <div className="flex space-x-4 text-xs">
                <p className="mr-4">{`Em 100g`}</p>
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
