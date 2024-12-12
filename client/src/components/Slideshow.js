import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/slide.css"

const Slideshow = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = [
        { src: "/assets/slide1.jpg", alt: "interior1" },
        { src: "/assets/slide2.jpg", alt: "interior2" },
        { src: "/assets/slide3.jpg", alt: "interior3" },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 2000); // Change every 2 seconds
        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [slides.length]);

    return (
        <div id="slideShow" className ="">
            {slides.map((slide, index) => (
                <div className="">
                <div className=""
                    key={index}
                    style={{
                        display: index === currentSlide ? "block" : "none",
                    }}
                >
                    <img className="rounded mx-auto d-block"  src={slide.src} alt={slide.alt} style={{ width: "100%" }} />
                    
                </div>
                </div>
            ))}
        </div>
    );
};

export default Slideshow;
