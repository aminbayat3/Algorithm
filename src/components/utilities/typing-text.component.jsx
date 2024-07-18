import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const TypingText = ({ text }) => {
  const textRef = useRef(null);

  useEffect(() => {
    if (textRef.current) {
      const chars = text.split('');
      const tl = gsap.timeline({ paused: true });
      chars.forEach((char, index) => {
        tl.to(textRef.current.children[index], {
          opacity: 1,
          duration: 0.05,
          ease: 'none',
        });
      });
      tl.play();
    }
  }, [text]);

  return (
    <div ref={textRef} style={{ display: 'inline-block' }}>
      {text.split('').map((char, index) => (
        <span key={index} style={{ opacity: 0 }}>
          {char}
        </span>
      ))}
    </div>
  );
};

export default TypingText;