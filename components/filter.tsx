"use client"
import { useState } from "react";
import Button from "./button";

export default function Filtro() {
  const [ativo, setAtivo] = useState("recente");

  return (
    <div className="inline-flex bg-gray-200 rounded-full p-1">
      <Button className="rounded-full" ativo={ativo === "recente"} onClick={() => setAtivo("recente")}>Recente</Button>
      <Button className="rounded-full" ativo={ativo === "emalta"} onClick={() => setAtivo("emalta")}>Em alta</Button>
    </div>
  );
}