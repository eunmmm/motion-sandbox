import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import "./style.css";

const AnimatedText = ({ text, delay = 0 }) => {
  const characters = text.split("");

  return (
    <div className="animated-text-container">
      {characters.map((char, index) => (
        <motion.span
          key={index}
          className="animated-char"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: delay + index * 0.03, // 더 빠른 순차 애니메이션
            ease: [0.25, 0.1, 0.25, 1], // 부드러운 easing
          }}
          viewport={{
            // once: true, // 한 번만 실행
            amount: 0.2, // 20%만 보여도 트리거
            margin: "0px 0px -100px 0px", // 조금 더 일찍 트리거
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </div>
  );
};

const MotionPage = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "center start"],
  });

  const secondSectionY = useTransform(
    scrollYProgress,
    [0, 1],
    ["100vh", "0vh"]
  );

  return (
    <div ref={containerRef} className="scroll-container">
      {/* 첫 번째 섹션 - 고정 */}
      <section className="first-section">
        <div className="first-section-content">
          <motion.h1
            className="main-title"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            환영합니다
          </motion.h1>
          <motion.p
            className="main-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            아래로 스크롤해보세요
          </motion.p>
          <motion.div
            className="scroll-indicator"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="scroll-mouse">
              <div className="scroll-wheel"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 두 번째 섹션 - 위로 덮이면서 올라옴 */}
      <motion.section style={{ y: secondSectionY }} className="second-section">
        <div className="text-area">
          <div className="text-container">
            <AnimatedText text="새로운 시작" delay={0} />
            <AnimatedText text="무한한 가능성" delay={0.3} />
            <AnimatedText text="함께 만들어가요" delay={0.6} />
          </div>
        </div>
        <div className="text-area">
          <div className="text-container">
            <AnimatedText text="새로운 시작2" delay={0} />
            <AnimatedText text="무한한 가능성2" delay={0.3} />
            <AnimatedText text="함께 만들어가요2" delay={0.6} />
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default MotionPage;
