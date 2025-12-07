// Circle.jsx
import React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Circle = () => {
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".circle-wrapper",
        start: "top 80%",
        end: "top 10%",
        scrub: true,
        markers: true,
      },
    });

    // LEFT CIRCLE → top se center
    tl.to(".circle-left", {
      attr: { cy: "50%", r: 450 }, // start me 0% se aa rahi hogi
      ease: "none",
    });

    // RIGHT CIRCLE → bottom se center
    tl.to(
      ".circle-right",
      {
        attr: { cy: "50%", r: 450 }, // start me 100% se aa rahi hogi
        ease: "none",
      },
      "<" // parallel
    );
  });

  return (
    <div>
      {/* Just for scroll space */}
      <div className="h-screen w-full"></div>

      <div className="circle-wrapper h-screen w-full flex items-center justify-center bg-black">
        <div className="svg-wrapper h-[60%] w-[80%]">
          <svg className="h-full w-full">
            <defs>
              {/* Filter same as pehle */}
              <filter id="circle-filter">
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.3"
                  numOctaves="2"
                  result="NOISE"
                />
                <feDisplacementMap
                  in="SourceGraphic"
                  in2="NOISE"
                  scale="350"
                  xChannelSelector="R"
                  yChannelSelector="G"
                />
              </filter>

              {/* LEFT MASK - circle top se aayega */}
              <mask id="circle-mask-left">
                <circle
                  cx="25%" // x fixed, sirf vertical move karega
                  cy="0%" // 👈 start top outside
                  r="0"
                  fill="white"
                  className="circle-left"
                  filter="url(#circle-filter)"
                />
              </mask>

              {/* RIGHT MASK - circle bottom se aayega */}
              <mask id="circle-mask-right">
                <circle
                  cx="75%" // right half center
                  cy="100%" // 👈 start bottom outside
                  r="0"
                  fill="white"
                  className="circle-right"
                  filter="url(#circle-filter)"
                />
              </mask>
            </defs>

            {/* LEFT IMAGE */}
            <image
              x="0%"
              height="100%"
              width="50%"
              href="https://cdn.pixabay.com/photo/2022/12/01/04/40/backpacker-7628303_1280.jpg"
              preserveAspectRatio="xMidYMid slice"
              mask="url(#circle-mask-left)"
            />

            {/* RIGHT IMAGE */}
            <image
              x="50%"
              height="100%"
              width="50%"
              href="https://cdn.pixabay.com/photo/2016/11/29/04/17/adventure-1868816_1280.jpg"
              preserveAspectRatio="xMidYMid slice"
              mask="url(#circle-mask-right)"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Circle;
