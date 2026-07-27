import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

const CounterAnimation = ({ target, duration = 2000, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true
  });
  
  useEffect(() => {
    if (inView) {
      let start = 0;
      const increment = target / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      
      return () => clearInterval(timer);
    }
  }, [inView, target, duration]);
  
  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
};

export default CounterAnimation;