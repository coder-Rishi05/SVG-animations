import React from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

const Basic = () => {
  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    gsap.to(".displacement", {
      r: 450,
      //   r: 500,
      scrollTrigger: {
        trigger: ".wrapper",
        start: "top 20%",
        end: "top 0%",
        scrub: true,
        markers: true,
      },
    });
  });
  return (
    <div>
      <>
        <div className="scrolldiv h-screen w-full"></div>

        <div className="wrapper h-screen w-full flex items-center justify-center ">
          <div className="svg-wrapper h-[50%] w-[80%] ">
            <svg className="h-full w-full cursor-pointer flex items-center justify-center gap-6 bg-red-500  ">
              <defs>
                <filter id="myfilter">
                  <feTurbulence
                    type="fractalNoise"
                    // baseFrequency="0.15"
                    baseFrequency="0.3"
                    numOctaves="2"
                    result="NOISE"
                  />
                  <feDisplacementMap
                    in="SourceGraphic"
                    in2="NOISE"
                    // scale="250"
                    scale="350"
                    xChannelSelector="R"
                    yChannelSelector="G"
                  />
                </filter>
                <mask id="mask">
                  <circle
                    // cx="50%"
                    cx="0%" // animation from left to right
                    cy="50%"
                    // cx="80%" // for right to left movement
                    r="0"
                    fill="white"
                    className="displacement"
                    filter="url(#myfilter)"
                  />
                </mask>
              </defs>
              <image
                height="100%"
                width="50%"
                className="object-cover object-center"
                mask="url(#mask)"
                href="https://cdn.pixabay.com/photo/2022/12/01/04/40/backpacker-7628303_1280.jpg"
              ></image>
              <image
                height="100%"
                width="50%"
                className="object-cover object-center"
                mask="url(#mask)"
                href="https://cdn.pixabay.com/photo/2022/12/01/04/40/backpacker-7628303_1280.jpg"
              ></image>
            </svg>
          </div>
        </div>
      </>
    </div>
  );
};

export default Basic;
