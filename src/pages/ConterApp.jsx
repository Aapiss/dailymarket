import React, { useState } from "react";
import { useCounter } from "../utils/store/useCounter";

const ConterApp = () => {
  //   const [count, setCount] = useState(0);
  const { count, username } = useCounter();
  return (
    <>
      <h2>Counter Apps {username} </h2>
      <ButtonKurang />
      <h2>{count}</h2>
      <ButtonTambah />
    </>
  );
};

export default ConterApp;

const ButtonKurang = () => {
  const { btnKrg } = useCounter();
  return (
    <>
      <button onClick={btnKrg}>Kurang</button>
    </>
  );
};

const ButtonTambah = () => {
  const { btnTambah } = useCounter();
  return (
    <>
      <button onClick={btnTambah}>Tambah</button>
    </>
  );
};
