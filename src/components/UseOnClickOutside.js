import { useEffect } from "react";

export default function UseOnClickOutside(ref, handleClick){
  useEffect(() => {
    const listener = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        handleClick(event);
      }
    };

    document.addEventListener("mousedown", listener, {passive: true});
    document.addEventListener("touchstart", listener, {passive: true});

    return () => {
      document.removeEventListener("mousedown", listener, {passive: true});
      document.removeEventListener("touchstart", listener, {passive: true});
    };
  }, [ref, handleClick]);
}