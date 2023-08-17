"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function FoodList() {
  const router = useRouter();

  useEffect(() => {
    router.push("/food_info/undefined");
  }, []);

  return <div></div>;
}
