import { motion } from 'framer-motion';
import ScrollHandler from '@/components/ScrollHandler';
import { useEffect, useRef } from 'react';

export default function Index({ transitionDirection }: { transitionDirection: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log('自动播放被阻止:', error);
      });
    }
  }, []);

  return (
    <motion.div
      custom={transitionDirection}
      initial={{ x: 0, width: transitionDirection > 0 ? '100%' : '0%' }}
      animate={{ x: 0, width: '100%' }}
      exit={{ x: 0, width: transitionDirection > 0 ? '0%' : '100%' }}
      transition={{ duration: 2 }}
      className="absolute inset-0 bg-arknights-dark z-10">
      <ScrollHandler />
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
        transition={{ duration: 1 }}></motion.div>
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
        transition={{ duration: 1 }}>
      </motion.div>
      <motion.div
        style={{
          position: 'fixed',
          top: '0px',
          right: '10vw',
          backgroundColor: 'rgb(255, 255, 255)',
          width: '1px',
          height: '100vh',
          scaleX:0.5,
          zIndex: 10
        }}
        initial={{ x: 0 }}
        animate={{ x: 0 }}
        exit={{ x: 100 }}
        transition={{ duration: 1 }}>
      </motion.div>
      <motion.div
        style={{
          position: 'fixed',
          width: '100vw',
          height: '100vh',
          overflow: 'hidden'
        }}>
        <video
          ref={videoRef}
          src="/mihayou1.mp4"
          className="block w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        />

        {/* 增强版遮罩层 */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            color: 'white',
            textAlign: 'center',
            padding: '20px',
            boxSizing: 'border-box'
          }}>
          {/* 主标题 - 霓虹效果 */}
          <motion.h1
            style={{
              fontSize: '4rem',
              fontWeight: '700',
              marginBottom: '1rem',
              textShadow: '0 0 35px rgba(255,255,255,0.8)',
              letterSpacing: '2px',
              lineHeight: '1.2',
              fontFamily: '"Arial Black", sans-serif'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}>
            仿写官网
          </motion.h1>

          {/* 副标题 - 发光边框效果 */}
          <motion.p
            style={{
              fontSize: '1.8rem',
              maxWidth: '800px',
              marginBottom: '2rem',
              textShadow: '0 0 10px rgba(255,255,255,0.8)',
              position: 'relative',
              padding: '15px',
              fontFamily: '"Microsoft YaHei", sans-serif'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}>
            <span
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: '10px',
                pointerEvents: 'none'
              }}></span>
            你醒着的时候-全世界都在沉睡-你沉睡时-世界才真正醒来
          </motion.p>

          {/* 按钮 - 悬浮发光效果 */}
          <motion.button
            style={{
              marginTop: '30px',
              padding: '15px 40px',
              background: 'transparent',
              color: 'white',
              border: '2px solid white',
              borderRadius: '50px',
              cursor: 'pointer',
              fontSize: '1.2rem',
              fontWeight: 'bold',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.3s ease'
            }}
            whileHover={{
              boxShadow: '0 0 20px rgba(255, 255, 255, 0.8)',
              textShadow: '0 0 10px rgba(255, 255, 255, 1)'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}>
            进入游戏
            <span
              style={{
                position: 'absolute',
                top: '-50%',
                left: '-50%',
                width: '200%',
                height: '200%',
                background: 'linear-gradient(transparent, rgba(255,255,255,0.2), transparent)',
                transform: 'rotate(45deg)',
                transition: 'all 0.3s ease'
              }}></span>
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
