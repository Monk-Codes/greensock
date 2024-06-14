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

// Call the function to animate text
animateText();
