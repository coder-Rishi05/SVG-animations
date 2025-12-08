// Triangle.jsx
import React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Triangle = () => {
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".triangle-wrapper",
        start: "top 30%",
        end: "top 10%",
        scrub: true,
        markers: true,
      },
    });

    // LEFT TRIANGLE: narrow → wide (reveal left image)
    tl.to(".tri-left", {
      attr: {
        // x% y% points
        points: "0,0 50,50 0,100", // bigger triangle across left half
      },
      ease: "none",
    });

    // RIGHT TRIANGLE: narrow → wide (reveal right image)
    tl.to(
      ".tri-right",
      {
        attr: {
          points: "100,0 50,50 100,100",
        },
        ease: "none",
      },
      "<"
    );
  });

  return (
    <div>
      <div className="h-screen w-full"></div>

      <div className="triangle-wrapper h-screen w-full flex items-center justify-center bg-slate-900">
        <div className="svg-wrapper h-[60%] w-[80%]">
          <svg
            className="h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <filter id="tri-filter">
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.10"
                  numOctaves="5"
                  result="NOISE"
                />
                <feDisplacementMap
                  in="SourceGraphic"
                  in2="NOISE"
                  scale="200"
                  xChannelSelector="R"
                  yChannelSelector="G"
                />
              </filter>

              {/* LEFT TRIANGLE MASK */}
              <mask id="tri-mask-left">
                {/* start small at middle-left */}
                <polygon
                  className="tri-left"
                  fill="white"
                  filter="url(#tri-filter)"
                  points="0,50 0,50 0,50" // collapsed triangle
                />
              </mask>

              {/* RIGHT TRIANGLE MASK */}
              <mask id="tri-mask-right">
                {/* start small at middle-right */}
                <polygon
                  className="tri-right"
                  fill="white"
                  filter="url(#tri-filter)"
                  points="100,50 100,50 100,50" // collapsed triangle
                />
              </mask>
            </defs>

            {/* LEFT IMAGE – stretches to full, but masked by left triangle */}
            <image
              x="0"
              y="0"
              width="50"
              height="100"
              href="https://i.pinimg.com/1200x/33/22/b7/3322b76dd8d310b6bb04f295aae561af.jpg"
              preserveAspectRatio="xMidYMid slice"
              mask="url(#tri-mask-left)"
            />

            {/* RIGHT IMAGE */}
            <image
              x="50"
              y="0"
              width="50"
              height="100"
              href="https://i.pinimg.com/1200x/f3/dd/08/f3dd0857b6fd16047b8033b944b72afa.jpg"
              preserveAspectRatio="xMidYMid slice"
              mask="url(#tri-mask-right)"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Triangle;
