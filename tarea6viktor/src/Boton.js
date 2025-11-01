import { useState, useEffect } from "react";

function Boton({nombre}) {
  const [contador,contar] = useState(true)

  useEffect(() => {
    console.log(contador)
  }, [contador])

  return (
    <button onClick={() => contar(!contador)} style={{backgroundColor: `${contador ? 'pink' : 'blue'}`}}>{`${contador ? 'día' : 'noche'}`}</button>
  );
}

export default Boton;
