'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { extracurricularsData } from '../../data/extracurricularsData';
import styles from './page.module.css';

export default function ExtracurricularsPage() {
  const searchParams = useSearchParams();

  // Dùng key theo searchParams: mỗi khi searchParams đổi (bấm lại link Navbar),
  // React sẽ remount ExtracurricularsContent -> state bên trong tự reset về null
  return <ExtracurricularsContent key={searchParams.toString()} />;
}

function ExtracurricularsContent() {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState<number | null>(null);
  const [activeSubItemIndex, setActiveSubItemIndex] = useState(0);

  const handleCategoryClick = (index: number) => {
    setActiveCategoryIndex(index);
    setActiveSubItemIndex(0);
  };

  const bgImage =
    activeCategoryIndex === null
      ? "url('/image/background-extracurriculars-home.png')"
      : "url('/image/background-extracurriculars.png')";

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

      <div className={styles.bgLayer} style={{ backgroundImage: bgImage }}></div>

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

        {activeCategoryIndex !== null && (
          <div className={styles.rightColumn}>
            {/* 1. PHẦN CHỮ NẰM TRÊN */}
            <div className={styles.textSection}>
              <h2
                className={`${styles.title} ${
                  extracurricularsData[activeCategoryIndex].items[
                    activeSubItemIndex
                  ].title.includes('\n')
                    ? styles.titleSmall
                    : ''
                }`}
              >
                {extracurricularsData[activeCategoryIndex].items[activeSubItemIndex].title
                  .split('\n')
                  .map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
              </h2>

              <div className={styles.description}>
                {extracurricularsData[activeCategoryIndex].items[activeSubItemIndex].desc
                  .split('\n')
                  .map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
              </div>
            </div>

            {/* 2. PHẦN ẢNH VÀ MENU BÊN DƯỚI */}
            <div className={styles.rightContent}>
              <div className={styles.mediaAndLinks}>
                <div className={styles.imageGallery}>
                  {extracurricularsData[activeCategoryIndex].items[
                    activeSubItemIndex
                  ].images.map((imgSrc, idx) => (
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
                      onClick={() => setActiveSubItemIndex(idx)}
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