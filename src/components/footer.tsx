import React from "react";
import { colorsAll } from "../app/layout";
import { useSelector } from "react-redux";
import { RootState } from "../utils/store";

const Footer = () => {
  const light = useSelector((state: RootState) => state.light.lightState);
  const colors = light ? colorsAll[0] : colorsAll[1];
  return (
    <footer
      className={`${colors.body} ${colors.text} ${colors.weight} ${colors.menuShadow} h-fit w-full text-xs lg:text-sm text-center`}
    >
      <h1 className="p-6 lg:p-6 2xl:p-8">Desenvolvido por Eleazy Soares</h1>
    </footer>
  );
};

export default Footer;
