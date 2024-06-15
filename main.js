import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

// Function to split text and animate
const animateText = () => {
 const splitTypes = document.querySelectorAll(".reveal-type");
 splitTypes.forEach((char) => {
  const bg = char.dataset.bgColor;
  const fg = char.dataset.fgColor;

  // Split the text into words
  const text = new SplitType(char, { types: "words" });

  // Animate words
  gsap.fromTo(
   text.words,
   {
    color: bg,
   },
   {
    color: fg,
    duration: 0.3,
    stagger: 0.1,
    scrollTrigger: {
     trigger: char,
     start: "top 80%",
     end: "top 20%",
     scrub: true,
     markers: false,
     toggleActions: "play play reverse reverse",
    },
   }
  );
 });
};

// Function to create a spring-like effect with continuous rotation for background images
const springRotateBackgroundImages = () => {
 const backgroundImages = document.querySelectorAll(".background-image");

 backgroundImages.forEach((img, index) => {
  gsap.fromTo(
   img,
   {
    y: -50,
   },
   {
    y: 1,
    ease: "elastic.in(1, .3)",
    duration: 1,
    scrollTrigger: {
     trigger: img.parentElement,
     start: "top bottom",
     end: "bottom top",
     scrub: true,
     markers: false,
    },
   }
  );
 });
};

// Function to move the span from left to right across the background image
const moveSpan = () => {
 const movingSpans = document.querySelectorAll(".moving-span");

 movingSpans.forEach((span) => {
  gsap.fromTo(
   span,
   {
    x: "-100%",
   },
   {
    x: "150%",
    duration: 1,
    delay: 1,
    ease: "circ.in",
    scrollTrigger: {
     trigger: span.parentElement,
     start: "top bottom",
     end: "bottom top",
     scrub: true,
     markers: false,
    },
   }
  );
 });
};

// Initialize Lenis and start animation frame
const lenis = new Lenis();
lenis.on("scroll", () => {
 gsap.updateRoot();
});

function raf(time) {
 lenis.raf(time);
 requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Call the functions to animate text, create spring effect with rotation for background images, and move the span across the background image
animateText();
springRotateBackgroundImages();
moveSpan();
