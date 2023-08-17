/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState, useEffect } from "react";
import Search_food, { allDataJson } from "./search_food";
import { useSelector } from "react-redux";
import { RootState } from "../utils/store";
import { colorsAll } from "../app/layout";
import ModalFoodInfo from "@/components/modalFoodInfo";
import { ChakraProvider, useDisclosure } from "@chakra-ui/react";
import { myTheme } from "utils/chakraUITheme";

export interface Item {
  [key: string]: any;
}
export let macro_nutrientes: string[] = Object.keys(allDataJson[0]).slice(1);

export default function Meal_each({
  meal_key,
  title,
  edit_state,
  set_total_sum,
  set_meals,
}: {
  meal_key: number;
  title: string;
  edit_state: boolean;
  set_total_sum: (sum: { sum: number[]; sum_key: number }) => void;
  set_meals: React.Dispatch<
    React.SetStateAction<
      {
        meal_key: number;
        title: string;
      }[]
    >
  >;
}) {
  let total_values: { [key: string]: number } = {};
  macro_nutrientes.slice(2, macro_nutrientes.length).map((a) => {
    total_values[a] = total_values[a] || 0;
  });

  const light = useSelector((state: RootState) => state.light.lightState);
  const colors = light ? colorsAll[0] : colorsAll[1];

  const [title_edit, set_title_edit] = useState<string>(title);
  const [items, setItems] = useState<Item[]>([]);
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [items_sum, set_items_sum] = useState<number[]>([]);

  const setQuantity = (index: number, value: number) => {
    const updatedItems = [...items];
    updatedItems[index] = { ...updatedItems[index], quantity: value };
    setItems(updatedItems);
  };

  const macroShort = ["Kcal", "Carb", "Gord", "Prot"];

  useEffect(() => {
    const new_total_sum: { sum: number[]; sum_key: number } = {
      sum: [],
      sum_key: meal_key,
    };
    macro_nutrientes.slice(2, macro_nutrientes.length).map((macro) => {
      let temp: number = 0;
      items.map((i) => {
        temp += (i[macro] / 100) * i.quantity;
      });
      new_total_sum.sum.push(temp);
    });
    set_total_sum(new_total_sum);
    set_items_sum(new_total_sum.sum);
  }, [items]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [foodModal, setFoodModal] = useState<number[]>([]);

  return (
    <div
      className={`flex flex-col lg:flex-row space-y-3 lg:space-y-0 items-center w-fit lg:w-full text-xs 2xl:text-sm overflow-x-hidden`}
    >
      <ChakraProvider theme={myTheme}>
        {
          <ModalFoodInfo
            foodId={foodModal[0]}
            quantity={foodModal[1]}
            isOpen={isOpen}
            onClose={onClose}
          />
        }
      </ChakraProvider>
      <div>
        <div
          className={`px-5 py-3 w-screen lg:w-full space-y-3 border ${
            colors.weight
          } ${colors.body} ${colors.border} ${
            showSearch ? "rounded-t-md" : "rounded-md"
          }`}
        >
          <div className="flex flex-col lg:flex-row h-fit items-center justify-between space-y-2 lg: space-x-0 ">
            <div
              className={`flex  ${
                items[0] ? "w-full justify-start" : " w-full justify-center "
              } `}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.0"
                stroke="currentColor"
                className={`w-6 lg:w-7 pr-2 ${
                  items.length > 0
                    ? edit_state
                      ? "hidden"
                      : ""
                    : edit_state
                    ? "hidden"
                    : ""
                } `}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                />
                <title>Editar titulo da refeição</title>
              </svg>
              <input
                value={title_edit}
                placeholder="Refeição"
                className={` bg-transparent outline-none w-32 lg:w-36 h-fit text-sm 2xl:text-base ${
                  items[0] ? "text-start " : "text-center"
                } ${edit_state ? "" : `${colors.editColor}`} `}
                disabled={edit_state}
                onChange={(e) => {
                  set_title_edit(e.target.value);
                }}
              ></input>

              <div
                className={`flex space-x-2 cursor-pointer ${
                  items.length > 0 ? (edit_state ? "hidden" : "") : "hidden"
                }`}
                onClick={() => {
                  confirm("Remover todos os items?") && setItems([]);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className={` w-5 2xl:w-6 transition-transform transform hover:scale-125 `}
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                  <title>Remover todos os itens</title>
                </svg>
              </div>
            </div>
            <div
              className={`${
                items[0] ? "flex flex-col lg:flex-row" : "hidden"
              }   text-xs lg:text-sm 2xl:text-base `}
            >
              <div
                className={`flex justify-end lg:justify-around space-x-10 lg:space-x-0 w-full lg:w-96`}
              >
                {Object.keys(total_values).map((value, i) => (
                  <div className={` text-center`}>
                    <p className={`${colors.subtleTextColor}`}>{value}</p>
                    <p>{items_sum[i]?.toFixed(i > 0 ? 1 : 0)} </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className=" flex items-end ">
            <div
              className={`grid grid-cols-1 gap-y-2 lg:gap-y-4 mealCardSize h-fit `}
            >
              {items.map((item, index) => (
                <div
                  key={index}
                  className={` flex w-min lg:w-full h-fit items-center border-b ${colors.borderBMealEach}`}
                >
                  <div className={`flex flex-col `}>
                    <div className={`flex relative`}>
                      <p
                        className="pr-1 w-80 truncate lg:min-w-fit cursor-pointer"
                        onClick={() => {
                          setFoodModal([item.id, parseInt(item.quantity)]);
                          onOpen();
                        }}
                      >{`${Object.values(item)[2]} `}</p>
                      <div className=" flex items-center">
                        {
                          <input
                            type="number"
                            min={0}
                            value={`${item.quantity}`}
                            onChange={(e) => {
                              setQuantity(
                                index,
                                e.target.value as unknown as number
                              );
                            }}
                            placeholder="0"
                            className={`pr-2 pl-2 outline-0 bg-transparent w-2/3 h-fit text-end ${colors.subtleTextColor}`}
                          ></input>
                        }
                        <p className={` left-0 ${colors.text} h-fit`}>g</p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="2.5"
                          stroke={` ${`${colors.editStrokeColor}`}`}
                          className={`absolute right-0 ml-2 w-4 h-fit cursor-pointer transition-transform transform hover:scale-125 ${
                            edit_state ? "hidden" : ""
                          } `}
                          onClick={() => {
                            setItems((prevItems) => {
                              const updatedItems = [...prevItems];
                              updatedItems.splice(index, 1);
                              return updatedItems;
                            });
                          }}
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                          <title>Remover este item</title>
                        </svg>
                      </div>
                    </div>
                    <div
                      className={`flex lg:hidden w-full items-center justify-around mt-2 `}
                    >
                      {Object.values(item)
                        .slice(3)
                        .map((a, i) => (
                          <p className={`flex items-center `}>
                            {/* <p className={`${colors.subtleTextColor} mr-2`}>
                              {macroShort[i]}
                            </p> */}
                            {((a / 100) * Number(item.quantity)).toFixed(
                              i > 0 ? 1 : 0
                            )}
                          </p>
                        ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="hidden lg:grid grid-cols-4 gap-y-4 w-96 h-fit justify-items-center  ">
              {items.map((item, index) => (
                <React.Fragment key={index}>
                  {Object.keys(item)
                    .slice(3, Object.keys(item).length)
                    .map((value, i) => (
                      <p
                        key={value}
                        className={` border-b ${colors.borderBMealEach} w-full text-center`}
                      >{`${(
                        (item[value] / 100) *
                        Number(item.quantity)
                      ).toFixed(i > 0 ? 1 : 0)}`}</p>
                    ))}
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className=" flex justify-center ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className=" w-7 2xl:w-9 cursor-pointer transition-transform transform hover:scale-125"
              onClick={() => {
                setShowSearch(!showSearch);
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={`${
                  !showSearch
                    ? "M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    : "M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                } `}
              />
              <title>Adicionar itens</title>
            </svg>
          </div>
        </div>
        {showSearch && <Search_food setItems={setItems} />}
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        className={`${
          edit_state ? "hidden " : ""
        }  w-5 2xl:w-6 cursor-pointer transition-transform transform hover:scale-125`}
        onClick={() => {
          if (confirm(`Remover a refeição?`)) {
            //setItems([]);
            set_total_sum({ sum: [0, 0, 0, 0], sum_key: meal_key });

            set_meals((prevItems) => {
              const updatedItems = [...prevItems];
              updatedItems.splice(
                updatedItems.findIndex((a) => a.meal_key === meal_key),
                1
              );
              return updatedItems;
            });
          }
        }}
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
        />
        <title>Remover esta refeição</title>
      </svg>
    </div>
  );
}
