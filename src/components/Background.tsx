import { useEffect, useRef } from "react";

// Animated background: a grid of short line segments that each rotate to point
// toward the cursor (a vector-field / iron-filings effect). Rendered on a single
// canvas for performance, sits behind all content, and ignores pointer events.
function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasEl = canvasRef.current;
    if (!canvasEl) return;
    const context = canvasEl.getContext("2d");
    if (!context) return;
    // Non-null aliases so TypeScript keeps the narrowing inside the closures.
    const canvas = canvasEl;
    const ctx = context;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    // Touch / no-hover devices (phones, tablets): render the field once and
    // skip the continuous animation loop to save battery, with a sparser grid
    // for performance. There's no cursor to follow on these devices anyway.
    const coarse = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    const isStatic = reduced || coarse;

    const SPACING = coarse ? 64 : 42; // gap between line centers (px)
    const HALF = 7; // half-length of each line (px)
    const GLOW_RADIUS = 320; // px within which lines brighten toward the cursor

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let points: { x: number; y: number }[] = [];
    let angles = new Float32Array(0);
    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let raf = 0;

    // (Re)build the grid for the current viewport size.
    function build() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const cols = Math.ceil(width / SPACING) + 1;
      const rows = Math.ceil(height / SPACING) + 1;
      points = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          points.push({
            x: c * SPACING + SPACING / 2,
            y: r * SPACING + SPACING / 2,
          });
        }
      }
      angles = new Float32Array(points.length);
      for (let i = 0; i < points.length; i++) {
        angles[i] = Math.atan2(target.y - points[i].y, target.x - points[i].x);
      }
    }

    // Draw one line at a point, oriented at `angle`, brightened near the cursor.
    function drawLine(x: number, y: number, angle: number) {
      const dx = Math.cos(angle) * HALF;
      const dy = Math.sin(angle) * HALF;
      const dist = Math.hypot(target.x - x, target.y - y);
      const glow = Math.max(0, 1 - dist / GLOW_RADIUS);
      const alpha = 0.16 + glow * 0.5;
      ctx.strokeStyle = `rgba(192, 132, 252, ${alpha})`;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(x - dx, y - dy);
      ctx.lineTo(x + dx, y + dy);
      ctx.stroke();
    }

    // Animation loop: ease each line toward the angle pointing at the cursor.
    function frame() {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        const desired = Math.atan2(target.y - p.y, target.x - p.x);
        // Shortest-path angular easing (handles the -pi/pi wraparound).
        const diff = Math.atan2(
          Math.sin(desired - angles[i]),
          Math.cos(desired - angles[i])
        );
        angles[i] += diff * 0.12;
        drawLine(p.x, p.y, angles[i]);
      }
      raf = requestAnimationFrame(frame);
    }

    // Static render (no animation) for reduced-motion users.
    function drawStatic() {
      ctx.clearRect(0, 0, width, height);
      for (const p of points) {
        drawLine(p.x, p.y, Math.atan2(target.y - p.y, target.x - p.x));
      }
    }

    function onMove(e: PointerEvent) {
      target.x = e.clientX;
      target.y = e.clientY;
    }
    function onResize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      build();
      if (isStatic) drawStatic();
    }

    build();
    window.addEventListener("resize", onResize);
    if (isStatic) {
      drawStatic();
    } else {
      window.addEventListener("pointermove", onMove);
      raf = requestAnimationFrame(frame);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="bg-lines" aria-hidden="true" />;
}

export default Background;
