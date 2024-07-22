import { useRef, useEffect } from "react";
import Button from "@mui/material/Button";

import { gsap } from 'gsap';

import cat6 from "../../assets/cat6.png";

const CustomModal = ({content, setIsModalOpen}) => {
    const tooltipRef = useRef(null);

    const handleCloseModal = () => {
        setIsModalOpen(false);
    }

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
      <div ref={tooltipRef} style={{ padding: '10px', border: '1px solid #ccc', borderRadius:"15px",  backgroundColor: "#FFA2C3", width: "450px", zIndex:10,  }}>
        <div style={{display: "flex", zIndex:10}}>
            <img style={{width: "80px", margin: "10px", zIndex:10}} src={cat6} alt="guid" />
        <div style={{zIndex:10}}>{content}</div>
        </div>
        
        <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'flex-end', zIndex:10 }}>
          <Button onClick={handleCloseModal} color="secondary" variant="contained" sx={{zIndex: 10}}>
            Ok
          </Button>
        </div>
      </div>
    );
}

export default CustomModal;