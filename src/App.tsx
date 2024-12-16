import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "./components/Navbar";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const containerBoxes = useRef(null);
  const video = useRef<HTMLElement>(null);
  const showVideoMouse = useRef(null);
  const widthRow = Math.ceil(innerWidth) / 100;
  const heightCol = Math.ceil(innerHeight) / 100;

  useGSAP(() => {
    const tl = gsap.timeline({ repeat: -1, yoyo: true, delay: 0.8 });
    gsap.to(".box", {
      scrollTrigger: {
        trigger: ".box",
        start: "50% 90%",
      },
      stagger: {
        each: 0.02,
        from: "start",
      },
      ease: "power3.in",
      y: 10,
      opacity: 0,
      scale: 0,
    });

    const videoElement = video.current;
    const mouseElement = showVideoMouse.current;

    const handleMouseEnter = () => {
      tl.to(mouseElement, {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: "power3.out",
      });
      tl.to(mouseElement, {
        opacity: 0.7,

        duration: 0.3,
        ease: "power3.out",
      });
    };

    const handleMouseMove = (e:MouseEvent) => {
      const rect = videoElement?.getBoundingClientRect();
      gsap.to(mouseElement, {
        top: e.clientY - rect!.top - 50,
        left: e.clientX - rect!.left - 50,
        duration: 0.2, // Short duration for smooth following
        ease: "none",
      });
    };

    const handleMouseActive = () => {
      gsap.to(mouseElement, {
        scale: 2,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(mouseElement, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power3.in",
      });
    };

    videoElement?.addEventListener("mouseenter", handleMouseEnter);
    videoElement?.addEventListener("mousemove", handleMouseMove);
    videoElement?.addEventListener("mouseleave", handleMouseLeave);
    videoElement?.addEventListener("click", handleMouseActive);

    gsap.from(video.current, {
      duration: 1,
      opacity: 0,
      y: 100,
      scrollTrigger: {
        scrub: true,
        trigger: ".box",
        start: "50% 90%",
      },
    });
  });
  return (
    <div className=" overflow-hidden">
      <Navbar />
      <main className="min-h-screen w-full  bg-gradient-to-b from-pink-400 to-pink-300 overflow-x-hidden">
        <section className="h-screen flex items-center justify-center">
          page1
        </section>
        <section
          ref={video}
          className="h-screen  w-screen cursor-none  overflow-hidden relative"
        >
          <div
            ref={showVideoMouse}
            className="fixed  bg-gradient-to-tl scale-0 opacity-0 from-pink-400 to-pink-300 size-14 rounded-full font-mono text-[12px]  shadow-lg shadow-pink-500 flex items-center justify-center scale-y-75"
          >
            VISIT
          </div>
          <div>
            <div
              ref={containerBoxes}
              className="absolute top-1 gap-2 z-20 flex  justify-center items-center  flex-wrap"
            >
              {Array.from({ length: 112 }, (_, index) => (
                <div
                  key={index}
                  className="box bg-pink-300 opacity-75 blur-lg rounded-md shadow-2xl shadow-black  size-20"
                ></div>
              ))}
            </div>
            <video className="w-full h-full object-cover" loop autoPlay muted>
              <source src="/videos/video.mp4" type="video/mp4" />
            </video>
          </div>
        </section>
        <section className="h-screen flex items-center justify-center">
          page3
        </section>
      </main>
    </div>
  );
}

export default App;
