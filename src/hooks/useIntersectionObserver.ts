import React, { useEffect, useRef } from 'react';

function useIntersectionObserver<T = Element>(
  callback: (isIntersecting: boolean) => void
) {
  const intersectionRef = useRef<T | null>(null);

  const options = {
    root: document,
    rootMargin: '0px',
    threshold: 1.0,
  };

  useEffect(() => {
    if (intersectionRef.current) {
      const observer = new IntersectionObserver((t) => {
        callback(t[0].isIntersecting);
      }, options);

      //@ts-ignore
      if (intersectionRef.current) observer.observe(intersectionRef.current);
    }
  });

  return intersectionRef;
}

export default useIntersectionObserver;
