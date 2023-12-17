import { useEffect, useState } from 'react';

// Code from: https://www.joshwcomeau.com/snippets/javascript/debounce/
export const debounce = (callback, wait) => {
  let timeoutId = null;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      // eslint-disable-next-line prefer-spread
      callback.apply(null, args);
    }, wait);
  };
};

/**
 * @param {object} elementRef DOM ref of the element to check the intersection
 * @param {string} rootMargin margin around the root to ask if element is visible or not
 * @returns isIntersecting if the element is visible or not
 */
export const useElementInView = (elementRef, rootMargin = '0px') => {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting);
      },
      { rootMargin }
    );
    if (elementRef) observer.observe(elementRef);

    return () => {
      if (elementRef) observer.unobserve(elementRef);
    };
  }, [rootMargin, elementRef]);

  return isIntersecting;
};
