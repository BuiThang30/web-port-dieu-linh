'use client';

import React, { useState, useRef, useLayoutEffect, useCallback } from 'react';
import Image from 'next/image';
import styles from './page.module.css';

type Ratio = '16:9' | '9:16';
type MediaType = 'image' | 'video';
type MediaItem = { type: MediaType; src: string; ratio: Ratio };

const ratioValue: Record<Ratio, string> = {
  '16:9': '16 / 9',
  '9:16': '9 / 16',
};

// 3 ảnh đầu 16:9, 8 ảnh sau 9:16 (Ảnh nguyên bản)
const earlyImages: MediaItem[] = Array.from({ length: 11 }, (_, i) => ({
  type: 'image',
  src: `/image/art-${i + 1}.png`,
  ratio: i < 3 ? '16:9' : '9:16',
}));

const mediaSections: {
  id: string;
  category?: string;
  title: string;
  desc: string;
  items: MediaItem[];
}[] = [
  {
    id: 'dance',
    category: 'Performing Arts',
    title: 'Dance',
    desc: 'Dance has been the cornerstone of my creative expression and personal growth since the 3rd grade, shaping how I approach discipline, collaboration, and performance. My journey spans a diverse range of styles, from the foundational precision of ballet and Dancesport to the dynamic energy of K-pop, urban hip-hop, commercial jazz, and contemporary movement. Through years of rigorous training and choreographic exploration, I’ve cultivated both technical versatility and a strong artistic voice. This collection highlights my evolution as a dancer, capturing my commitment to storytelling, physical discipline, and the joy of continuous movement.',
    items: [
      { type: 'video', src: 'https://www.youtube.com/embed/gGco7UWsQF8', ratio: '16:9' },
      { type: 'video', src: 'https://www.youtube.com/embed/Av_mOpmPBDc', ratio: '16:9' },
      { type: 'video', src: 'https://www.youtube.com/embed/MFV38wxClmY', ratio: '9:16' }, 
      { type: 'video', src: 'https://www.youtube.com/embed/EIARTNxjNOE', ratio: '16:9' },
      { type: 'video', src: 'https://www.youtube.com/embed/BlztSAVxotA', ratio: '16:9' },
      { type: 'video', src: 'https://www.youtube.com/embed/GSB2yu7a0IM', ratio: '16:9' },
      { type: 'video', src: 'https://www.youtube.com/embed/H2UzHaU-HI8', ratio: '16:9' },
      { type: 'video', src: 'https://www.youtube.com/embed/p4Y2JPLQgAU', ratio: '16:9' },
      { type: 'video', src: 'https://www.youtube.com/embed/Hjumv-pGnMU', ratio: '16:9' },
      { type: 'video', src: 'https://www.youtube.com/embed/xrnR9CCzgsQ', ratio: '16:9' },
    ],
  },
  {
    id: 'echoes-abyss',
    category: 'Visual Arts',
    title: 'Echoes from the Abyss',
    desc: 'In the uncharted waters where ancient magic still clings to the tides, the great ocean leviathans are rarely alone. Sketched from forgotten mariner logs, this piece captures a noble apex swimmer alongside a whimsical, otherworldly entity, a manifestation of the strange, forgotten magic that drifts beneath the surface.',
    items: [
      { type: 'image', src: '/image/art-12.png', ratio: '16:9' },
      { type: 'image', src: '/image/art-13.png', ratio: '16:9' },
    ],
  },
  {
    id: 'early-explorations',
    title: 'Early Explorations in Art',
    desc: 'A collection of my early works, created during the first stages of my artistic journey. These pieces reflect experimentation and curiosity as I explored different styles, materials, and ideas without strict direction. They mark the starting point of my growth in art and the foundation of my current practice.',
    items: earlyImages,
  },
];

function MediaBox({
  item,
  alt,
  boxRef,
}: {
  item: MediaItem;
  alt: string;
  boxRef?: (el: HTMLDivElement | null) => void;
}) {
  return (
    <div
      ref={boxRef}
      className={styles.blackBox}
      style={{ aspectRatio: ratioValue[item.ratio] }}
    >
      {item.type === 'image' ? (
        <Image
          src={item.src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 60vw, 400px"
          style={{ objectFit: 'cover' }}
        />
      ) : (
        <iframe
          src={item.src}
          title={alt}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ width: '100%', height: '100%', border: 'none' }}
        />
      )}
    </div>
  );
}

function MediaSliderSection({ section }: { section: (typeof mediaSections)[0] }) {
  const baseItems = section.items;
  const len = baseItems.length;
  const isSlider = len >= 3;

  const header = (
    <div className={styles.textSection}>
      {section.category && <h3 className={styles.category}>{section.category}</h3>}
      <h2 className={styles.title}>{section.title}</h2>
      <div className={styles.description}>
        <p>{section.desc}</p>
      </div>
    </div>
  );

  // ---- Dưới 3 item: hiển thị tĩnh ----
  if (!isSlider) {
    return (
      <div className={styles.artSectionBlock}>
        {header}
        <div className={styles.staticRow}>
          {baseItems.map((item, i) => (
            <MediaBox key={i} item={item} alt={`${section.title} ${i + 1}`} />
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
  section: (typeof mediaSections)[0];
  header: React.ReactNode;
}) {
  const baseItems = section.items;
  const len = baseItems.length;
  const extendedItems = [...baseItems, ...baseItems, ...baseItems];

  const [currentIndex, setCurrentIndex] = useState(len);
  const [hasTransition, setHasTransition] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [offset, setOffset] = useState(0);

  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

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

  const nextItem = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setHasTransition(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const prevItem = () => {
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
          onClick={prevItem}
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
            {extendedItems.map((item, index) => (
              <MediaBox
                key={index}
                item={item}
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
          onClick={nextItem}
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
        {mediaSections.map((section) => (
          <MediaSliderSection key={section.id} section={section} />
        ))}
      </div>
    </main>
  );
}