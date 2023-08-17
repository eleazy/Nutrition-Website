/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState, useEffect } from "react";
import Meal_each, { macro_nutrientes } from "../../components/meal_each";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "utils/store";
import { colorsAll } from "app/layout";
import { saveImage } from "utils/saveImage";
import { diarySaveState } from "utils/diarySavedSlice";

export default function FoodDiaryPage() {
  const [total_sum, set_total_sum] = useState<{
    sum: number[];
    sum_key: number;
  }>({
    sum: [0, 0, 0, 0],
    sum_key: 0,
  });

  const light = useSelector((state: RootState) => state.light.lightState);
  const colors = light ? colorsAll[0] : colorsAll[1];
  const [edit_state, set_edit_state] = useState(true);
  const [meals, set_meals] = useState([
    {
      meal_key: 0,
      title: "Café da Manhã",
    },
    {
      meal_key: 1,
      title: "Almoço",
    },
    {
      meal_key: 2,
      title: "Café da Tarde",
    },
    {
      meal_key: 3,
      title: "Jantar",
    },
  ]);

  let nextMealKey = meals.length
    ? Math.max(...meals.map((a) => a.meal_key)) + 1
    : 0;

  useEffect(() => {
    set_meals(
      meals.map((meal) => ({
        ...meal,
        edit_state: edit_state,
      }))
    );
  }, [edit_state]);

  const [total_sum_all, set_total_sum_all] = useState<{
    [key: number]: number[];
  }>({});

  useEffect(() => {
    set_total_sum_all((prevTotalSumAll) => {
      const updatedTotalSumAll: { [key: number]: number[] } = {
        ...prevTotalSumAll,
      };
      updatedTotalSumAll[total_sum.sum_key] = total_sum.sum;
      return updatedTotalSumAll;
    });
  }, [total_sum, meals]);

  const [total_sum_show, set_total_sum_show] = useState<number[]>([]);
  const totalSumValidation = Object.values(total_sum_all).some(
    (a) => a.reduce((a, b) => a + b) > 0
  )
    ? true
    : false;

  useEffect(() => {
    let temp_arr: number[] = [];
    if (totalSumValidation) {
      for (let e = 0; e < macro_nutrientes.length - 2; e++) {
        let temp: number = 0;
        for (const a in Object.values(total_sum_all)) {
          temp += Object.values(total_sum_all)[a][e];
        }
        temp_arr.push(temp);
      }
    }
    if (temp_arr.length > 0 && temp_arr.reduce((a, b) => a + b) > 0) {
      set_total_sum_show(temp_arr);
    }
  }, [total_sum_all, edit_state, meals]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(diarySaveState(totalSumValidation));
  }, [totalSumValidation]);

  return (
    <div
      id="capture"
      className={`min-h-screen w-full flex flex-col justify-center items-center ${
        light && "font-medium"
      } ${colors.bodyPage} ${colors.text} `}
    >
      <div className="flex flex-col items-center space-y-4 my-20 2xl:my-28 ">
        <div
          className={`flex items-center justify-between ${colors.body} h-fit w-screen lg:w-full p-5 rounded `}
        >
          <div className="flex justify-between items-center h-fit w-fit space-x-5 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke={`${colors.stroke}`}
              className=" w-5 lg:w-7 2xl:w-8 cursor-pointer transition-transform transform hover:scale-125"
              onClick={() => {
                set_edit_state(!edit_state);
              }}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d={`${
                  edit_state
                    ? "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    : "M4.5 12.75l6 6 9-13.5"
                } `}
              />
              <title>Habilitar edição</title>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className={` ${
                !totalSumValidation && "hidden"
              }  w-5 lg:w-7 2xl:w-8 cursor-pointer transition-transform transform hover:scale-125`}
              onClick={() => {
                saveImage(
                  document.getElementById("capture"),
                  total_sum_show[0]
                );
                dispatch(diarySaveState(false));
              }}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
              />
              <title>Salvar como imagem</title>
            </svg>
          </div>

          <div
            className={`flex space-x-5 lg:space-x-14 pr-0 lg:pr-4 text-xs lg:text-base 2xl:text-lg `}
          >
            {totalSumValidation &&
              total_sum_show.map((sum, i) => (
                <p key={sum} className={`text-center`}>
                  {
                    <p className={`${colors.subtleTextColor}`}>
                      {macro_nutrientes.slice(2)[i]}
                      <br />
                    </p>
                  }
                  {sum.toFixed(i == 0 ? 0 : 1)}
                </p>
              ))}
          </div>
        </div>

        {meals.map((meal, i) => {
          return (
            <div key={`${meal.meal_key}`} className="flex items-center w-full ">
              <Meal_each
                meal_key={meal.meal_key}
                title={meal.title}
                edit_state={edit_state}
                set_total_sum={set_total_sum}
                set_meals={set_meals}
              />
            </div>
          );
        })}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className=" w-8 2xl:w-10 cursor-pointer transition-transform transform hover:scale-125"
          onClick={() => {
            set_meals([
              ...meals,
              {
                meal_key: nextMealKey,
                title: "Refeição",
              },
            ]);
          }}
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </div>
    </div>
  );
}
