import { useState } from "react";

export const useToggle = () => {
  const [isToggled, setToggled] = useState(false);

  const toggleOn = () => setToggled(true);
  const toggleOff = () => setToggled(false);

  return { isToggled, toggleOn, toggleOff };
};
