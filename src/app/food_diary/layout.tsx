import React from "react";

export const metadata = {
  title: "Nutrition Website",
  description: "Contador de Calorias e Informações Nutricionais",
};

export default function FoodDiaryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className={``}>{children}</main>;
}
