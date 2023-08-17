"use client";
import React, { Key, useEffect, useState } from "react";
import data from "../app/registros_alimento.json";
import { useToast } from "@chakra-ui/toast";
import { useSelector } from "react-redux";
import { RootState } from "../utils/store";
import { colorsAll, textSizes } from "../app/layout";

interface dataProps {
  "ID "?: any;
  Alimento?: string;
  Energia?: any;
  Proteínas?: any;
  Carboidratos?: any;
  Gorduras?: any;
  "Gorduras Saturadas"?: any;
  "Gorduras Monoinsaturadas"?: any;
  "Gorduras Poliinsaturadas"?: any;
  Colesterol?: any;
  "Fibras Alimentares"?: any;
  Cinzas?: any;
  Cálcio?: any;
  Magnésio?: any;
  Manganês?: any;
  Fósforo?: any;
  Ferro?: any;
  Sódio?: any;
  Potássio?: any;
  Cobre?: any;
  Zinco?: any;
  Retinol?: any;
  RE?: any;
  RAE?: any;
  Tiamina?: any;
  Riboflavina?: any;
  Piridoxina?: any;
  Niacina?: any;
  "Vitamina C"?: any;
}
const percentual = (value: number, multiplier: number, dailyValue: number) => {
  let result = value * multiplier;
  result = (result / dailyValue) * 100;
  return result.toFixed(0);
};

