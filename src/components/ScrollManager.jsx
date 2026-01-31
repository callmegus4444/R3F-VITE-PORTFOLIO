import { useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";

import { rocketModeAtom } from "./Rocket";
import { useAtom } from "jotai";

export const ScrollManager = (props) => {
  const { section, onSectionChange } = props;

  const [rocketMode, setRocketMode] = useAtom(rocketModeAtom);

  const data = useScroll();
  const lastScroll = useRef(0);
  const isAnimating = useRef(false);

  data.fill.classList.add("top-0");
  data.fill.classList.add("absolute");

  useEffect(() => {
    gsap.to(data.el, {
      duration: 1,
      scrollTop: section * data.el.clientHeight,
      onStart: () => {
        isAnimating.current = true;
      },
      onComplete: () => {
        isAnimating.current = false;
      },
    });
  }, [section]);

  useEffect(() => {
    if (rocketMode) {
      // Rocket Sequence
      // 1. Wait for iris transition (set externally or rough timing here)
      // 2. Start Scroll Up slowly
      setTimeout(() => {
        gsap.to(data.el, {
          duration: 5, // Slow ascent
          scrollTop: 0,
          ease: "power2.inOut",
          onStart: () => {
            isAnimating.current = true;
          },
          onComplete: () => {
            isAnimating.current = false;
            setRocketMode(false);
            onSectionChange(0);
          },
        });
      }, 2000); // Wait 2s for "Engine Start" / Transition
    }
  }, [rocketMode]);

  useFrame(() => {
    if (isAnimating.current) {
      lastScroll.current = data.scroll.current;
      return;
    }

    const curSection = Math.floor(data.scroll.current * data.pages);
    if (data.scroll.current > lastScroll.current && curSection === 0) {
      onSectionChange(1);
    }
    if (
      data.scroll.current < lastScroll.current &&
      data.scroll.current < 1 / (data.pages - 1)
    ) {
      onSectionChange(0);
    }
    lastScroll.current = data.scroll.current;
  });

  return null;
};