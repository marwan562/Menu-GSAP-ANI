import { useRef, useState } from "react";
import gsap from "gsap";
import { Eclipse, MenuIcon, Play, Scan, SquareX } from "lucide-react";
import { useGSAP } from "@gsap/react";

const Navbar = () => {
  const menuRef = useRef(null);
  const backgroundMenu = useRef(null);
  const videoRef = useRef<HTMLElement>(null);
  const showVideoMouse = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      const videoElement = videoRef.current;
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

      const handleMouseMove = (e: MouseEvent) => {
        const rect = videoElement?.getBoundingClientRect();
        gsap.to(mouseElement, {
          top: e.clientY - rect!.top - 10,
          left: e.clientX - rect!.left - 10,
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

      if (isMenuOpen) {
        gsap
          .timeline()
          .from(".video", {
            delay: 0.4,
            x: -60,
            duration: 0.4,
            opacity: 0,
          })
          .from(".controls", {
            y: 20,
            stagger: {
              each: 0.4,
              from: "start",
              amount: 2.5,
            },
            duration: 0.8,
            opacity: 0,
          });

        gsap.from(".content-menu", {
          x: 40,
          stagger: {
            each: 0.3,
          },
          duration: 1,
          scale: 0,
          opacity: 0,
          ease: "power1.in",
        });
        // GSAP animation for opening the menu
        gsap.to(menuRef.current, {
          y: "0%",
          opacity: 1,
          duration: 0.5,
          ease: "power4.out",
        });

        // GSAP animation for background squares
        gsap.to(".square", {
          opacity: 1,
          scale: 1,
          stagger: {
            each: 0.01,
            from: "random",
          },
          duration: 0.1,
          ease: "power3.in",
        });
      } else {
        // GSAP animation for closing the menu
        gsap.to(menuRef.current, {
          delay: 1,
          y: "-100%",
          opacity: 0,
          duration: 0.5,
          ease: "power4.in",
        });

        // GSAP animation to reset background squares
        gsap.to(".square", {
          opacity: 0,
          scale: 0.5,
          stagger: {
            amount: 1,
            from: "random",
          },
          duration: 0.4,
          ease: "power1.inOut",
        });
      }
    },
    { dependencies: [isMenuOpen] }
  );

  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <>
      {/* Navbar */}
      <div className="fixed font-mono uppercase px-4 py-5 text-lg z-50 w-1/2 mx-auto left-1/4">
        <div className="absolute inset-0 rounded-full bg-gradient-to-l from-pink-400 to-pink-400 blur-md via-pink-200 -z-10"></div>
        <div className="flex justify-around">
          <h2>
            <Eclipse />
          </h2>
          <button
            onClick={handleMenuToggle}
            className="cursor-pointer focus:outline-none"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            <MenuIcon />
          </button>
        </div>
      </div>

      {/* Menu */}
      <div
        ref={menuRef}
        className="fixed font-semibold text-2xl rounded-b-3xl h-[75%] md:h-[65%] overflow-hidden w-full z-[100] px-10 py-10 grid  md:grid-cols-[4fr_3fr] opacity-0 translate-y-[-100%]"
      >
        {/* Close Button */}
        <div
          onClick={handleMenuToggle}
          className="absolute right-8 top-6 cursor-pointer"
          aria-label="Close menu"
        >
          <SquareX />
        </div>

        {/* Animated Background */}
        <div
          ref={backgroundMenu}
          className="absolute flex z-[-100] justify-center items-center flex-wrap"
        >
          {Array(380)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="square bg-pink-100 hover:bg-pink-400   size-10 rounded-sm opacity-0 scale-0"
              ></div>
            ))}
        </div>

        {/* Video Section */}
        <div
          ref={videoRef as React.RefObject<HTMLDivElement>}
          className="   space-y-2   md:w-1/2"
        >
          <div
            ref={showVideoMouse}
            className="fixed opacity-0 scale-0  z-[1000] bg-gradient-to-tl  from-pink-400 to-pink-300 size-14 rounded-full font-mono text-[12px]  shadow-lg shadow-pink-500 flex items-center justify-center scale-y-75"
          >
            VISIT
          </div>
          <h2 className="controls font-mono flex  items-center gap-2 ">
            <Eclipse size={30} />
            <div className="controls h-[.20rem] w-full bg-black"></div>
            <span className=" text-sm  shrink-0">INSPIRE WEB</span>
          </h2>
          <video
            className="video cursor-pointer  rounded-md aspect-auto object-cover"
            loop
            autoPlay
            muted
          >
            <source src="/videos/video.mp4" type="video/mp4" />
          </video>
          <div className=" flex justify-between items-center gap-2">
            <h2 className="controls">
              <Play size={20} />
            </h2>
            <div className="controls h-[.20rem] w-full bg-black"></div>
            <span className="controls text-sm">1:16</span>
            <h2 className="controls">
              <Scan size={20} />
            </h2>
          </div>
        </div>

        {/* Menu Links */}
        <div>
          <ul className="space-y-6">
            <li className="content-menu">HOME</li>
            <li className="content-menu">ABOUT</li>
            <li className="content-menu">CONTACT US</li>
            <li className="content-menu"> HAMADA</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
