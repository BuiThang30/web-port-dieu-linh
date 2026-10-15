'use client';

import React, { useState, useRef, useLayoutEffect, useCallback } from 'react';
import Image from 'next/image';
import styles from './page.module.css';

type Ratio = '16:9' | '9:16';
type ArtImage = { src: string; ratio: Ratio };

const ratioValue: Record<Ratio, string> = {
  '16:9': '16 / 9',
  '9:16': '9 / 16',
};

// 3 ảnh đầu 16:9, 8 ảnh sau 9:16
const earlyImages: ArtImage[] = Array.from({ length: 11 }, (_, i) => ({
  src: `/image/art-${i + 1}.png`,
  ratio: i < 3 ? '16:9' : '9:16',
}));

const artSections: {
  id: string;
  title: string;
  desc: string;
  images: ArtImage[];
}[] = [
  {
    id: 'early-explorations',
    title: 'Early Explorations in Art',
    desc: 'A collection of my early works, created during the first stages of my artistic journey. These pieces reflect experimentation and curiosity as I explored different styles, materials, and ideas without strict direction. They mark the starting point of my growth in art and the foundation of my current practice.',
    images: earlyImages,
  },
  {
    id: 'art-2',
    title: 'Echoes from the Abyss',
    desc: 'In the uncharted waters where ancient magic still clings to the tides, the great ocean leviathans are rarely alone. Sketched from forgotten mariner logs, this piece captures a noble apex swimmer alongside a whimsical, otherworldly entity, a manifestation of the strange, forgotten magic that drifts beneath the surface.',
    images: [
      { src: '/image/art-12.png', ratio: '16:9' }, // đổi thành '9:16' nếu ảnh dọc
      { src: '/image/art-13.png', ratio: '16:9' },
    ],
  },
];

function ArtBox({
  img,
  alt,
  boxRef,
}: {
  img: ArtImage;
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

function ArtSliderSection({ section }: { section: (typeof artSections)[0] }) {
  const baseImages = section.images;
  const len = baseImages.length;
  const isSlider = len >= 3; // dưới 3 ảnh thì không chuyển slide

  const header = (
    <div className={styles.textSection}>
      <h2 className={styles.title}>{section.title}</h2>
      <div className={styles.description}>
        <p>{section.desc}</p>
      </div>
    </div>
  );

  // ---- Dưới 3 ảnh: hiển thị tĩnh, không mũi tên ----
  if (!isSlider) {
    return (
      <div className={styles.artSectionBlock}>
        {header}
        <div className={styles.staticRow}>
          {baseImages.map((img, i) => (
            <ArtBox key={i} img={img} alt={`${section.title} ${i + 1}`} />
          ))}
        </div>
      </div>
    );
  }

  return <SliderBlock section={section} header={header} />;
}

function SliderBlock({
  section,
  header,
}: {
  section: (typeof artSections)[0];
  header: React.ReactNode;
}) {
  const baseImages = section.images;
  const len = baseImages.length;
  const extendedImages = [...baseImages, ...baseImages, ...baseImages];

  const [currentIndex, setCurrentIndex] = useState(len);
  const [hasTransition, setHasTransition] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [offset, setOffset] = useState(0);

  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Đo vị trí thật của ô hiện tại (vì các ô có độ rộng khác nhau)
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
    <div className={styles.artSectionBlock}>
      {header}

      <div className={styles.sliderContainer}>
        <button
          className={`${styles.navArrow} ${styles.prevArrow}`}
          onClick={prevImage}
          aria-label="Previous"
        >
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
              <ArtBox
                key={index}
                img={img}
                alt={`${section.title} ${(index % len) + 1}`}
                boxRef={(el) => {
                  itemRefs.current[index] = el;
                }}
              />
            ))}
          </div>
        </div>

        <button
          className={`${styles.navArrow} ${styles.nextArrow}`}
          onClick={nextImage}
          aria-label="Next"
        >
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