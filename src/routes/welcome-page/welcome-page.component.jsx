import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PROJECT_INFO } from '../../constants/project-constant';

function WelcomePage() {
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate(); 

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      navigate('/app'); 
    }, 5000); 

    return () => clearTimeout(timer);
  }, [navigate]); 

  if (!isVisible) {
    return null;
  }

  return (
    <div>
      <h1>Welcome to {PROJECT_INFO.name}</h1>
      <p>Version: {PROJECT_INFO.version}</p>
      <p>Release Date: {PROJECT_INFO.releaseDate}</p>
    </div>
  );
}

export default WelcomePage;