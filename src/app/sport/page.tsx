'use client';

import React, { useState, Suspense } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import styles from './page.module.css';

const sportData = [
  {
    id: 'running',
    name: 'Running',
    title: 'Running',
    desc: 'What began as a way to challenge myself gradually became a source of discipline, resilience, and reflection. Over 3 years, I have completed 20+ races ranging from 10km to 25km (trail), including two aquathlons, learning to embrace discomfort, stay consistent through setbacks, and appreciate the value of long-term growth. Running remains one of the ways I clear my mind, set goals, and push my limits beyond the classroom.',
    images: [
      '/image/running-1.png',
      '/image/running-2.png',
      '/image/running-3.png'
    ]
  },
  {
    id: 'basketball',
    name: 'Basketball',
    title: 'Basketball',
    desc: "As a member of my school's varsity basketball team, I learned the value of teamwork, discipline, and resilience. Whether during practices, games, or tournaments, basketball taught me how to communicate effectively under pressure, adapt quickly to challenges, and contribute to a collective goal. Beyond competition, the sport has been an important source of community and balance throughout my high school years.",
    images: [
      '/image/basketball-1.png',
      '/image/basketball-2.png',
      '/image/basketball-3.png'
    ]
  }
];

export default function SportPage() {
  return (
    <Suspense fallback={null}>
      <SportContainer />
    </Suspense>
  );
}

function SportContainer() {
  const searchParams = useSearchParams();
  const t = searchParams.get('t');

  return <SportContent key={t || 'default'} />;
}

// Component xử lý trượt slide ngang (Carousel)
function SportSlider({ activeData }: { activeData: typeof sportData[0] }) {
  let baseImages = activeData.images || [];
  if (baseImages.length === 0) {
    baseImages = ['', '', '']; 
  } else if (baseImages.length === 1) {
    baseImages = [baseImages[0], baseImages[0], baseImages[0]];
  } else if (baseImages.length === 2) {
    baseImages = [baseImages[0], baseImages[1], baseImages[0], baseImages[1]];
  }

  const len = baseImages.length;
  // Nhân bản 3 lần để trượt vô tận
  const extendedImages = [...baseImages, ...baseImages, ...baseImages];

  const [currentIndex, setCurrentIndex] = useState(len); 
  const [hasTransition, setHasTransition] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setHasTransition(true);
    setCurrentIndex(prev => prev - 1);
  };

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setHasTransition(true);
    setCurrentIndex(prev => prev + 1);
  };

  const handleTransitionEnd = () => {
    setIsAnimating(false);
    if (currentIndex >= len * 2) {
      setHasTransition(false);
      setCurrentIndex(currentIndex - len);
    } else if (currentIndex <= len - 1) {
      setHasTransition(false);
      setCurrentIndex(currentIndex + len);
    }
  };

  return (
    <div className={styles.detailContainer}>
      <div className={styles.mainContentArea}>
        <div className={styles.textSection}>
          <h2 className={styles.title}>{activeData.title}</h2>
          <div className={styles.description}>
            <p>{activeData.desc}</p>
          </div>
        </div>

        {/* --- KHUNG BỌC SLIDER ĐỂ MŨI TÊN LUÔN CANH ĐÚNG GIỮA ẢNH --- */}
        <div className={styles.sliderWrapper}>
          {/* Nút mũi tên trái */}
          <button className={`${styles.navArrow} ${styles.prevArrow}`} onClick={handlePrev}>
            &#10094;
          </button>

          {/* Khung cửa sổ hiển thị slide */}
          <div className={styles.sliderWindow}>
            <div 
              className={styles.sliderTrack}
              onTransitionEnd={handleTransitionEnd}
              style={{
                transform: `translateX(calc(-${currentIndex} * (var(--box-width) + var(--box-gap))))`,
                transition: hasTransition ? 'transform 0.5s ease-in-out' : 'none'
              }}
            >
              {extendedImages.map((imgSrc, idx) => (
                <div key={idx} className={styles.blackBox}>
                  {imgSrc !== '' && (
                    <Image 
                      src={imgSrc} 
                      alt={`${activeData.title} image ${idx}`} 
                      fill 
                      style={{ objectFit: 'cover' }} 
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Nút mũi tên phải */}
          <button className={`${styles.navArrow} ${styles.nextArrow}`} onClick={handleNext}>
            &#10095;
          </button>
        </div>
        {/* ----------------------------------------------------------- */}

      </div>
    </div>
  );
}

function SportContent() {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState<number | null>(null);

  const bgImage = activeCategoryIndex === null 
    ? "url('/image/background-sport-home.png')"
    : "url('/image/background-sport.png')";

  return (
    <main className={styles.pageContainer}>
      <div className={styles.bgLayer} style={{ backgroundImage: bgImage }}></div>

      <div className={styles.contentWrapper}>
        {activeCategoryIndex === null ? (
          <div className={styles.homeSignpostContainer}>
            <div className={styles.homeSignLabels}>
              {sportData.map((item, index) => (
                <button 
                  key={item.id}
                  className={styles.homeSignBtn}
                  onClick={() => setActiveCategoryIndex(index)}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            {/* Render Component Slider chính */}
            <SportSlider 
              key={activeCategoryIndex} 
              activeData={sportData[activeCategoryIndex]} 
            />

            {/* Thanh Menu điều hướng ngang bên dưới */}
            <div className={styles.bottomNavContainer}>
              <div className={styles.navLine}></div>
              <div className={styles.navItems}>
                {sportData.map((item, index) => (
                  <button 
                    key={item.id}
                    className={`${styles.navItemBtn} ${activeCategoryIndex === index ? styles.activeNav : ''}`}
                    onClick={() => setActiveCategoryIndex(index)}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}