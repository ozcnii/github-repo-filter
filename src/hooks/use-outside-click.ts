import { useCallback, useEffect, useRef, useState } from "react";

export const useOutsideClick = <T extends HTMLElement>(
  initialValue: boolean
) => {
  const [show, setShow] = useState(initialValue);
  const ref = useRef<T>(null);

  useEffect(() => {
    const isCurrentNode = (event: Event) =>
      !ref.current || ref.current.contains((event?.target as Node) || null);

    const clickHandler = (event: Event) => {
      if (isCurrentNode(event)) return;
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
