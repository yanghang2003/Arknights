import { motion } from 'framer-motion';
import ScrollHandler from '@/components/ScrollHandler';
import { useEffect, useRef, useState, useCallback } from 'react';

interface Point {
  x: number;
  y: number;
}

interface MousePosition {
  x: number | null;
  y: number | null;
}

export default function Operator({ transitionDirection }: { transitionDirection: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);
  const mousePosRef = useRef<MousePosition>({ x: null, y: null });
  const [isClient, setIsClient] = useState(false);

  // 粒子类
  class Particle {
    x: number;
    y: number;
    tx: number;
    ty: number;
    size: number;

    constructor(tx: number, ty: number, average_x?: number, average_y?: number) {
      if (average_x && average_y) {
        this.x = average_x + this.getRandom(-100, 100);
        this.y = average_y + this.getRandom(-100, 100);
      } else {
        this.x = tx + this.getRandom(-50, 50);
        this.y = ty + this.getRandom(-50, 50);
      }

      this.tx = tx;
      this.ty = ty;
      this.size = 1.5;
    }

    private getRandom(min: number, max: number): number {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }

    draw(ctx: CanvasRenderingContext2D) {
      const r = Math.sqrt((this.x - this.tx) ** 2 + (this.y - this.ty) ** 2);
      const alpha = Math.max(0, 0.8 - r / 300);
      
      ctx.fillStyle = `rgba(255,255,255,${alpha})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }

    update(deltaTime: number, mouseX: number | null, mouseY: number | null) {
      const duration = 300;
      const maxDis = 300;
      const k = 0.15;

      let xSpeed = (this.tx - this.x) / duration;
      let ySpeed = (this.ty - this.y) / duration;

      if (mouseX && mouseY) {
        const r = Math.sqrt((this.x - mouseX) ** 2 + (this.y - mouseY) ** 2);
        let a = 0;
        if (r < maxDis) {
          a = Math.sqrt(maxDis / (r + 1)) - 1;
        }

        if (r !== 0) {
          xSpeed += ((this.x - mouseX) / r) * a * k;
          ySpeed += ((this.y - mouseY) / r) * a * k;
        } else {
          xSpeed += (Math.random() * 2 * Math.PI - Math.PI) * a * k;
          ySpeed += (Math.random() * 2 * Math.PI - Math.PI) * a * k;
        }
      }

      this.x += xSpeed * Math.min(deltaTime, 32);
      this.y += ySpeed * Math.min(deltaTime, 32);
    }
  }

  // 初始化画布
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return null;

    // 使用窗口尺寸而不是元素尺寸
    const width = window.innerWidth;
    const height = window.innerHeight;
    const dpr = window.devicePixelRatio || 1;
    
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

    return ctx;
  }, []);

  // 图片加载
  const loadImage = useCallback((src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve(img);
      img.onerror = (err) => {
        console.error('图片加载失败:', err);
        reject(err);
      };
    });
  }, []);

  // 获取图片像素点
  const getImagePoints = useCallback((ctx: CanvasRenderingContext2D, img: HTMLImageElement): Point[] => {
    const { width, height } = ctx.canvas;
    ctx.clearRect(0, 0, width, height);
    
    // 调整图片大小以适应画布
    const scale = Math.min(0.5, Math.min(width / img.width, height / img.height));
    const imgWidth = img.width * scale;
    const imgHeight = img.height * scale;
    
    const drawX = (width - imgWidth) / 2;
    const drawY = (height - imgHeight) / 2;
    ctx.drawImage(img, drawX, drawY, imgWidth, imgHeight);
    
    const { data } = ctx.getImageData(0, 0, width, height);
    const points: Point[] = [];
    const gap = 8;
    
    for (let i = 0; i < width; i += gap) {
      for (let j = 0; j < height; j += gap) {
        const idx = (j * width + i) * 4;
        if (data[idx] > 200 && data[idx+1] > 200 && data[idx+2] > 200) { // 放宽白色检测条件
          points.push({ 
            x: i - drawX,
            y: j - drawY 
          });
        }
      }
    }
    
    ctx.clearRect(0, 0, width, height);
    return points;
  }, []);

  // 动画循环
  const startAnimation = useCallback((ctx: CanvasRenderingContext2D) => {
    let lastTime = performance.now();
    
    const animate = (time: number) => {
      const deltaTime = time - lastTime;
      lastTime = time;
      
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      
      particlesRef.current.forEach(particle => {
        // 直接使用目标位置，不需要调整
        particle.update(deltaTime, mousePosRef.current.x, mousePosRef.current.y);
        particle.draw(ctx);
      });
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    animationFrameRef.current = requestAnimationFrame(animate);
  }, []);

  // 初始化粒子
  const initParticles = useCallback(async () => {
    console.log('初始化粒子...');
    const ctx = initCanvas();
    if (!ctx) {
      console.error('无法获取Canvas上下文');
      return;
    }

    try {
      const img = await loadImage("/logo_yan.png");
      console.log('图片加载成功', img);
      const targets = getImagePoints(ctx, img);
      console.log('获取到目标点:', targets.length);
      
      if (targets.length === 0) {
        console.error('未检测到白色像素点');
        return;
      }
      
      const average_x = targets.reduce((sum, cur) => sum + cur.x, 0) / targets.length;
      const average_y = targets.reduce((sum, cur) => sum + cur.y, 0) / targets.length;
      
      particlesRef.current = targets.map(({ x, y }) => {
        return new Particle(x, y, average_x, average_y);
      });

      console.log('粒子初始化完成，开始动画');
      startAnimation(ctx);
    } catch (error) {
      console.error("初始化粒子失败:", error);
    }
  }, [initCanvas, loadImage, getImagePoints, startAnimation]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    console.log('客户端已准备好，开始初始化');

    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);
    initParticles();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isClient, initParticles]);

  return (
    <motion.div
      custom={transitionDirection}
      initial={{ x: transitionDirection > 0 ? '100%' : '-100%' }}
      animate={{ x: 0, width: '100%' }}
      exit={{ x: transitionDirection > 0 ? '-100%' : '100%' }}
      transition={{ duration: 2 }}
      className="absolute inset-0 bg-arknights-dark z-30"
    >
      <ScrollHandler />
      
      {/* 其他动画元素 */}
      <motion.div
        key="line-2"
        style={{
          position: 'fixed',
          top: '-300%',
          left: '0px',
          backgroundColor: 'rgb(255, 255, 255)',
          width: '1px',
          height: '700vh',
          scaleX: 0.5,
          zIndex: 10,
          transformOrigin: 'left center'
        }}
        custom={transitionDirection}
        initial={{
          x: transitionDirection > 0 ? '-10vw' : '90vw',
          rotate: transitionDirection > 0 ? -180 : 180
        }}
        animate={{
          x: '90vw',
          rotate: 0,
          transition: {
            duration: 2.5
          }
        }}
        exit={{
          x: '90vw',
          transition: { duration: 1.5 }
        }}
      />
      
      <motion.div
        style={{
          position: 'fixed',
          backgroundColor: 'rgb(255, 255, 255)',
          width: '100%',
          height: '1px',
          zIndex: 10
        }}
        initial={{ y: '13vh' }}
        animate={{ y: 0 }}
        exit={{ y: '13vh' }}
        transition={{ duration: 1 }}
      />
      
      <motion.div
        style={{
          position: 'fixed',
          bottom: '0px',
          left: '0px',
          backgroundColor: 'rgb(255, 255, 255)',
          width: '100%',
          height: '1.5px',
          zIndex: 10
        }}
        initial={{ y: 0 }}
        animate={{ y: '-15vh' }}
        exit={{ y: 0 }}
        transition={{ duration: 1 }}
      />
      
      {/* Canvas 容器 */}
      <canvas 
        ref={canvasRef} 
        className="fixed top-0 left-0 w-full h-full pointer-events-none"
      />
    </motion.div>
  );
}