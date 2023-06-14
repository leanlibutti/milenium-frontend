import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';

import { Colors } from '../constants/Colors';

const { backgroundText } = Colors;

export const Carousel = (images) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [loaded, setLoaded] = useState(false);

  const handleNext = () => {
    if (currentImage === images.images.length - 1) {
      setCurrentImage(0);
    } else {
      setCurrentImage(currentImage + 1);
    }

    setLoaded(false);
    handleButtonInteraction();
  };

  const handlePrev = () => {
    if (currentImage === 0) {
      setCurrentImage(images.images.length - 1);
    } else {
      setCurrentImage(currentImage - 1);
    }

    setLoaded(false);
    handleButtonInteraction();
  };

  useEffect(() => {
    const id = setInterval(handleNext, 5000);
    setIntervalId(id);
    setLoaded(false);
    return () => clearInterval(intervalId);
  }, [currentImage]);

  const handleButtonInteraction = () => {
    clearInterval(intervalId);
  };

  return (
    <CarouselContainer>
      <Button type="button" onClick={handlePrev}>
        <IoIosArrowBack />
      </Button>
      <Button type="button" onClick={handleNext}>
        <IoIosArrowForward />
      </Button>
      <CarouselImages>
        <CarouselImage
          key={currentImage}
          src={images.images[currentImage]}
          alt={`Imagen ${currentImage + 1}`}
          className={loaded ? 'loaded' : ''}
          onLoad={() => setLoaded(true)}
        />
      </CarouselImages>
    </CarouselContainer>
  );
};

const Button = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: ${backgroundText};
  border-radius: 100%;
  margin: 0 2vw;
  border: none;
  padding: 10px;
  cursor: pointer;
  z-index: 1;
  transition: opacity 0.5s ease-in-out;

  svg {
    font-size: 2.5rem;

    @media screen and (max-width: 480px) {
      font-size: 1rem;
    }
  }

  :first-of-type {
    left: 0;
  }

  :last-of-type {
    right: 0;
  }

  :hover {
    opacity: 0.7;
  }
`;

const CarouselContainer = styled.div`
  position: relative;
`;

const CarouselImage = styled.img`
  width: 100%;
  min-height: 500px;
  height: auto;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;

  &.loaded {
    opacity: 1;
  }
`;

const CarouselImages = styled.div`
  position: relative;
  overflow: hidden;
`;
