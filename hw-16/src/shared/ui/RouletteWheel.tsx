import React, { useEffect, useRef } from 'react';

interface RouletteWheelProps {
  items: string[];
  isSpinning: boolean;
  onSpinComplete: (selectedIndex: number) => void;
}

export const RouletteWheel: React.FC<RouletteWheelProps> = ({
  items,
  isSpinning,
  onSpinComplete,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const angleRef = useRef(0);
  const speedRef = useRef(0);
  const isSpinningRef = useRef(false);

  const colors = [
    '#a855f7',
    '#ec4899',
    '#06b6d4',
    '#10b981',
    '#f59e0b',
    '#3b82f6',
  ];

  const drawWheel = (ctx: CanvasRenderingContext2D, size: number) => {
    const center = size / 2;
    const radius = center - 10;
    const numSegments = items.length;
    const segmentAngle = (2 * Math.PI) / numSegments;

    ctx.clearRect(0, 0, size, size);

    if (numSegments === 0) {
      ctx.beginPath();
      ctx.arc(center, center, radius, 0, 2 * Math.PI);
      ctx.fillStyle = '#1e1b4b';
      ctx.fill();
      ctx.lineWidth = 4;
      ctx.strokeStyle = '#a855f7';
      ctx.stroke();

      ctx.fillStyle = '#94a3b8';
      ctx.font = 'bold 16px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Налаштуйте фільтри та запустіть!', center, center);
      return;
    }

    ctx.save();
    ctx.translate(center, center);
    ctx.rotate(angleRef.current);

    for (let i = 0; i < numSegments; i++) {
      const startAngle = i * segmentAngle;
      const endAngle = startAngle + segmentAngle;

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, radius, startAngle, endAngle);
      ctx.closePath();

      ctx.fillStyle = colors[i % colors.length];
      ctx.fill();

      ctx.lineWidth = 1.5;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.stroke();
    }

    for (let i = 0; i < numSegments; i++) {
      const startAngle = i * segmentAngle;
      ctx.save();

      ctx.rotate(startAngle + segmentAngle / 2);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 12px Outfit, Inter, sans-serif';
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';

      let text = items[i];
      if (text.length > 20) {
        text = text.substring(0, 18) + '...';
      }

      ctx.fillText(text, radius - 20, 0);
      ctx.restore();
    }

    ctx.restore();

    ctx.beginPath();
    ctx.arc(center, center, radius, 0, 2 * Math.PI);
    ctx.lineWidth = 8;
    ctx.strokeStyle = '#1e152a';
    ctx.stroke();

    for (let i = 0; i < 24; i++) {
      const ledAngle = (i * 2 * Math.PI) / 24;
      const ledX = center + (radius + 2) * Math.cos(ledAngle);
      const ledY = center + (radius + 2) * Math.sin(ledAngle);
      ctx.beginPath();
      ctx.arc(ledX, ledY, 3, 0, 2 * Math.PI);
      ctx.fillStyle = i % 2 === 0 ? '#a855f7' : '#ec4899';
      ctx.fill();
    }

    ctx.beginPath();
    ctx.arc(center, center, 24, 0, 2 * Math.PI);
    ctx.fillStyle = '#0f172a';
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#06b6d4';
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(center - 15, center - radius - 15);
    ctx.lineTo(center + 15, center - radius - 15);
    ctx.lineTo(center, center - radius + 15);
    ctx.closePath();
    ctx.fillStyle = '#06b6d4';
    ctx.shadowColor = '#06b6d4';
    ctx.shadowBlur = 15;
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#ffffff';
    ctx.stroke();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const size = canvas.width;

    const animate = () => {
      if (isSpinningRef.current) {
        angleRef.current += speedRef.current;
        speedRef.current *= 0.982;

        if (speedRef.current < 0.002) {
          isSpinningRef.current = false;
          speedRef.current = 0;

          const numSegments = items.length;
          const segmentAngle = (2 * Math.PI) / numSegments;

          let normalizedAngle = ((3 * Math.PI) / 2 - angleRef.current) % (2 * Math.PI);
          if (normalizedAngle < 0) {
            normalizedAngle += 2 * Math.PI;
          }

          const winningIndex = Math.floor(normalizedAngle / segmentAngle) % numSegments;
          onSpinComplete(winningIndex);
        }
      }

      drawWheel(ctx, size);
      animationFrameId = requestAnimationFrame(animate);
    };

    drawWheel(ctx, size);
    animate();

    return () => cancelAnimationFrame(animationFrameId);
  }, [items, onSpinComplete]);

  useEffect(() => {
    if (isSpinning && !isSpinningRef.current && items.length > 0) {
      isSpinningRef.current = true;
      speedRef.current = 0.4 + Math.random() * 0.2;
    }
  }, [isSpinning, items]);

  return (
    <div className="relative flex justify-center items-center p-4 bg-card/40 backdrop-blur-md border border-border/40 rounded-3xl shadow-2xl">
      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        className="w-full max-w-[360px] aspect-square rounded-full transition-all duration-300"
      />
    </div>
  );
};