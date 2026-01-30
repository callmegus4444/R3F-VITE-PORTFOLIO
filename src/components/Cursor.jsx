import { useEffect, useRef, useState } from "react";

const CURSOR_SPEED = 0.08;

let mouseX = -10;
let mouseY = -10;
let outlineX = 0;
let outlineY = 0;

export const Cursor = () => {
  const cursorOutline = useRef();
  const [hoverButton, setHoverButton] = useState(false);

  const animate = () => {
    let distX = mouseX - outlineX;
    let distY = mouseY - outlineY;
    outlineX = outlineX + distX * CURSOR_SPEED;
    outlineY = outlineY + distY * CURSOR_SPEED;

    if (cursorOutline.current) {
      cursorOutline.current.style.left = `${outlineX}px`;
      cursorOutline.current.style.top = `${outlineY}px`;
    }

    requestAnimationFrame(animate);
  };

  useEffect(() => {
    const mouseEventsListener = (event) => {
      mouseX = event.pageX;
      mouseY = event.pageY;
    };

    document.addEventListener("mousemove", mouseEventsListener);
    requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", mouseEventsListener);
    };
  }, []);

  useEffect(() => {
    const mouseEventListener = (e) => {
      if (
        e.target.tagName.toLowerCase() === "button" ||
        e.target.parentElement?.tagName.toLowerCase() === "button" ||
        e.target.tagName.toLowerCase() === "input" ||
        e.target.tagName.toLowerCase() === "textarea"
      ) {
        setHoverButton(true);
      } else {
        setHoverButton(false);
      }
    };

    document.addEventListener("mouseover", mouseEventListener);

    return () => {
      document.removeEventListener("mouseover", mouseEventListener);
    };
  }, []);

  return (
    <div
      className={`invisible md:visible fixed -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none transition-all duration-100 ${
        hoverButton
          ? "bg-transparent border-2 border-indigo-400 w-8 h-8 cursor-glow"
          : "bg-indigo-500 w-3 h-3"
      }`}
      style={{ zIndex: 50 }}
      ref={cursorOutline}
    >
      {!hoverButton && (
        <div className="absolute inset-0 bg-indigo-400 rounded-full animate-ping opacity-75"></div>
      )}
    </div>
  );
};
