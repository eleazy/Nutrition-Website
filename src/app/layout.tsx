"use client";
import "./globals.css";
import Header from "../components/header";
import Footer from "../components/footer";
import { Provider } from "react-redux";
import store from "../utils/store";

export const colorsAll = [
  {
    border: "border-gray-500", //light
    borderB: "border-b-zinc-400",
    borderFoodInfo: "border-black",
    thinBorderB: "thinBorderBlack",
    borderBMealEach: "border-gray-300",
    text: "text-zinc-700",
    subtleTextColor: "text-zinc-500",
    body: "bg-gray-100",
    bodyPage: "bg-white",
    bodyFoodInfo: "bg-white",
    bodySearchMeal: "bg-white",
    weight: "font-medium",
    stroke: "rgb(68, 68, 68)",
    hover: "btn-hover-light",
    currentPage: "currentPageLight",
    shadow: "myShadowDark",
    editColor: "text-blue-500",
    editStrokeColor: "rgb(54, 114, 204)",
    menuShadow: "menuShadowLight",
  },
  {
    border: "border-zinc-100", //dark
    borderB: "border-b-zinc-600",
    borderFoodInfo: "border-white",
    thinBorderB: "thinBorderWhite",
    borderBMealEach: "border-gray-700",
    text: "text-zinc-100",
    subtleTextColor: "text-zinc-400",
    body: "bg-zinc-800",
    bodyPage: "bg-black",
    bodyFoodInfo: "bg-white",
    bodySearchMeal: "bg-zinc-700",
    weight: "font-normal",
    stroke: "rgb(233, 233, 233)",
    hover: "btn-hover-dark",
    currentPage: "currentPageDark",
    shadow: "myShadowLight",
    editColor: "text-yellow-400",
    editStrokeColor: "RGB(250, 204, 20)",
    menuShadow: "menuShadowDark",
  },
];

export const textSizes = {
  textMd: "text-xs lg:text-xs 2xl:text-base ",
  textSm: "text-xs lg:text-xs 2xl:text-sm ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans ">
        <Provider store={store}>
          <Header />
          {children}
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
