import { useState } from "react";
import slider1 from "../assets/img/slider-1.avif";
import slider2 from "../assets/img/slider-2.avif";
import slider3 from "../assets/img/slider-3.avif";

function SliderComponent() {
  const [currentSlideId, setCurrentSlideId] = useState(1);

  const prev = () => {
    setCurrentSlideId(current => current === 1 ? 3 : current -1);
  };

  const next = () => {
    setCurrentSlideId(current => current === 3 ? 1 : current +1);

  };

  const slides = [
    { id: 1, image: slider2, text: "La mejor tecnología al alcance de tus manos" },
    { id: 2, image: slider3, text: "Explora el futuro con la mejor tecnología."},
    { id: 3, image: slider1, text: "Innovación y calidad en cada dispositivo." }
  ];

  return (
    <div className="relative main-slider">
      <ul className="">
        {slides.map(slide => (

            <li key={slide.id}
            className={`h-[40vh] sm:h-[70vh] relative ${
                currentSlideId === slide.id ? '' : 'hidden'
              }`}
            >
            <img 
              className="h-full object-cover w-full slider-image" 
              src={slide.image} 
              alt="" 
            />
        
            <div className="absolute top-0 left-0 h-full w-full flex">
                <h2 className="text-4xl font-bold my-auto w-full text-center p-20 text-slider">
                {slide.text}
                </h2>
            </div>
            </li>
        ))}
      </ul>
      <div className="absolute px-5  h-full w-full top-0 left-0 container--rows">
        <div className="my-auto w-full  justify-between container--rows">
          <button
            onClick={prev}
            className="bg-white/60 p-3 rounded-full bg-opacity-80 shadow-lg icon-rows"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
              />
            </svg>
          </button>
          <button
            onClick={next}
            className="bg-white/60 p-3 rounded-full bg-opacity-80 shadow-lg icon-rows"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default SliderComponent;
