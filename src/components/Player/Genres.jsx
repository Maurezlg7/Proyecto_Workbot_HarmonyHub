import '../../styles/Genres.css';
import React, { useRef, useState, useEffect } from 'react';

const images = [
  '/src/assets/pop.jpg',
  '/src/assets/rock.jpg',
  '/src/assets/tango.jpg',
  '/src/assets/tecno.png',
  '/src/assets/reggaeton.jpg'
];

function Genres() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalItems = images.length;
  const carouselWrapperRef = useRef(null);

  const handleNext = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % totalItems);
  };

  const handlePrev = () => {
    setCurrentIndex(prevIndex => (prevIndex - 1 + totalItems) % totalItems);
  };

  useEffect(() => {
    if (carouselWrapperRef.current) {
      carouselWrapperRef.current.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
  }, [currentIndex]);

  return (
    <div className="carousel">
      <div
        className="carousel-wrapper"
        ref={carouselWrapperRef}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className={`carousel-item ${index === currentIndex ? 'active' : ''}`}
          >
            <img src={image} alt={`Item ${index + 1}`} />
          </div>
        ))}
      </div>
      <button className="carousel-button prev" onClick={handlePrev}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-left-fill" viewBox="0 0 16 16">
          <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
        </svg>
      </button>
      <button className="carousel-button next" onClick={handleNext}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-right-fill" viewBox="0 0 16 16">
          <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
        </svg>
      </button>
    </div>
  );
}

export default Genres;
