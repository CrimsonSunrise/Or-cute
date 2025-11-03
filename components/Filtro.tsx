"use client"
import { useState } from "react";
import Botao from "./Botao";

export default function Filtro() {
  const [ativo, setAtivo] = useState("recente");

  return (
    <div className="inline-flex bg-gray-200 rounded-full p-1">
      <Botao texto="Recente" ativo={ativo === "recente"} onClick={() => setAtivo("recente")}/>
      <Botao texto="Em alta" ativo={ativo === "emalta"} onClick={() => setAtivo("emalta")}/>
    </div>
  );
}
