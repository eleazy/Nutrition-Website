"use client";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "utils/store";
import { colorsAll } from "app/layout";
import { useRouter } from "next/navigation";

export default function My404() {
  const light = useSelector((state: RootState) => state.light.lightState);
  const colors = light ? colorsAll[0] : colorsAll[1];

  const router = useRouter();

  setTimeout(() => router.push("/food_diary/"), 3000);

  return (
    <div
      className={`flex flex-col text-center space-y-10 w-full h-screen justify-center items-center ${colors.bodyPage} ${colors.text}`}
    >
      <h1 className={`text-3xl `}>Erro 404 - Página não encontrada</h1>
      <h1 className={`text-2xl ${colors.subtleTextColor}`}>
        Redirecionando...
      </h1>
    </div>
  );
}
