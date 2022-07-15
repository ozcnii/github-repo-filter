import { useCallback, useEffect, useRef, useState } from "react";

export const useOutsideClick = <RefType extends HTMLElement>(
  initialValue: boolean
) => {
  const [show, setShow] = useState(initialValue);
  const ref = useRef<RefType>(null);

  useEffect(() => {
    const clickHandler = (event: any) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      setShow(false);
    };

    document.addEventListener("mousedown", clickHandler);
    document.addEventListener("touchstart", clickHandler);
    return () => {
      document.removeEventListener("mousedown", clickHandler);
      document.removeEventListener("touchstart", clickHandler);
    };
  }, []);

  return { show, setShow: useCallback(setShow, []), ref };
};
