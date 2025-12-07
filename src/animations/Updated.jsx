import React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Updated = () => {
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".wrapper",
        start: "top 80%",
        end: "top 10%",
        scrub: true,
        markers: true,
      },
    });

    // LEFT CIRCLE → left se center
    tl.to(".displacement-left", {
      attr: { cx: "25%", r: 450 },
      ease: "none",
    });

    // RIGHT CIRCLE → right se center
    tl.to(
      ".displacement-right",
      {
        attr: { cx: "75%", r: 450 },
        ease: "none",
      },
      "<" // parallel with above
    );
  });

  return (
    <div>
      <div className="scrolldiv h-screen w-full"></div>

      <div className="wrapper h-screen w-full flex items-center justify-center bg-black">
        <div className="svg-wrapper h-[60%] w-[80%]">
          <svg className="h-full w-full">
            <defs>
              {/* Filter */}
              <filter id="myfilter">
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

              {/* LEFT MASK */}
              <mask id="mask-left">
                <circle
                  cx="0%" // 👈 start outside left
                  cy="50%"
                  r="0"
                  fill="white"
                  className="displacement-left"
                  filter="url(#myfilter)"
                />
              </mask>

              {/* RIGHT MASK */}
              <mask id="mask-right">
                <circle
                  cx="100%" // 👈 start outside right
                  cy="50%"
                  r="0"
                  fill="white"
                  className="displacement-right"
                  filter="url(#myfilter)"
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
              mask="url(#mask-left)"
            />

            {/* RIGHT IMAGE */}
            <image
              x="50%"
              height="100%"
              width="50%"
              href="https://cdn.pixabay.com/photo/2024/09/05/05/33/ai-generated-9023805_1280.jpg"
              preserveAspectRatio="xMidYMid slice"
              mask="url(#mask-right)"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Updated;
