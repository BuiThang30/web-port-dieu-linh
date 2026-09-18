'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import styles from './page.module.css';

const artSections = [
  {
    id: 'early-explorations',
    title: 'Early Explorations in Art',
    desc: 'A collection of my early works, created during the first stages of my artistic journey. These pieces reflect experimentation and curiosity as I explored different styles, materials, and ideas without strict direction. They mark the starting point of my growth in art and the foundation of my current practice.',
    images: [
      '/image/art-1.png',
      '/image/art-2.png',
      '/image/art-3.png',
      '/image/art-1.png',
    ]
  },
  {
    id: 'art-2',
    title: 'Art 2',
    desc: 'A collection of my early works, created during the first stages of my artistic journey. These pieces reflect experimentation and curiosity as I explored different styles, materials, and ideas without strict direction. They mark the starting point of my growth in art and the foundation of my current practice.',
    images: [
      '/image/art-1.png',
      '/image/art-2.png',
      '/image/art-3.png',
      '/image/art-1.png',
    ]
  }
];

function ArtSliderSection({ section }: { section: typeof artSections[0] }) {
  let baseImages = section.images || [];
  if (baseImages.length === 0) {
    baseImages = ['', '', '']; 
  } else if (baseImages.length === 1) {
    baseImages = [baseImages[0], baseImages[0], baseImages[0]];
  } else if (baseImages.length === 2) {
    baseImages = [baseImages[0], baseImages[1], baseImages[0], baseImages[1]];
  }

  const len = baseImages.length;
  const extendedImages = [...baseImages, ...baseImages, ...baseImages];

  const [currentIndex, setCurrentIndex] = useState(len); 
  const [hasTransition, setHasTransition] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextImage = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setHasTransition(true);
    setCurrentIndex(prev => prev + 1);
  };

  const prevImage = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setHasTransition(true);
    setCurrentIndex(prev => prev - 1);
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
    <div className={styles.artSectionBlock}>
      <div className={styles.textSection}>
        <h2 className={styles.title}>{section.title}</h2>
        <div className={styles.description}>
          <p>{section.desc}</p>
        </div>
      </div>

      <div className={styles.sliderContainer}>
        <button className={`${styles.navArrow} ${styles.prevArrow}`} onClick={prevImage}>
          &#10094;
        </button>

        <div className={styles.sliderWindow}>
          <div 
            className={styles.sliderTrack}
            onTransitionEnd={handleTransitionEnd}
            style={{
              /* SỬ DỤNG BIẾN CSS ĐỂ TỰ ĐỘNG TÍNH TOÁN BƯỚC TRƯỢT TRÊN MỌI MÀN HÌNH */
              transform: `translateX(calc(-${currentIndex} * (var(--box-width) + var(--box-gap))))`,
              transition: hasTransition ? 'transform 0.5s ease-in-out' : 'none'
            }}
          >
            {extendedImages.map((imgSrc, index) => (
              <div key={index} className={styles.blackBox}>
                {imgSrc !== '' && (
                  <Image 
                    src={imgSrc} 
                    alt={`${section.title} ${index}`} 
                    fill 
                    style={{ objectFit: 'cover' }} 
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <button className={`${styles.navArrow} ${styles.nextArrow}`} onClick={nextImage}>
          &#10095;
        </button>
      </div>
    </div>
  );
}

export default function ArtPage() {
  return (
    <main className={styles.pageContainer}>
      <div className={styles.topLeaves}>
        <Image src="/image/la.png" alt="Leaves decoration" fill style={{ objectFit: 'contain' }} />
      </div>

      <div className={styles.middleFlower}>
        <Image src="/image/hoa.png" alt="Flower decoration" fill style={{ objectFit: 'contain' }} />
      </div>

      <div className={styles.bottomLeaves}>
        <Image src="/image/la.png" alt="Leaves decoration" fill style={{ objectFit: 'contain' }} />
      </div>

      <div className={styles.contentWrapper}>
        {artSections.map((section) => (
          <ArtSliderSection key={section.id} section={section} />
        ))}
      </div>
    </main>
  );
}