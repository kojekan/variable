'use client';

import { motion } from 'framer-motion';
import styles from '../styles';
import { fadeIn } from '../utils/motion';
import RoastProfileChart from './RoastProfileChart';

// 1. ADD 'active' and 'handleClick' to the destructuring of props.
// 2. Add 'index' back for the fadeIn animation.
const ExploreCard = ({
  id,
  catalog,
  imageUrl,
  process,
  altitude,
  variety,
  index, // Added: Used for the fadeIn animation delay
  active, // Added: To check if this card is currently active
  handleClick, // Added: The function to change the active card
  roastData, // Added: Roast profile data for the chart
}) => (
  <motion.div
    // Use the correct index for the animation delay
    variants={fadeIn('right', 'spring', index * 0.5, 0.75)}
    className={`relative ${
      // 3. CORRECTED: Check if the current card's 'id' matches the 'active' state.
      active === id ? 'lg:flex-[3.5] flex-[10]' : 'lg:flex-[0.5] flex-[2]'
    } flex items-center justify-center min-w-[170px] h-[700px] transition-[flex] duration-[0.7s] ease-out-flex cursor-pointer`}
    // 4. CORRECTED: Use the handleClick function passed from the parent component.
    onClick={() => handleClick(id)}
  >
    <img
      src={imageUrl}
      alt={catalog}
      className="absolute w-full h-full object-cover rounded-[24px]"
    />

    {/* 5. CORRECTED: Check if the current card's 'id' does NOT match the 'active' state. */}
    {active !== id ? (
      <h3 className="font-semibold sm:text-[26px] text-[18px] text-white absolute z-0 lg:bottom-20 lg:rotate-[-90deg] lg:origin-[0,0]">
        {catalog}
      </h3>
    ) : (
      // Content for the active card
      <div className="absolute inset-0 flex flex-col">
        {/* Chart overlay */}
        <div className="absolute inset-0 z-10 p-4">
          <RoastProfileChart roastData={roastData} />
        </div>

        {/* Bottom info overlay */}
        <div className="absolute bottom-0 p-8 justify-start w-full flex-col bg-[rgba(0,0,0,0.5)] rounded-b-[24px] z-20">
          <div
            className={`${styles.flexCenter} w-[60px] h-[60px] glassmorphism mb-[16px] rounded-[12px]`}
          >
            <img
              src="/headset.svg"
              alt="headset"
              className="w-1/2 h-1/2 object-cotain"
            />
          </div>
          <p className="font-normal text-[16px] leading-[20.16px] text-white uppercase">
            Enter Variable
          </p>
          <h2 className="mt-[24px] font-semibold sm:text-[32px] text-[24px] text-white">
            {catalog} | {process} | {altitude} | {variety}
          </h2>
        </div>
      </div>
    )}
  </motion.div>
);

export default ExploreCard;
