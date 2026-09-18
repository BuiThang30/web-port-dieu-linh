import React from 'react';
import styles from './ScrollFrame.module.css';

interface ScrollFrameProps {
  children: React.ReactNode;
}

const ScrollFrame: React.FC<ScrollFrameProps> = ({ children }) => {
  return (
    <div className={styles.frameContainer}>
      <div className={styles.contentArea}>
        {children}
      </div>
    </div>
  );
};

export default ScrollFrame;