export default function FoodInfo({
  foodId,
  portionSize,
}: {
  foodId: number;
  portionSize: number;
}) {
  const [finalPortionSize, setFinalPortionSize] = useState<number>(portionSize);
  useEffect(() => {
    setFinalPortionSize(portionSize);
  }, [foodId]);

  const selectedFood: dataProps = Object.fromEntries(
    Object.entries(data[foodId])
      .slice(2)
      .map(([key, value]) => {
        const transformedValue = (value / 100) * finalPortionSize;
        return [key, transformedValue.toFixed(2)];
      })
  );

  const light = useSelector((state: RootState) => state.light.lightState);
  const colors = light ? colorsAll[0] : colorsAll[1];
  const dontShow = [
    "id",
    "Alimento",
    "Energia",
    "Proteínas",
    "Carboidratos",
    "Gorduras",
    "Gorduras Saturadas",
    "Gorduras Monoinsaturadas",
    "Gorduras Poliinsaturadas",
    "Colesterol",
    "Fibras Alimentares",
    "Sódio",
  ];
  type Measure = {
    [key: string]: [string, number];
  };
  const measure: Measure = {
    Cálcio: ["mg", 1000],
    Magnésio: ["mg", 400],
    Manganês: ["mg", 2.3],
    Fósforo: ["mg", 700],
    Ferro: ["mg", 18],
    Potássio: ["mg", 4700],
    Niacina: ["mg", 16],
    "Vitamina C": ["mg", 90],
    Piridoxina: ["mg", 1.3],
    Riboflavina: ["mg", 1.3],
    Tiamina: ["mg", 1.2],
    "RAE ": ["mcg", 600],
    RE: ["mcg", 600],
    Retinol: ["mcg", 600],
    Zinco: ["mg", 11],
    Cobre: ["mg", 0.9],
    Cinzas: ["g", 100],
  };

  const microNutrients = Object.keys(data[foodId]).filter(
    (a) => !dontShow.includes(a)
  );

  const microNutrientsSequel =
    microNutrients.length % 2 == 1
      ? [...microNutrients.slice(0, microNutrients.length / 2).concat([""])] //
      : [...microNutrients.slice(0, microNutrients.length / 2)];

  const [dailyValue, setDailyValue] = React.useState(2000);
  const [percents, setPercents] = React.useState([55, 15, 30]);

  const toast = useToast();
  useEffect(() => {
    if (percents.reduce((a, b) => a + b, 0) > 100) {
      setPercents([55, 15, 30]);
      if (!toast.isActive("toast")) {
        toast({
          id: "toast",
          title: "Percentual de macronutrientes excedido",
          description: "O percentual de macronutrientes excedeu 100%",
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
      }
    }
  }, [percents]);

  return (
    <div
      className={`${colors.body} ${colors.text} h-fit w-fit py-3 px-4 rounded-xl text-xs 2xl:text-base`}
    >
      <div className="flex space-x-2 items-end justify-start mb-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="0.8"
          stroke="currentColor"
          className=" w-5 2xl:w-6 "
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d={`M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10 `}
          />
        </svg>
        <h2 className=" text-zinc-400">Porção</h2>
        <input
          type="number"
          min="0"
          title="porção"
          className="h-fit w-fit outline-none bg-transparent"
          value={finalPortionSize}
          placeholder=""
          onChange={(e) => {
            setFinalPortionSize(Number(e.target.value));
          }}
        ></input>
      </div>
      <div className="flex space-x-2 items-end justify-start mb-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="0.8"
          stroke="currentColor"
          className=" w-5 2xl:w-6 "
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d={`M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10 `}
          />
        </svg>
        <h2 className=" text-zinc-400">Valor Diário para referência</h2>
        <input
          type="number"
          min="0"
          title="porção"
          className="h-fit w-10 outline-none bg-transparent"
          value={dailyValue}
          placeholder=""
          onChange={(e) => {
            setDailyValue(Number(e.target.value));
          }}
        ></input>
        <h2 className=" text-zinc-400">kcal</h2>
      </div>
      <div className="flex space-x-0 items-end justify-start mb-5 lg:mb-3 2xl:mb-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="0.8"
          stroke="currentColor"
          className=" w-5 2xl:w-6 "
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d={`M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10 `}
          />
        </svg>
        <h2 className="pr-2 text-zinc-400">Carboidratos</h2>
        <input
          type="number"
          min="0"
          title="porção"
          className="h-fit w-5 outline-none bg-transparent "
          value={percents[0]}
          placeholder=""
          onChange={(e) => {
            let temp = [...percents];
            temp[0] = Number(e.target.value);
            setPercents(temp);
          }}
        ></input>
        <h2 className="pr-3 text-zinc-400">%</h2>
        <h2 className="pr-2 text-zinc-400">Proteínas</h2>
        <input
          type="number"
          min="0"
          title="porção"
          className="h-fit w-5 outline-none bg-transparent"
          value={percents[1]}
          placeholder=""
          onChange={(e) => {
            let temp = [...percents];
            temp[1] = Number(e.target.value);
            setPercents(temp);
          }}
        ></input>
        <h2 className="pr-3 text-zinc-400">%</h2>
        <h2 className="pr-2 text-zinc-400">Gorduras</h2>
        <input
          type="number"
          min="0"
          title="porção"
          className="h-fit w-5 outline-none bg-transparent"
          value={percents[2]}
          placeholder=""
          onChange={(e) => {
            let temp = [...percents];
            temp[2] = Number(e.target.value);
            setPercents(temp);
          }}
        ></input>
        <h2 className=" text-zinc-400">%</h2>
      </div>

      <div
        className={`${colors.shadow} ${colors.body} ${colors.text} flex-col h-fit w-full lg:w-fit p-1 justify-center`}
      >
        <div className={` ${colors.borderFoodInfo} border-4 p-1 `}>
          <div className={` ${colors.borderFoodInfo} flex-col border-b-8`}>
            <h1 className="text-3xl 2xl:text-4xl font-bold">
              Fatores Nutricionais
            </h1>

            <div className="flex space-x-4 items-center">
              <p className={`${textSizes.textMd}`}>
                {`Porção de ${finalPortionSize}g`}{" "}
              </p>

              <h2 className="font-semibold text-sm lg:text-xs 2xl:text-xl">
                {data[foodId].Alimento}
              </h2>
            </div>
          </div>
          <div
            className={` ${colors.borderFoodInfo} flex justify-between border-b-2 mt-2 `}
          >
            <p className={`${textSizes.textMd}`}>Quantidade por porção</p>

            <p className={`${textSizes.textMd} font-bold`}>
              % Valores Diários*
            </p>
          </div>

          <div
            className={` ${colors.borderFoodInfo} flex justify-between border-b-4`}
          >
            <div className="flex space-x-3 items-center">
              <p className={`${textSizes.textMd} font-bold`}>{`Calorias`}</p>
              <p className={`${textSizes.textMd} font-bold`}>
                {selectedFood.Energia}
              </p>
            </div>
            <p className="font-bold">
              {`${percentual(selectedFood.Energia as number, 1, dailyValue)}%`}
            </p>
          </div>

          <div className="flex justify-between pt-2 2xl:pt-4">
            <div className="flex space-x-3 ">
              <p className={`${textSizes.textMd} font-bold`}>
                {`Gorduras Totais`}{" "}
              </p>
              <p className={`${textSizes.textMd} font-bold`}>
                {(selectedFood.Gorduras && `${selectedFood.Gorduras}g`) || "**"}
              </p>
            </div>
            <p className={`${textSizes.textMd} font-bold`}>
              {(selectedFood.Gorduras &&
                `${percentual(
                  selectedFood.Gorduras as number,
                  9,
                  (dailyValue * percents[2]) / 100
                )}%`) ||
                "**"}
            </p>
          </div>
          <div className="flex justify-end">
            <div
              className={` ${colors.borderFoodInfo} flex justify-between w-11/12 border-t-2`}
            >
              <div className={`${textSizes.textSm} flex space-x-3`}>
                <p>{`Gorduras Saturadas`} </p>
                <p className={``}>
                  {(selectedFood["Gorduras Saturadas"] &&
                    `${selectedFood["Gorduras Saturadas"]}`) ||
                    "**"}
                </p>
              </div>
              <p className={`${textSizes.textSm} font-bold`}>
                {(selectedFood["Gorduras Saturadas"] &&
                  `${percentual(
                    selectedFood["Gorduras Saturadas"] as number,
                    9,
                    ((percents[2] / 100) * dailyValue) / 3
                  )}%`) ||
                  "**"}
              </p>
            </div>
          </div>
          <div className="flex justify-end">
            <div
              className={` ${colors.borderFoodInfo} flex justify-between w-11/12 border-t-2`}
            >
              <div className={`${textSizes.textSm} flex space-x-3`}>
                <p>{`Gorduras Monoinsaturadas`} </p>
                <p>
                  {(selectedFood["Gorduras Monoinsaturadas"] &&
                    `${selectedFood["Gorduras Monoinsaturadas"]}g`) ||
                    "**"}
                </p>
              </div>
              <p className={`${textSizes.textSm} font-bold`}>
                {(selectedFood["Gorduras Monoinsaturadas"] &&
                  `${percentual(
                    selectedFood["Gorduras Monoinsaturadas"] as number,
                    9,
                    ((percents[2] / 100) * dailyValue) / 3
                  )}%`) ||
                  "**"}
              </p>
            </div>
          </div>
          <div className="flex justify-end">
            <div
              className={` ${colors.borderFoodInfo} flex justify-between w-11/12 border-t-2`}
            >
              <div className={`${textSizes.textSm} flex space-x-3`}>
                <p>{`Gorduras Poliinsaturadas`} </p>
                <p>
                  {(selectedFood["Gorduras Poliinsaturadas"] &&
                    `${selectedFood["Gorduras Poliinsaturadas"]}g`) ||
                    "**"}
                </p>
              </div>
              <p className={`${textSizes.textSm} font-bold`}>
                {(selectedFood["Gorduras Poliinsaturadas"] &&
                  `${percentual(
                    selectedFood["Gorduras Poliinsaturadas"] as number,
                    9,
                    ((percents[2] / 100) * dailyValue) / 3
                  )}%`) ||
                  "**"}
              </p>
            </div>
          </div>
          <div
            className={` ${colors.borderFoodInfo} flex justify-between border-t-2`}
          >
            <div className="flex space-x-3">
              <p className={`${textSizes.textMd} font-bold`}>{`Colesterol`} </p>
              <p>
                {(selectedFood["Colesterol"] &&
                  `${selectedFood["Colesterol"]}mg`) ||
                  "**"}
              </p>
            </div>
            <p className={`${textSizes.textMd} font-bold`}>
              {(selectedFood["Colesterol"] &&
                `${percentual(
                  selectedFood["Colesterol"] as number,
                  1,
                  300
                )}%`) ||
                "**"}
            </p>
          </div>
          <div
            className={` ${colors.borderFoodInfo} flex justify-between border-t-2`}
          >
            <div className={`${textSizes.textMd} flex space-x-3`}>
              <p className="font-bold">{`Sódio`} </p>
              <p>
                {(selectedFood["Sódio"] && `${selectedFood["Sódio"]}mg`) ||
                  "**"}
              </p>
            </div>
            <p className={`${textSizes.textMd} font-bold`}>
              {(selectedFood["Sódio"] &&
                `${percentual(selectedFood["Sódio"] as number, 1, 2000)}%`) ||
                "**"}
            </p>
          </div>
          <div
            className={` ${colors.borderFoodInfo} flex justify-between border-t-2 `}
          >
            <div className={`${textSizes.textMd} flex space-x-3`}>
              <p className={`${textSizes.textMd} font-bold`}>
                {`Carboidratos`}{" "}
              </p>
              <p>
                {(selectedFood["Carboidratos"] &&
                  `${selectedFood["Carboidratos"]}g`) ||
                  "**"}
              </p>
            </div>
            <p className={`${textSizes.textMd} font-bold`}>
              {(selectedFood["Carboidratos"] &&
                `${percentual(
                  selectedFood["Carboidratos"] as number,
                  4,
                  (dailyValue * percents[0]) / 100
                )}%`) ||
                "**"}
            </p>
          </div>
          <div className="flex justify-end">
            <div
              className={` ${colors.borderFoodInfo} flex justify-between w-11/12 border-t-2`}
            >
              <div className={`${textSizes.textSm} flex space-x-3`}>
                <p>{`Fibras Alimentares`} </p>
                <p>
                  {(selectedFood["Fibras Alimentares"] &&
                    `${selectedFood["Fibras Alimentares"]}g`) ||
                    "**"}
                </p>
              </div>
              <p className={`${textSizes.textMd} font-bold`}>
                {(selectedFood["Fibras Alimentares"] &&
                  `${percentual(
                    selectedFood["Fibras Alimentares"] as number,
                    1,
                    25
                  )}%`) ||
                  "**"}
              </p>
            </div>
          </div>
          <div className="flex justify-end"></div>
          <div
            className={` ${colors.borderFoodInfo} flex justify-between border-t-2`}
          >
            <div className={`${textSizes.textMd} flex space-x-3`}>
              <p className="font-bold">{`Proteínas`} </p>
              <p>
                {selectedFood["Proteínas"]
                  ? `${selectedFood["Proteínas"]}g`
                  : "**"}
              </p>
            </div>
            <p className={`${textSizes.textSm} font-bold`}>
              {selectedFood["Proteínas"]
                ? `${percentual(
                    selectedFood["Proteínas"] as number,
                    4,
                    (dailyValue * percents[1]) / 100
                  )}%`
                : "**"}
            </p>
          </div>
          <div
            className={` ${colors.borderFoodInfo} grid gap-0 grid-cols-1 lg:grid-cols-2 justify-items-center w-full ${textSizes.textSm} border-t-8`}
          >
            <div className="w-full ">
              {microNutrients
                .slice(microNutrients.length / 2, microNutrients.length)
                .map((item) => (
                  <div
                    className={`flex justify-between ${colors.thinBorderB} pr-0 lg:pr-10 w-full my-1 space-x-3`}
                    key={item}
                  >
                    <div className="flex space-x-10">
                      <div className="">{item}</div>
                      <div className="">
                        {selectedFood[item as keyof typeof selectedFood]}
                        {measure[item][0]}
                      </div>
                    </div>
                    <div>
                      {`${percentual(
                        selectedFood[item as keyof typeof selectedFood],
                        1,
                        measure[item][1]
                      )}%`}
                    </div>
                  </div>
                ))}
            </div>
            <div className="w-full ">
              {microNutrientsSequel.map((item) => (
                <div
                  className={` ${colors.thinBorderB} flex justify-between pr-0 my-1`}
                >
                  <div className="flex space-x-10">
                    <div className="">{item}</div>
                    <div className="">
                      {selectedFood[item as keyof typeof selectedFood]
                        ? `${selectedFood[item as keyof typeof selectedFood]}${
                            measure[item][0]
                          }`
                        : ""}
                    </div>
                  </div>
                  <div>
                    {selectedFood[item as keyof typeof selectedFood]
                      ? ` ${percentual(
                          selectedFood[item as keyof typeof selectedFood],
                          1,
                          measure[item][1]
                        )}%`
                      : "**"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
