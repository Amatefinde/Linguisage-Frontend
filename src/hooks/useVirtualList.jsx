import { useEffect, useState } from "react";

export default function useVirtualList(
  currentBookAllPages,
  numberActivePage = 12,
) {
  const [offset, setOffset] = useState(0);
  const [currentPages, setCurrentPages] = useState(
    currentBookAllPages.slice(0, numberActivePage),
  );

  useEffect(() => {
    if (offset + numberActivePage > currentBookAllPages.length) {
      setOffset(currentBookAllPages.length - numberActivePage);
    } else if (offset >= 0) {
      setCurrentPages(
        currentBookAllPages.slice(offset, offset + numberActivePage),
      );
    } else {
      setOffset(0);
    }
  }, [offset]);

  const [lastScrollTop, setLastScrollTop] = useState(0);
  useEffect(() => {
    function scrollHandler(e) {
      const scrollHeight = e.target.documentElement.scrollHeight;
      const scrollTop = e.target.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      // Down  scroll
      if (scrollTop > lastScrollTop) {
        if (scrollTop > scrollHeight * 0.7) {
          if (offset + numberActivePage < currentBookAllPages.length) {
            setOffset((prev) => prev + 4);
          }
        }
      } else {
        // Up scroll
        if (scrollTop < scrollHeight * 0.4) {
          if (offset >= 0) {
            setOffset((prev) => prev - 4);
          }
        }
      }
      setLastScrollTop(scrollTop);
    }

    document.addEventListener("scroll", scrollHandler);
    return () => document.removeEventListener("scroll", scrollHandler);
  }, [lastScrollTop]);

  return currentPages;
}
