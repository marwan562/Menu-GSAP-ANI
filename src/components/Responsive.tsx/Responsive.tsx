import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";
import { ArrowUpRight } from "react-feather";

type TStagger = "start" | "center" | "end" | "edges" | "random";

const staggerPositions: TStagger[] = [
  "start",
  "random",
  "edges",
  "center",
  "end",
];

const GradientArrow = () => (
  <svg
    className=" size-10  text-green-400/90"
    viewBox="0 0 25 25"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient x1="50%" y1="92.034%" x2="50%" y2="7.2%" id="a">
        <stop offset="0%" stopColor="currentColor" />
        <stop offset="100%" stopOpacity="0" stopColor="white" />
      </linearGradient>
    </defs>
    <ArrowUpRight />
  </svg>
);

const Responsive = () => {
  const container = useRef(null);
  const [selectPosition, setSelectPosition] = useState(staggerPositions[0]);
  const tl = gsap.timeline();

  useGSAP(
    () => {
      tl.from(".content", {
        y: 40,
        opacity: 0,
        scale: 0.8,
        duration: 1,
        stagger: {
          each: 0.2,
          from: selectPosition,
        },
        ease: "back.out",
      }).from(".svg", {
        y: 10,
        opacity: 0,
        scale: 0.5,
        stagger: {
          each: 0.1,
          from: "start",
        },
        ease: "back.out",
      });
    },
    { scope: container, revertOnUpdate: true, dependencies: [selectPosition] }
  );
  return (
    <div
      ref={container}
      className="h-screen w-full flex flex-col items-center justify-center space-y-4"
    >
      <div className=" space-x-2">
        {staggerPositions.map((el, i) => (
          <button
            key={i}
            onClick={() => setSelectPosition(el)}
            className={`bg-gradient-to-tr  hover:translate-y-[-2px] hover:text-black transition-all duration-100 text-white font-mono rounded-md ${
              selectPosition === el
                ? "from-black  via-gray-500 to-blue-400 p-1"
                : " bg-gradient-to-tr from-cyan-500 via-yellow-500 to-green-400 p-1"
            } `}
          >
            {el}
          </button>
        ))}
      </div>
      <div className="flex max-w-fit cursor-pointer group text-transparent bg-clip-text flex-row text-4xl justify-center font-mono uppercase items-center bg-gradient-to-r from-cyan-500 via-yellow-500 to-green-400">
        {"INSPIRE_WEB".split("").map((el, i) => (
          <span
            key={i}
            className="content shadow-2xl shadow-slate-600 group-hover:underline"
          >
            {el}
          </span>
        ))}
        <span className="svg">
          <GradientArrow />
        </span>
      </div>
    </div>
  );
};
export default Responsive;
