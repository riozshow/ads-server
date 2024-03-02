import { useState } from 'react';

function useScrollHandler({ saveScrollId }) {
  const [offset, setOffset] = useState({
    top: 0,
    left: 0,
    lastScrollTop: 0,
    lastScrollLeft: 0,
  });

  const onScroll = (e) => {
    if (saveScrollId) {
      if (!window.appScrollState) window.appScrollState = {};
      window.appScrollState[saveScrollId] = e.target.scrollTop;
    }

    setOffset((offset) => {
      offset.lastScrollTop = e.target.scrollTop - offset.top;
      offset.lastScrollLeft = e.target.scrollLeft - offset.left;
      offset.top = e.target.scrollTop;
      offset.left = e.target.scrollLeft;
      return { ...offset };
    });
  };

  const scrollTo = (target) => {
    if (
      saveScrollId &&
      window.appScrollState &&
      window.appScrollState[saveScrollId]
    ) {
      target.scrollTo({ top: window.appScrollState[saveScrollId] });
    }
  };

  return {
    onScroll,
    scrollTo,
    ...offset,
    topOrBackScroll: offset.lastScrollTop < 0 || offset.top === 0,
  };
}

export default useScrollHandler;
