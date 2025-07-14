import { useEffect, useRef } from "react";

interface IUseInfiniteScroll {
  callback: () => void;
  isLoading: boolean;
}

export const useInfiniteScroll = ({ callback, isLoading }: IUseInfiniteScroll) => {
  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !isLoading) {
        callback();
      }
    });

    const node = loaderRef.current;
    if (node) observer.observe(node);

    return () => {
      if (node) observer.unobserve(node);
    };
  }, [isLoading, callback]);

  return loaderRef;
};
