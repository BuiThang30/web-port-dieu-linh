'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { extracurricularsData } from '../../data/extracurricularsData';
import styles from './page.module.css';

const VISIBLE = 3; // số video hiển thị cùng lúc

/** Nhận link YouTube (watch / youtu.be / embed / shorts) hoặc ID thuần -> trả về ID */
function getYoutubeId(input: string): string {
  const value = input.trim();
  const match = value.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|v\/))([\w-]{6,})/
  );
  return match ? match[1] : value;
}

export default function ExtracurricularsPage() {
  const searchParams = useSearchParams();

  return <ExtracurricularsContent key={searchParams.toString()} />;
}

function ExtracurricularsContent() {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState<number | null>(null);
  const [activeSubItemIndex, setActiveSubItemIndex] = useState(0);
  const [videoStart, setVideoStart] = useState(0);

  const handleCategoryClick = (index: number) => {
    setActiveCategoryIndex(index);
    setActiveSubItemIndex(0);
    setVideoStart(0);
  };

  const handleSubItemClick = (idx: number) => {
    setActiveSubItemIndex(idx);
    setVideoStart(0);
  };

  const bgImage =
    activeCategoryIndex === null
      ? "url('/image/background-extracurriculars-home.png')"
      : "url('/image/background-extracurriculars.png')";

  const activeItem =
    activeCategoryIndex !== null
      ? extracurricularsData[activeCategoryIndex].items[activeSubItemIndex]
      : null;

  const videos = activeItem?.videos ?? [];
  const total = videos.length;
  const canLoop = total > VISIBLE;

  // Vòng lặp vô hạn bằng modulo: sau video cuối quay lại video đầu
  const visibleVideos =
    total === 0
      ? []
      : Array.from({ length: Math.min(VISIBLE, total) }, (_, i) => {
          const index = (videoStart + i) % total;
          return { index, id: getYoutubeId(videos[index]) };
        });

  const prevVideo = () => setVideoStart((s) => (s - 1 + total) % total);
  const nextVideo = () => setVideoStart((s) => (s + 1) % total);

  return (
    <main className={styles.pageContainer}>
      {activeCategoryIndex !== null && (
        <div className={styles.signpostUnderLayer}>
          <Image
            src="/image/chuyen.png"
            alt="Wooden Signpost"
            fill
            style={{ objectFit: 'contain' }}
            priority
          />
        </div>
      )}

      <div
        className={`${styles.bgLayer} ${activeCategoryIndex === null ? '' : styles.bgDetail}`}
        style={{ backgroundImage: bgImage }}
      ></div>

      <div className={styles.contentWrapper}>
        <div
          className={`${styles.signpostContainer} ${
            activeCategoryIndex === null ? styles.homeMode : styles.detailMode
          }`}
        >
          <div className={styles.signpostClickArea}>
            <div className={styles.signLabels}>
              {extracurricularsData.map((cat, index) => (
                <button
                  key={cat.categoryId}
                  className={`${styles.signBtn} ${
                    activeCategoryIndex === index ? styles.activeSign : ''
                  }`}
                  onClick={() => handleCategoryClick(index)}
                >
                  {cat.categoryName}
                </button>
              ))}
            </div>
          </div>
        </div>

        {activeCategoryIndex !== null && activeItem && (
          <div className={styles.rightColumn}>
            {/* 1. PHẦN CHỮ NẰM TRÊN */}
            <div className={styles.textSection}>
              <h2
                className={`${styles.title} ${
                  activeItem.title.includes('\n') ? styles.titleSmall : ''
                }`}
              >
                {activeItem.title.split('\n').map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </h2>

              <div className={styles.description}>
                {activeItem.desc.split('\n').map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* 2. PHẦN ẢNH / VIDEO VÀ MENU BÊN DƯỚI */}
            <div className={styles.rightContent}>
              <div className={styles.mediaAndLinks}>
                {total === 0 ? (
                  /* Mục không có video: giữ nguyên 3 ảnh như cũ */
                  <div className={styles.imageGallery}>
                    {(activeItem.images ?? []).map((imgSrc, idx) => (
                      <div key={idx} className={styles.blackBox}>
                        {imgSrc !== '' && (
                          <Image
                            src={imgSrc}
                            alt={`Extracurricular image ${idx + 1}`}
                            fill
                            style={{ objectFit: 'cover' }}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  /* Mục có video (Lumos): carousel vòng lặp vô hạn */
                  <div className={styles.carousel}>
                    {canLoop && (
                      <button
                        type="button"
                        className={`${styles.arrowBtn} ${styles.arrowLeft}`}
                        onClick={prevVideo}
                        aria-label="Previous video"
                      >
                        &lt;
                      </button>
                    )}

                    <div className={styles.imageGallery}>
                      {visibleVideos.map(({ index, id }) => (
                        <div key={`${activeItem.id}-${index}`} className={styles.blackBox}>
                          <iframe
                            className={styles.videoFrame}
                            src={`https://www.youtube-nocookie.com/embed/${id}`}
                            title={`${activeItem.linkLabel} - video ${index + 1}`}
                            loading="lazy"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                          />
                        </div>
                      ))}
                    </div>

                    {canLoop && (
                      <button
                        type="button"
                        className={`${styles.arrowBtn} ${styles.arrowRight}`}
                        onClick={nextVideo}
                        aria-label="Next video"
                      >
                        &gt;
                      </button>
                    )}
                  </div>
                )}

                <div
                  className={`${styles.subMenu} ${
                    activeCategoryIndex === 0 ? styles.menuRow : styles.menuCol
                  }`}
                >
                  {extracurricularsData[activeCategoryIndex].items.map((item, idx) => (
                    <button
                      key={item.id}
                      className={`${styles.subLink} ${
                        activeSubItemIndex === idx ? styles.activeSubLink : ''
                      }`}
                      onClick={() => handleSubItemClick(idx)}
                    >
                      {item.linkLabel}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}