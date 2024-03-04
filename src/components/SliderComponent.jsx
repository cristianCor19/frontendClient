import {useEffect} from "react";

import slider1 from "../assets/img/slider-1.jpeg";
import slider2 from "../assets/img/slider-2.jpg";
import slider3 from "../assets/img/slider-3.jpg";

var currentSlideId = 1;



function SliderComponent () {

    useEffect(() => {
        showSlide();
      }, []);
    
      const prev = () => {
        currentSlideId = currentSlideId === 1 ? 3 : currentSlideId - 1;
        showSlide();
      };
    
      const next = () => {
        currentSlideId = currentSlideId === 3 ? 1 : currentSlideId + 1;
        showSlide();
      };
    
      const showSlide = () => {
        const slides = document.getElementById('slider').getElementsByTagName('li');
        for (let i = 0; i < slides.length; i++) {
          const element = slides[i];
          if (currentSlideId === i + 1) {
            element.classList.remove('hidden');
          } else {
            element.classList.add('hidden');
          }
        }
      };
  
       // Actualiza esto con el número total de slides
    return (
       
        <div className="relative">
           <ul id="slider" className="">
                <li className="h-[50vh] relative ">
                    <img className="h-full object-cover w-full" src={slider2} alt="" />
                    <div className="absolute top-0 left-0 h-full w-full flex">
                        <h2 className="text-4xl font-bold text-white my-auto w-full text-center p-20">La mejor tecnología al alcance de tus manos </h2>
                    </div>
                </li>    
                <li className="h-[50vh] relative hidden">
                    <img className="h-full object-cover w-full" src={slider3} alt="" />
                    <div className="absolute top-0 left-0 h-full w-full flex">
                        <h2 className="text-4xl font-bold text-white my-auto w-full text-center p-20">La mejor tecnología al alcance de tus manos </h2>
                    </div>
                </li>    
                <li className="h-[50vh] relative hidden">
                    <img className="h-full object-cover w-full" src={slider1} alt="" />
                    <div className="absolute top-0 left-0 h-full w-full flex">
                        <h2 className="text-4xl font-bold text-white my-auto w-full text-center p-20">La mejor tecnología al alcance de tus manos </h2>
                    </div>
                </li>    
            </ul>   
            
            <div className="absolute px-5 flex h-full w-full top-0 left-0 ">
                <div className="my-auto  w-full flex justify-between">
                    <button onClick={prev} className="bg-white p-3 rounded-full bg-opacity-80 shadow-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
                        </svg>
                    </button>
                    <button onClick={next} className="bg-white p-3 rounded-full bg-opacity-80 shadow-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                        </svg>
                    </button>
                </div>


            </div>
            
        </div>
     
        
    )
}

export default SliderComponent