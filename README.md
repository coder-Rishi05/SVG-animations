# 📘 README — GSAP + SVG Mask + Displacement Animation Tutorial

Overview

This project demonstrates how to use GSAP and ScrollTrigger to animate an SVG circle mask with a displacement filter that reveals an image when the user scrolls.
The effect looks like a distorted circle growing as you scroll.

🧩 Project Breakdown
📂 File: App.jsx
🚀 GSAP Setup

<code>
gsap.registerPlugin(ScrollTrigger);
</code>

🎬 GSAP Animation

```js
useGSAP(() => {
  gsap.to(".displacement", {
    r: 500,
    scrollTrigger: {
      trigger: ".wrapper",
      start: "top 20%",
      end: "top 0%",
      scrub: true,
      markers: true,
    },
  });
});
```

You animate the radius (r) of the circle from whatever it starts at (0) to 500.

✔ ScrollTrigger options explained

```sql

| Option          | Meaning                                                                  |
| --------------- | ------------------------------------------------------------------------ |
| `trigger`       | The element that activates the animation.                                |
| `"top 20%"`     | Animation starts when the top of `.wrapper` reaches 20% of the viewport. |
| `"top 0%"`      | Animation ends when the top reaches 0%.                                  |
| `scrub: true`   | The animation is tied smoothly to scroll position.                       |
| `markers: true` | Shows visual markers to debug start/end.                                 |

```

🎨 HTML + SVG Breakdown

```html
<div className="wrapper">
  <div className="svg-wrapper">
    <svg>
      <defs></defs>
    </svg>
  </div>
</div>
```

A container for definitions used later—filters, masks, gradients, etc.
These don’t draw anything directly.

✔ <filter>

Defines a graphical effect that can distort images.

✔ <feTurbulence>

Creates random noise.

```sql

| Attribute              | Meaning                                             |
| ---------------------- | --------------------------------------------------- |
| `type="fractalNoise"`  | Smooth, organic noise.                              |
| `baseFrequency="0.15"` | Higher = more turbulence.                           |
| `numOctaves="2"`       | More layers = richer noise.                         |
| `result="NOISE"`       | Gives this noise a name so next filters can use it. |
| Attribute              | Meaning                                          |
| ---------------------- | ------------------------------------------------ |
| `in="SourceGraphic"`   | The shape/image to distort.                      |
| `in2="NOISE"`          | The turbulence effect.                           |
| `scale="350"`          | Strength of distortion.                          |
| `xChannelSelector="R"` | Use the red channel to move pixels horizontally. |
| `yChannelSelector="G"` | Use the green channel to move pixels vertically. |


```

### Displacement

```js
<feDisplacementMap
  in="SourceGraphic"
  in2="NOISE"
  scale="350"
  xChannelSelector="R"
  yChannelSelector="G"
/>
```

🎭 The Mask

<mask id="mask">
  <circle
    cx="110%"
    cy="50%"
    r="0"
    fill="white"
    className="displacement"
    filter="url(#myfilter)"
  />
</mask>

✔ How masks work

White areas are visible

Black areas are hidden

This circle begins with radius 0, and GSAP increases it as we scroll.

```sql
| Attribute                 | Meaning                                     |
| ------------------------- | ------------------------------------------- |
| `cx="110%"`               | Circle starts off-screen on the right.      |
| `cy="50%"`                | Center vertically.                          |
| `r="0"`                   | Starts invisible.                           |
| `fill="white"`            | Mask needs white to show the image.         |
| `filter="url(#myfilter)"` | Apply distortion effect to the circle edge. |


```

✔ How masks work

White areas are visible

Black areas are hidden

This circle begins with radius 0, and GSAP increases it as we scroll.

🖼 Applying Mask to Image

```jsx
<image mask="url(#mask)" href="your-image-url" className="h-full w-full" />
```
✔ What this does

The image is always there, but we only see the part covered by the growing, distorted circle.


🧱 Page Structure
<div className="scrolldiv h-screen"></div>


These “empty screens” create scroll space so the animation can play.