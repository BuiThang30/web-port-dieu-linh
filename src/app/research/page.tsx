'use client';

import React, { useState, useRef, useLayoutEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ScrollFrame from '../../components/ScrollFrame/ScrollFrame';
import { researchData } from '../../data/researchData';
import styles from './page.module.css';

type Ratio = '16:9' | '9:16';
type GalleryImage = { src: string; ratio: Ratio };

const ratioValue: Record<Ratio, string> = {
  '16:9': '16 / 9',
  '9:16': '9 / 16',
};

// 8 ảnh đầu là 9:16, các ảnh sau (ảnh thứ 9 trở đi) là 16:9
const PORTRAIT_COUNT = 8;

function normalizeImages(images: string[] = []): GalleryImage[] {
  return images
    .filter((src) => src !== '')
    .map((src, index) => ({
      src,
      ratio: index < PORTRAIT_COUNT ? '9:16' : '16:9',
    }));
}

function GalleryBox({
  img,
  alt,
  boxRef,
}: {
  img: GalleryImage;
  alt: string;
  boxRef?: (el: HTMLDivElement | null) => void;
}) {
  return (
    <div
      ref={boxRef}
      className={styles.blackBox}
      style={{ aspectRatio: ratioValue[img.ratio] }}
    >
      <Image
        src={img.src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 60vw, 400px"
        style={{ objectFit: 'cover' }}
      />
    </div>
  );
}

function GallerySlider({ images }: { images: GalleryImage[] }) {
  const len = images.length;
  const extendedImages = [...images, ...images, ...images];

  const [currentIndex, setCurrentIndex] = useState(len);
  const [hasTransition, setHasTransition] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [offset, setOffset] = useState(0);

  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Đo vị trí thật của ô hiện tại (các ô có độ rộng khác nhau)
  const updateOffset = useCallback(() => {
    const el = itemRefs.current[currentIndex];
    if (el) setOffset(el.offsetLeft);
  }, [currentIndex]);

  useLayoutEffect(() => {
    updateOffset();
  }, [updateOffset]);

  useLayoutEffect(() => {
    window.addEventListener('resize', updateOffset);
    return () => window.removeEventListener('resize', updateOffset);
  }, [updateOffset]);

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

  const handleTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;
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
    <div className={styles.imageGallery}>
      <button className={styles.arrowBtn} onClick={prevImage} aria-label="Previous">
        &#10094;
      </button>

      <div className={styles.sliderWindow}>
        <div
          className={styles.sliderTrack}
          onTransitionEnd={handleTransitionEnd}
          style={{
            transform: `translateX(-${offset}px)`,
            transition: hasTransition ? 'transform 0.5s ease-in-out' : 'none',
          }}
        >
          {extendedImages.map((img, index) => (
            <GalleryBox
              key={index}
              img={img}
              alt={`Gallery image ${(index % len) + 1}`}
              boxRef={(el) => {
                itemRefs.current[index] = el;
              }}
            />
          ))}
        </div>
      </div>

      <button className={styles.arrowBtn} onClick={nextImage} aria-label="Next">
        &#10095;
      </button>
    </div>
  );
}

export default function ResearchPage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slide = researchData[currentSlide];
  const images = normalizeImages(slide.images);

  return (
    <main className={styles.pageContainer}>
      <div className={styles.ivyLayer}></div>

      <ScrollFrame>
        <div className={styles.textContent}>
          <h2 className={styles.title}>{slide.title}</h2>
          <p className={styles.description}>{slide.desc}</p>
        </div>

        {slide.type === 'gallery' ? (
          images.length >= 3 ? (
            // key giúp slider tự reset khi đổi slide
            <GallerySlider key={slide.id} images={images} />
          ) : (
            // Dưới 3 ảnh: hiển thị tĩnh, không mũi tên
            <div className={styles.staticRow}>
              {images.map((img, i) => (
                <GalleryBox key={i} img={img} alt={`Gallery image ${i + 1}`} />
              ))}
            </div>
          )
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
              onClick={() => setCurrentSlide(index)}
            ></span>
          ))}
        </div>
      </ScrollFrame>
    </main>
  );
}