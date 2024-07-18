import React, { useEffect, useRef } from 'react';
import Button from "@mui/material/Button";

import { gsap } from 'gsap';

const CustomTooltip = ({ step, index, isLastStep, primaryProps, stopTour, goToNextStep }) => {
    const tooltipRef = useRef(null);

    useEffect(() => {
      const tooltip = tooltipRef.current;
      const numCircles = 20; // Number of circles to generate
      const circles = [];
  
      for (let i = 0; i < numCircles; i++) {
        const circle = document.createElement('div');
        const size = Math.random() * 25 + 30; // Random radius between 10 and 60
        const opacity = Math.random() * 0.3; // Random opacity between 0 and 0.5
        const x = Math.random() * tooltip.offsetWidth;
        const y = Math.random() * tooltip.offsetHeight;
  
        circle.style.width = `${size}px`;
        circle.style.height = `${size}px`;
        circle.style.backgroundColor = `rgba(255, 0, 173, ${opacity})`;
        circle.style.borderRadius = '50%';
        circle.style.position = 'absolute';
        circle.style.left = `${x}px`;
        circle.style.top = `${y}px`;
  
        tooltip.appendChild(circle);
        circles.push(circle);
  
        // Animate each circle
        gsap.to(circle, {
          x: Math.random() * 200 - 100, // Random x direction
          y: Math.random() * 200 - 100, // Random y direction
          duration: Math.random() * 6 + 3, 
          repeat: -1, 
          yoyo: true, 
          ease: 'sine.inOut'
        });
      }
  
      return () => {
        circles.forEach(circle => tooltip.removeChild(circle));
      };
    }, []);
  
    return (
      <div ref={tooltipRef} style={{ padding: '10px', border: '1px solid #ccc', borderRadius:"15px",  backgroundColor: "#FFA2C3", width: "450px"  }}>
        {step.content}
        <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
          <Button onClick={stopTour} color="secondary" variant="contained" sx={{zIndex: 10}}>
            {isLastStep ? 'End tour' : 'Skip'}
          </Button>
          <Button
            {...primaryProps}
            onClick={goToNextStep}
            variant="contained"
            color="primary"
            sx={{zIndex: 10}}
          >
            {isLastStep ? 'Finish' : 'Next'}
          </Button>
        </div>
      </div>
    );
  };


export default CustomTooltip;
  