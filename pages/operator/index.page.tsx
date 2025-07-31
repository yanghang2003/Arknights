import { motion, AnimatePresence } from 'framer-motion'; // 确保导入AnimatePresence
import { useState } from 'react';
import ScrollHandler from '@/components/ScrollHandler';
import data from '@/datas/operators/operatorsDetails';

export default function Information({ transitionDirection }: { transitionDirection: number }) {
  const [activeTab, setActiveTab] = useState('1');
  return (
    <motion.div
      custom={transitionDirection}
      initial={{ x: transitionDirection > 0 ? '100%' : 0 }}
      animate={{ x: 0, width: '100%' }}
      exit={{ x: transitionDirection > 0 ? 0 : '100%', width: transitionDirection > 0 ? '0%' : '100%' }}
      transition={{ duration: 2 }}
      className="absolute inset-0 bg-arknights-dark z-20 p-4">
      <ScrollHandler />
      <motion.div
        style={{
          position: 'fixed',
          top: '0px',
          left: '0px',
          backgroundColor: 'rgb(255, 255, 255)',
          width: '100%',
          height: '0.5px',
          zIndex: 10
        }}
        initial={{ y: 0 }}
        animate={{ y: '13vh' }}
        exit={{ y: 0 }}
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
        initial={{ y: '-15vh' }}
        animate={{ y: 0 }}
        exit={{ y: '-15vh' }}
        transition={{ duration: 1 }}></motion.div>

      <motion.div
        style={{
          position: 'fixed',
          top: '0px',
          left: '0px',
          backgroundColor: 'rgb(255, 255, 255)',
          width: '1px',
          height: '100vh',
          scaleX: 0.5,
          zIndex: 10
        }}
        initial={{ x: 0 }}
        animate={{ x: '90vw' }}
        exit={{
          x: transitionDirection > 0 ? '90vw' : '-10vw',
          opacity: transitionDirection > 0 ? 0 : 1,
          transition: {
            delay: 0,
            duration: transitionDirection > 0 ? 0.1 : 2
          }
        }}
        transition={{ delay: 0.1, duration: 1.8 }}></motion.div>
      {/* 主内容区域 */}
      <div
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: '100%',
          height: '100%'
        }}>
        <div
          style={{
            position: 'absolute',
            top: '30%',
            left: '8%',
            display: 'flex',
            flexDirection: 'column',
            width: '28vw',
            height: '60vh',
            zIndex: 6
          }}>
          {/* 角色信息 */}
          <div
            className="flex"
            style={{
              height: '58%'
            }}>
            <AnimatePresence mode="wait">
              <motion.h1
                key={activeTab}
                style={{
                  fontSize: '4rem',
                  fontWeight: '700',
                  marginBottom: '1rem',
                  textShadow: '0 0 25px rgba(255,255,255,0.8)',
                  letterSpacing: '2px',
                  lineHeight: '1.2',
                  fontFamily: '"Arial Black", sans-serif',
                  color: 'white'
                }}
                initial={{ opacity: 0, x: '-10px' }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: '10px' }}
                transition={{ duration: 0.5 }}>
                {data.contentData[activeTab].extraContent}
              </motion.h1>
            </AnimatePresence>
          </div>
          {/* Tab 栏 */}
          <div
            className="flex"
            style={{
              width: '100%',
              height: '20vh',
              gap: '20px'
            }}>
            {data.tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  position: 'relative',
                  flex: '1'
                }}>
                {/* 白色遮罩层 */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: tab.id === activeTab ? [1, 0] : 0,
                    transition: { duration: 1 }
                  }}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'white',
                    zIndex: 11 // 确保遮罩在内容上方
                  }}
                />
                <div
                  style={{
                    transition: 'opacity .3s',
                    opacity: tab.id === activeTab ? 1 : 0,
                    position: 'absolute',
                    right: '-0.375rem',
                    top: '-0.5rem',
                    borderColor: '#18d1ff #18d1ff transparent transparent',
                    borderStyle: 'solid',
                    borderWidth: '1rem'
                  }}></div>
                <div
                  style={{
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    boxSizing: 'border-box',
                    border: '0.625rem solid #fff'
                  }}></div>
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    filter: 'drop-shadow(-0.5rem 0.5rem 1rem #000)',
                    overflow: 'hidden'
                  }}>
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      backgroundImage: `url(${tab.role})`,
                      backgroundSize: 'cover'
                    }}></div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 背景图片 */}

        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100vw',
            height: '27.125rem',
            zIndex: 4
          }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={`bg-${activeTab}`}
              style={{
                width: '100%',
                height: '100%',
                backgroundImage: `url(${data.contentData[activeTab].backgroundContent})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: '50%'
              }}
              initial={{ opacity: 0, x: '50px' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '-100px' }}
              transition={{ duration: 0.5 }}></motion.div>
          </AnimatePresence>
        </div>

        {/* 字母图片 */}
        <div
          style={{
            position: 'absolute',
            top: '-8vh',
            left: 0,
            width: '100vw',
            height: '93vh',
            zIndex: 0,
            backgroundColor: '#272727',
            backgroundImage: 'url(/zimu.png)',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
          }}></div>
        {/* footer */}
        <div
          style={{
            position: 'absolute',
            zIndex: 10,
            left: 0,
            bottom: 0,
            width: '100%',
            height: '15vh',
            backgroundImage: 'linear-gradient(0deg, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.5)'
          }}></div>
        {/* 角色立绘 */}
        <div
          style={{
            position: 'absolute',
            top: '30%',
            left: '60%',
            width: '100%',
            height: '100%',
            zIndex: 8
          }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={`role-${activeTab}`}
              style={{
                width: '100%',
                height: '100%',
                backgroundImage: `url(${data.contentData[activeTab].mainContent})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                transformOrigin: '68.75% 15.4297%',
                transform: 'translate(-6.7188%, -10.5469%) scale(1.3)'
              }}
              initial={{ opacity: 0, x: '-400px' }}
              animate={{ opacity: 1, x: '-300px' }}
              exit={{
                opacity: 0,
                x: -200,
                transition: {
                  // 退出动画的过渡配置在这里
                  duration: 0.5,
                  ease: 'easeIn'
                }
              }}
              transition={{
                // 进入动画的过渡配置
                duration: 10,
                ease: [0.05, 0.8, 0.4, 1] // 自定义贝塞尔曲线
              }}
            />
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
