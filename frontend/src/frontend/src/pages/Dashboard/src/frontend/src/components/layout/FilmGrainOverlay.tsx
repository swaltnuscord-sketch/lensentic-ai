import { useEffect, useRef } from "react";

export function FilmGrainOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrameId: number;

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function drawGrain() {
      if (!canvas || !ctx) return;
      const w = canvas.width;
      const h = canvas.height;
      const imageData = ctx.createImageData(w, h);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const noise = (Math.random() * 2 - 1) * 25;
        data[i] = 128 + noise;
        data[i + 1] = 128 + noise;
        data[i + 2] = 128 + noise;
        data[i + 3] = 16;
      }
      ctx.putImageData(imageData, 0, 0);
    }

    function animate() {
      drawGrain();
      animFrameId = requestAnimationFrame(animate);
    }

    resize();
    animate();

    const handleResize = () => resize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animFrameId);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-[9999] pointer-events-none"
        style={{ mixBlendMode: "overlay", opacity: 0.055 }}
      />
      <div
        aria-hidden="true"
        className="fixed inset-0 z-[9998] pointer-events-none animate-[vignette-pulse_6s_ease-in-out_infinite]"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, oklch(0 0 0 / 0.65) 100%)",
        }}
      />
    </>
  );
}
