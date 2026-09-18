'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ScrollFrame from '../../components/ScrollFrame/ScrollFrame';
import { researchData } from '../../data/researchData';
import styles from './page.module.css';

export default function ResearchPage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slide = researchData[currentSlide];

  let baseImages = slide.images || [];
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

  const handleSlideChange = (index: number) => {
    setCurrentSlide(index);

    const nextSlide = researchData[index];
    let nextBaseImages = nextSlide.images || [];
    if (nextBaseImages.length === 0) nextBaseImages = ['', '', ''];
    else if (nextBaseImages.length === 1) nextBaseImages = [nextBaseImages[0], nextBaseImages[0], nextBaseImages[0]];
    else if (nextBaseImages.length === 2) nextBaseImages = [nextBaseImages[0], nextBaseImages[1], nextBaseImages[0], nextBaseImages[1]];

    setCurrentIndex(nextBaseImages.length);
    setHasTransition(false);
  };

  const nextImage = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setHasTransition(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const prevImage = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setHasTransition(true);
    setCurrentIndex((prev) => prev - 1);
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
    <main className={styles.pageContainer}>
      <div className={styles.ivyLayer}></div>

      <ScrollFrame>
        <div className={styles.textContent}>
          <h2 className={styles.title}>{slide.title}</h2>
          <p className={styles.description}>{slide.desc}</p>
        </div>

        {slide.type === 'gallery' ? (
          <div className={styles.imageGallery}>
            <button className={styles.arrowBtn} onClick={prevImage}>
              &#10094;
            </button>

            <div className={styles.sliderWindow}>
              <div
                className={styles.sliderTrack}
                onTransitionEnd={handleTransitionEnd}
                style={{
                  transform: `translateX(calc(-${currentIndex} * (var(--box-width) + var(--box-gap))))`,
                  transition: hasTransition ? 'transform 0.5s ease-in-out' : 'none',
                }}
              >
                {extendedImages.map((imgSrc, index) => (
                  <div key={index} className={styles.blackBox}>
                    {imgSrc !== '' && (
                      <Image
                        src={imgSrc}
                        alt={`Gallery image ${index}`}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <button className={styles.arrowBtn} onClick={nextImage}>
              &#10095;
            </button>
          </div>
        ) : (
          <div className={styles.viewHereContainer}>
            <Link
              href={slide.linkUrl || '#'}
              className={styles.viewHereLink}
              target={slide.linkUrl?.startsWith('http') ? '_blank' : '_self'}
            >
              View Here
            </Link>
          </div>
        )}

        <div className={styles.pagination}>
          {researchData.map((item, index) => (
            <span
              key={item.id}
              className={`${styles.dot} ${currentSlide === index ? styles.active : ''}`}
              onClick={() => handleSlideChange(index)}
            ></span>
          ))}
        </div>
      </ScrollFrame>
    </main>
  );
}