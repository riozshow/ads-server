import { useEffect, useRef, useState } from 'react';

function InfiniteLoader({ next, first }) {
  const [seen, setSeen] = useState();
  const [delay, setDelay] = useState();

  const intersection = useRef(
    new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        intersection.current.unobserve(entry.target);
        setSeen(true);
      }
    })
  );

  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      intersection.current.observe(ref.current);
    }
  }, [ref]);

  useEffect(() => {
    if (seen) {
      intersection.current.disconnect();
      next();
    }
  }, [seen]);

  useEffect(() => {
    setTimeout(
      () => {
        setDelay(true);
      },
      first ? 10 : 500
    );
  }, []);

  return !seen ? (
    <div className={delay ? 'd-block' : 'd-none'} ref={ref}></div>
  ) : next ? (
    <InfiniteLoader next={next} />
  ) : null;
}

export default InfiniteLoader;
