import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

import { useRef } from "react";
import Responsive from "./components/Responsive.tsx/Responsive";

// const Nested = () => {
//   const container = useRef(null);

//   useGSAP(
//     () => {
//       gsap.to(".box", {
//         rotate: 360,
//         duration: 3,
//         yoyo: true,
//         repeat: -1,
//         ease: "back.out",
//       });
//     },
//     { scope: container }
//   );

//   return (
//     <div
//       ref={container}
//       className=" p-6 border border-white rounded-md space-y-5"
//     >
//       <h2 className=" text-white underline text-center mb-2">
//         Child-Component
//       </h2>
//       <div className="box bg-gradient  ">Selector</div>
//       <div className="circle bg-circle">Ref</div>
//     </div>
//   );
// };

const App = () => {
  // media query sizes page
  // const { media: isMobile } = window.matchMedia("(min-width: 501px)");
  // const { media: isDesktop } = window.matchMedia("(max-width: 499px)");

  // const container = useRef(null);
  // const mm = gsap.matchMedia();

  // useGSAP(
  //   () => {
  //     mm.add(
  //       {
  //         isMobile,
  //         isDesktop,
  //       },
  //       (context) => {
  //         let { isDesktop } = context.conditions;
  //         const tl = gsap.timeline({
  //           scrollTrigger: {
  //             trigger: ".scroll",
  //             start: isDesktop ? "top top" : "center bottom",
  //             end: isDesktop ? "bottom center" : "center 29%",
  //             markers: true,
  //             scrub: 5,
  //           },
  //         });

  //         tl.from(".right", {
  //           opacity: 0,
  //           ease: "power3.in",
  //           y: isDesktop ? -50 : -500,
  //           translateX: isDesktop ? -50 : -400,
  //           scale: isDesktop ? 1.5 : 1,
  //           stagger: {
  //             each: 0.2,
  //             from: "start",
  //           },
  //         })
  //           .from(".left", {
  //             opacity: 0,
  //             y: -500,
  //             ease: "power3.in",
  //             translateX: isDesktop ? 50 : 400,
  //             stagger: {
  //               each: 0.2,
  //               from: "start",
  //             },
  //             scale: isDesktop ? 1.5 : 1,
  //           })
  //           .to(".right", {
  //             rotate: 360,
  //             y: -20,
  //             scale: 1.2,
  //             stagger: {
  //               each: 0.1,
  //               ease: "back.out",
  //             },
  //           })
  //           .to(".left", {
  //             rotate: 360,
  //             y: -20,
  //             scale: 1.2,
  //             stagger: {
  //               each: 0.1,
  //               ease: "back.out",
  //             },
  //           });
  //       }
  //     );

  //     return () => {
  //       mm.revert();
  //     };
  //   },
  //   { scope: container }
  // );

  return (
    <Responsive/>
    // <div
    //   ref={container}
    //   className=" w-full min-h-screen overflow-hidden  bg-black flex flex-col justify-around items-center"
    // >
    //   {/* <Nested />
    //   <div className="box bg-gradient ">Selector</div>
    //   <div className="bg-circle">Ref No Leaking</div> */}
    //   <div
    //     // onClick={startClick}
    //     className="bg-cyan-300 px-2 py-1 rounded-md  font-semibold cursor-pointer"
    //   >
    //     Start Circles
    //   </div>
    //   <div className="h-[200vh] scroll flex flex-col  md:flex-row justify-around  items-center gap-2">
    //     {Array(6)
    //       .fill(0)
    //       .map((_, i) => (
    //         <div
    //           key={i}
    //           className={`circle ${i > 2 ? "left" : "right"} bg-circle`}
    //         >
    //           {++i}
    //         </div>
    //       ))}
    //   </div>
    // </div>
  );
};

export default App;
