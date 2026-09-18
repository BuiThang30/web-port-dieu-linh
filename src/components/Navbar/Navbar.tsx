'use client'; 

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import styles from './Navbar.module.css';

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetPath: string) => {
    if (pathname === targetPath) {
      e.preventDefault(); 
      router.push(`${targetPath}?t=${Date.now()}`);
    }
    closeMenu();
  };

  return (
    <header className={styles.header}>
      <div className={styles.navContainer}>
        
        {/* Nút Hamburger Menu (Chỉ hiện trên Mobile) */}
        <button 
          className={`${styles.menuToggler} ${isMenuOpen ? styles.open : ''}`} 
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Khung chứa các Link */}
        <nav className={`${styles.navLinks} ${isMenuOpen ? styles.showMenu : ''}`}>
          <Link 
            href="/" 
            onClick={closeMenu}
            className={`${styles.navLink} ${pathname === '/' ? styles.active : ''}`}
          >
            About me
          </Link>
          
          <Link 
            href="/research"
            onClick={closeMenu} 
            className={`${styles.navLink} ${pathname === '/research' ? styles.active : ''}`}
          >
            Research
          </Link>
          
          <Link 
            href="/extracurriculars" 
            onClick={(e) => handleNavClick(e, '/extracurriculars')}
            className={`${styles.navLink} ${pathname === '/extracurriculars' ? styles.active : ''}`}
          >
            Extracurriculars
          </Link>
          
          <Link 
            href="/art" 
            onClick={closeMenu}
            className={`${styles.navLink} ${pathname === '/art' ? styles.active : ''}`}
          >
            Art
          </Link>
          
          <Link 
            href="/sport" 
            onClick={(e) => handleNavClick(e, '/sport')}
            className={`${styles.navLink} ${pathname === '/sport' ? styles.active : ''}`}
          >
            Sport
          </Link>
        </nav>

      </div>
    </header>
  );
};

export default Navbar;