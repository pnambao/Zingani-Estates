import React, { useState, useEffect } from "react";

const Slideshow = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = [
        { src: "/assets/placekitten.webp", alt: "A cat" },
        { src: "/assets/placebear-1280x720.webp", alt: "Bears" },
        { src: "/assets/bacon-mockup-1280x720.webp", alt: "Meat" },
        { src: "/assets/lorem-picsum-1280x720.webp", alt: "Place" },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 2000); // Change every 2 seconds
        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [slides.length]);

    return (
        <div id="slideShow">
            {slides.map((slide, index) => (
                <div
                    key={index}
                    style={{
                        display: index === currentSlide ? "block" : "none",
                    }}
                >
                    <img src={slide.src} alt={slide.alt} style={{ width: "100%" }} />
                </div>
            ))}
        </div>
    );
};

export default Slideshow;
