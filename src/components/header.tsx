"use client";
import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { toggle } from "../utils/lightSlice";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../utils/store";
import { colorsAll } from "../app/layout";
import { showInfo } from "utils/showFoodInfoSlice";

export default function Header() {
  const light = useSelector((state: RootState) => state.light.lightState);

  const dispatch = useDispatch();
  const handleToggle = () => {
    dispatch(toggle());
  };
  const colors = light ? colorsAll[0] : colorsAll[1];

  const router = useRouter();
  const pathname = usePathname();

  const [currentPage, setCurrentPage] = useState<number>(
    pathname == "/food_diary" ? 0 : 1
  );

  const changePage = () => {
    router.push("/food_info/undefined");
    setCurrentPage(1);
  };

  const diarySaved = useSelector(
    (state: RootState) => state.diarySaved.diarySaved
  );

  return (
    <div
      className={`${colors.body} ${colors.menuShadow} flex fixed top-0 z-50 items-center justify-between h-fit w-full`}
    >
      <div
        className={` flex justify-start lg:justify-around items-center w-fit text-xs lg:text-sm 2xl:text-md h-9 lg:h-10 2xl:h-14`}
      >
        <div className=" flex left-0 items-center w-fit h-full ml-0 ">
          <button
            className={`${colors.text} ${colors.border} ${colors.weight} ${
              colors.hover
            } ${
              currentPage == 0 && colors.currentPage
            } px-2 lg:px-6 w-fit h-full `}
            type="button"
            onClick={() => {
              router.push("/food_diary");
              setCurrentPage(0);
              dispatch(showInfo(false));
            }}
          >
            Contador de Calorias
          </button>
        </div>
        <div className=" flex left-0 items-center w-fit h-full mx-0 ">
          <button
            className={`${colors.text} ${colors.border} ${colors.weight} ${
              colors.hover
            } ${
              currentPage == 1 && colors.currentPage
            } px-2 lg:px-6 w-fit h-full `}
            type="button"
            onClick={() => {
              if (diarySaved) {
                confirm(
                  "Alterações não salvas serão perdidas ao sair da página. Deseja continuar?"
                ) && changePage();
              } else {
                changePage();
              }
            }}
          >
            Banco de Alimentos
          </button>
        </div>
      </div>
      <div className="flex items-center w-fit h-fit mr-4 space-x-0 lg:space-x-7 ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.9"
          stroke={`${colors.stroke}`}
          className=" w-5 2xl:w-7 cursor-pointer transition-transform transform hover:scale-110 "
          onClick={() => {
            handleToggle();
          }}
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d={`${
              light
                ? "M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                : "M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
            }`}
          />
          <title>Alterar esquema de cores</title>
        </svg>
      </div>
    </div>
  );
}
