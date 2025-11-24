'use client';

import { motion } from 'framer-motion';
// import styles from '../styles';
import { fadeIn } from '../utils/motion';
import RoastProfileChart from './RoastProfileChart';
import BrewChart from './BrewChart';

// 1. ADD 'active' and 'handleClick' to the destructuring of props.
// 2. Add 'index' back for the fadeIn animation.
const ExploreCard = ({
  catalog,
  processor,
  origin,
  process,
  altitude,
  variety,
  weight_loss,
  density,
  tier,
  index, // Added: Used for the fadeIn animation delay
  active, // Added: To check if this card is currently active
  handleClick, // Added: The function to change the active card
  roastData, // Added: Roast profile data for the chart
  brewData, // Added: Brew chart data
}) => (
  // THIS ONE FOR THE CARD TALL
  <motion.div
    variants={fadeIn('right', 'spring', index * 1.5, 1.5)}
    className={`relative ${
      active === catalog ? 'lg:flex-[3.5] flex-[150]' : 'lg:flex-[0.5] flex-[5]'
    } flex items-center justify-center min-w-[170px] lg:min-w-[80px] h-[1000px]
    ${
      // Make only the *active* card taller on mobile, others are shorter.
      active === catalog
        ? 'h-[2000px] sm:h-[1000px] md:h-[500px] lg:h-[700px]'
        : 'h-[2000px] sm:h-[600px] md:h-[500px] lg:h-[700px]'
    }
    transition-[flex] duration-[0.7s] ease-out-flex cursor-pointer bg-gray-900 rounded-[24px] overflow-hidden border border-gray-700`}
    onClick={() => handleClick(catalog)}
  >
    {/* <img
      src={imageUrl}
      alt={catalog}
      className="absolute w-full h-full object-cover rounded-[24px]"
    /> */}

    {/* 5. CORRECTED: Check if the current card's 'catalog' does NOT match the 'active' state. */}
    {active !== catalog ? (
      <div className="absolute inset-0 flex items-center justify-center">
        <h3 className="font-semibold sm:text-[26px] text-[18px] text-white z-10 lg:bottom-20 lg:rotate-[-90deg] lg:origin-[0,0] whitespace-nowrap">
          {catalog || 'No catalog'}
        </h3>
      </div>
    ) : (
      // Content for the active card
      <div className="absolute inset-1 flex flex-col h-[100%] lg:h-[100%]">
        {/* Chart overlay */}
        <div className="absolute inset-0 z-5 p-1 sm:p-1 overflow-auto h-full">
          <div className="flex flex-col lg:flex-row gap-2 sm:gap-2 lg:gap-2 h-[50%]">
            {/* Roast Profile - 70% width on large screens, full width on mobile */}
            <div className="lg:w-[70%] w-[100%] h-[10%] lg:h-[100%]">
              <RoastProfileChart roastData={roastData} />
            </div>
            {/* Brew Chart - 30% width on large screens, full width on mobile */}
            <div className="hidden lg:block lg:w-[30%] h-[50%] lg:h-[100%]">
              <BrewChart data={brewData || []} />
            </div>
          </div>
        </div>

        {/* Bottom info overlay */}
        <div className="absolute bottom-0 p-8 justify-start w-full flex-col bg-[rgba(0,0,0,0.5)] rounded-b-[24px] z-20">
          {/* <div
            className={`${styles.flexCenter} w-[60px] h-[60px] glassmorphism mb-[6px] rounded-[12px]`}
          >
            <img
              src="/headset.svg"
              alt="headset"
              className="w-1/2 h-1/2 object-cotain"
            />
          </div> */}
          {/* <p className="font-normal text-[16px] leading-[20.16px] text-white uppercase">
            Enter Variable
          </p> */}
          <div className="grid grid-cols-9 sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-[5px]">
            <div className="bg-gray-800 rounded p-2 flex flex-col items-start">
              <span className="font-semibold text-white text-[12px] lg:text-[18px]">{catalog}</span>
              <span className="text-[10px] sm:text-xs text-gray-300 mt-1">Catalog:</span>
            </div>
            <div className="bg-gray-800 rounded p-2 flex flex-col items-start">
              <span className="font-semibold text-white text-[12px] lg:text-[18px]">{origin}</span>
              <span className="text-[10px] sm:text-xs text-gray-300 mt-1">Origin:</span>
            </div>
            <div className="bg-gray-800 rounded p-2 flex flex-col items-start">
              <span className="font-semibold text-white text-[12px] lg:text-[18px]">{process}</span>
              <span className="text-[10px] sm:text-xs text-gray-300 mt-1">Process:</span>
            </div>
            <div className="bg-gray-800 rounded p-2 flex flex-col items-start">
              <span className="font-semibold text-white text-[12px] lg:text-[18px]">{altitude} masl</span>
              <span className="text-[10px] sm:text-xs text-gray-300 mt-1">Altitude:</span>
            </div>
            <div className="bg-gray-800 rounded p-2 flex flex-col items-start">
              <span className="font-semibold text-white text-[12px] lg:text-[18px]">{variety}</span>
              <span className="text-[10px] sm:text-xs text-gray-300 mt-1">Variety:</span>
            </div>
            <div className="bg-gray-800 rounded p-2 flex flex-col items-start">
              <span className="font-semibold text-white text-[12px] lg:text-[18px]">{processor}</span>
              <span className="text-[10px] sm:text-xs text-gray-300 mt-1">Processor:</span>
            </div>
            <div className="bg-gray-800 rounded p-2 flex flex-col items-start">
              <span className="font-semibold text-white text-[12px] lg:text-[18px]">{density} gr/L</span>
              <span className="text-[10px] sm:text-xs text-gray-300 mt-1">Density:</span>
            </div>
            <div className="bg-gray-800 rounded p-2 flex flex-col items-start">
              <span className="font-semibold text-white text-[12px] lg:text-[18px]">{weight_loss}</span>
              <span className="text-[10px] sm:text-xs text-gray-300 mt-1">WL:</span>
            </div>
            <div className="bg-gray-800 rounded p-2 flex flex-col items-start">
              <span className="font-semibold text-white text-[12px] lg:text-[18px]">{tier}</span>
              <span className="text-[10px] sm:text-xs text-gray-300 mt-1">Tier:</span>
            </div>
          </div>
        </div>
      </div>
    )}
  </motion.div>
);

export default ExploreCard;
