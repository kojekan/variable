'use client';

import { motion } from 'framer-motion';
import styles from '../styles';
import { navVariants } from '../utils/motion';

const Navbar = () => (
  <motion.nav
    variants={navVariants}
    initial="hidden"
    whileInView="show"
    className={`${styles.xPaddings} py-8 relative z-20`}
  >
    <div className="absolute w-[50%] inset-0 gradient-01 pointer-events-none" />
    <div className={`${styles.innerWidth} mx-auto flex justify-between gap-8`}>
      <img src="/search.svg" alt="search" className="w-[24px] h-[24px] object-contain" />

      <img src="/logo.png" alt="Metadroid logo" className="w-[200px] h-[40px] sm:w-[300px] sm:h-[60px] md:w-[400px] md:h-[70px] lg:w-[500px] lg:h-[80px] object-contain" />

      <img src="/menu.svg" alt="menu" className="w-[24px] h-[24px] object-contain" />
    </div>
  </motion.nav>
);

export default Navbar;
