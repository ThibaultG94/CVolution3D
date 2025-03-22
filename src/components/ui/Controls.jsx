import { useContext } from "react";

const Controls = () => {
  const handleResetView = () => {
    // Implement view reset
  };

  const handleFocus = (element) => {
    // Implement focus on a specific element
  };

  return (
    <div className="controls">
      <button onClick={handleResetView}>Vue initiale</button>
      <button onClick={() => handleFocus("laptop")}>Laptop</button>
      <button onClick={() => handleFocus("keyboard")}>Clavier</button>
      <button onClick={() => handleFocus("photo")}>Photo</button>
    </div>
  );
};

export default Controls;
