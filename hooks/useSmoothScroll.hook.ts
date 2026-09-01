"use client";

import { useEffect, useRef, type RefObject } from "react";

const EASE = 0.16;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function useSmoothScroll(
  ref: RefObject<HTMLElement | null>,
  enabled: boolean,
  resetKey?: string
) {
  const target = useRef(0);
  const current = useRef(0);
  const frame = useRef(0);
  const running = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }
    node.scrollTop = 0;
    target.current = 0;
    current.current = 0;
  }, [ref, resetKey]);

  useEffect(() => {
    const node = ref.current;
    if (!node || !enabled) {
      return;
    }
    const scroller = node;

    function maxScroll() {
      return Math.max(0, scroller.scrollHeight - scroller.clientHeight);
    }

    function tick() {
      current.current += (target.current - current.current) * EASE;
      if (Math.abs(target.current - current.current) < 0.4) {
        current.current = target.current;
        scroller.scrollTop = current.current;
        running.current = false;
        return;
      }
      scroller.scrollTop = current.current;
      frame.current = window.requestAnimationFrame(tick);
    }

    function start() {
      if (running.current) {
        return;
      }
      running.current = true;
      frame.current = window.requestAnimationFrame(tick);
    }

    function onWheel(event: WheelEvent) {
      if (event.ctrlKey) {
        return;
      }
      const origin = event.target;
      if (
        origin instanceof Element &&
        origin.closest("input, textarea, select, [data-native-scroll]")
      ) {
        return;
      }
      event.preventDefault();
      target.current = clamp(target.current + event.deltaY, 0, maxScroll());
      start();
    }

    function onScroll() {
      if (running.current) {
        return;
      }
      current.current = scroller.scrollTop;
      target.current = scroller.scrollTop;
    }

    scroller.addEventListener("wheel", onWheel, { passive: false });
    scroller.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      scroller.removeEventListener("wheel", onWheel);
      scroller.removeEventListener("scroll", onScroll);
      window.cancelAnimationFrame(frame.current);
      running.current = false;
    };
  }, [ref, enabled]);
}
