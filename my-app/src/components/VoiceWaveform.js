import React, { useEffect, useRef } from 'react';
import './VoiceWaveform.css';

const VoiceWaveform = () => {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext('2d');
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let t0 = performance.now();

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawFrame = (now) => {
      const t = (now - t0) / 1000;
      ctx.clearRect(0, 0, width, height);

      const mid = height * 0.52;
      const amp = height * 0.28;

      // soft baseline
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(230, 195, 92, 0.18)';
      ctx.lineWidth = 1;
      ctx.moveTo(0, mid);
      ctx.lineTo(width, mid);
      ctx.stroke();

      const layers = [
        { color: 'rgba(230, 195, 92, 0.22)', width: 1.25, scale: 0.55, speed: 0.7 },
        { color: 'rgba(230, 195, 92, 0.45)', width: 1.6, scale: 0.85, speed: 1.05 },
        { color: 'rgba(242, 234, 216, 0.55)', width: 1.35, scale: 1, speed: 1.35 },
      ];

      layers.forEach((layer, li) => {
        ctx.beginPath();
        ctx.lineWidth = layer.width;
        ctx.strokeStyle = layer.color;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';

        const steps = Math.max(80, Math.floor(width / 3));
        for (let i = 0; i <= steps; i += 1) {
          const x = (i / steps) * width;
          const nx = x / width;
          const envelope =
            Math.sin(Math.PI * nx) ** 1.35 * (0.55 + 0.45 * Math.sin(t * 0.9 + li));
          const y =
            mid +
            amp *
              layer.scale *
              envelope *
              (0.55 * Math.sin(nx * Math.PI * 6 + t * layer.speed * 2.2) +
                0.28 * Math.sin(nx * Math.PI * 13 - t * layer.speed * 3.1 + li) +
                0.17 * Math.sin(nx * Math.PI * 27 + t * layer.speed * 4.4));
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      });

      // sparse vertical ticks — oscilloscope feel
      ctx.strokeStyle = 'rgba(230, 195, 92, 0.12)';
      ctx.lineWidth = 1;
      const tickEvery = Math.max(48, Math.floor(width / 12));
      for (let x = tickEvery; x < width; x += tickEvery) {
        ctx.beginPath();
        ctx.moveTo(x, mid - amp * 0.85);
        ctx.lineTo(x, mid + amp * 0.85);
        ctx.stroke();
      }
    };

    resize();
    drawFrame(performance.now());

    if (reduceMotion) {
      window.addEventListener('resize', resize);
      return () => window.removeEventListener('resize', resize);
    }

    const loop = (now) => {
      drawFrame(now);
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="voice-wave" aria-hidden="true">
      <canvas ref={canvasRef} className="voice-wave__canvas" />
    </div>
  );
};

export default VoiceWaveform;
