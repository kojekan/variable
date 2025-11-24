// The parent component that uses ExploreCard (e.g., ExploreSection.jsx)

'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient'; // Adjust path as needed
import ExploreCard from '../components/ExploreCard'; // Adjust path as needed
import { getRoastProfile, getBrewChart } from '../utils/dbService'; // Add services

// A common initial state for the active card, often the first item's catalog
const initialActiveCardId = null; // Will be set when data loads

const ExploreSection = () => {
  const [active, setActive] = useState(initialActiveCardId);
  const [exploreWorlds, setExploreWorlds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [roastProfileData, setRoastProfileData] = useState([]);
  const [brewChartData, setBrewChartData] = useState([]);

  // Function to fetch data from Supabase
  useEffect(() => {
    const fetchWorlds = async () => {
      // Assuming your table is named 'worlds' and has columns like:
      // id (string/uuid), title (string), imgUrl (string)
      const { data, error: fetchError } = await supabase
        .from('beans_catalogue')
        .select('Catalog, Origin, Process, Altitude, Processor, Variety, weight_loss, Density, Tier')
        .eq('Online', 'TRUE'); // Use boolean true, not string
      if (fetchError) {
        console.error('Error fetching data:', fetchError);
        // Don't set error state, just set empty array for blank display
        setExploreWorlds([]);
        setIsLoading(false);
      } else {
        // Handle null/undefined data case - ensure it's always an array
        console.log('Raw data from Supabase:', data);
        console.log('Data type:', typeof data, 'Is array:', Array.isArray(data));
        const worldsData = Array.isArray(data) ? data : [];
        console.log('Processed worlds data:', worldsData);
        console.log('Worlds data length:', worldsData.length);
        setExploreWorlds(worldsData);
        // Set the active card to the first item's catalog (used as beanId) if data is available
        if (worldsData.length > 0 && worldsData[0]) {
          console.log('First item:', worldsData[0]);
          const firstCatalog = worldsData[0].Catalog || worldsData[0].Catalog;
          if (firstCatalog) {
            console.log('Setting active to:', firstCatalog);
            setActive(firstCatalog);
          } else {
            console.warn('First item has no Catalog property:', Object.keys(worldsData[0]));
          }
        } else {
          console.warn('No worlds data available or first item is missing');
        }
        setIsLoading(false);
      }
    };

    fetchWorlds();
  }, []); // Run only on initial mount

  // Function to fetch roast profile data
  const fetchRoastProfile = async (beanId) => {
    try {
      const result = await getRoastProfile(beanId);
      if (result.error || !result.success) {
        console.error('Error fetching roast profile:', result.error);
        setRoastProfileData([]);
      } else {
        // Handle null data case - default to empty array
        setRoastProfileData(result.data ?? []);
      }
    } catch (err) {
      console.error('Unexpected error fetching roast profile:', err);
      setRoastProfileData([]);
    }
  };

  const fetchBrewChart = async (beanId) => {
    try {
      const result = await getBrewChart({ beanId, limit: 200, orderBy: 'created_at', ascending: false });
      if (result.error || !result.success) {
        console.error('Error fetching brew chart:', result.error);
        setBrewChartData([]);
      } else {
        // Handle null data case - default to empty array
        setBrewChartData(result.data ?? []);
      }
    } catch (err) {
      console.error('Unexpected error fetching brew chart:', err);
      setBrewChartData([]);
    }
  };

  // Load roast profile for the initially active card
  useEffect(() => {
    if (active && Array.isArray(exploreWorlds) && exploreWorlds.length > 0) {
      fetchRoastProfile(active);
      fetchBrewChart(active);
    }
  }, [active, exploreWorlds]);

  const handleClick = (Catalog) => {
    setActive(Catalog);
    // Fetch roast profile and brew chart data when a card is clicked
    // catalog is used as beanId for database queries
    fetchRoastProfile(Catalog);
    fetchBrewChart(Catalog);
  };

  // if (isLoading) return <div>Loading cards...</div>;

  // Safety check: ensure exploreWorlds is always an array
  const safeWorlds = Array.isArray(exploreWorlds) ? exploreWorlds : [];
  console.log('Rendering - exploreWorlds:', exploreWorlds);
  console.log('Rendering - safeWorlds:', safeWorlds);
  console.log('Rendering - safeWorlds.length:', safeWorlds.length);
  console.log('Rendering - active:', active);
  // If no data, return blank/empty instead of error message
  if (safeWorlds.length === 0) {
    console.log('⚠️ No worlds data, returning null. exploreWorlds state:', exploreWorlds);
    return null;
  }

  return (
    <section className="paddings">
      {/* ... your section content, e.g., headings ... */}
      <div className="flex lg:flex-row flex-col min-h-[70vh] sm:min-h-[80vh] md:min-h-[90vh] lg:min-h-[90vh] gap-5">
        {safeWorlds.map((world, index) => {
          // Convert PascalCase from database to camelCase for component props
          const catalog = world.Catalog || world.catalog;

          // Determine if this card is active
          const isActive = active === catalog;
          // Set a taller minHeight for the active card
          const cardHeight = isActive
            ? 'h-[1200px] sm:h-[800px] md:h-[800px] lg:h-[950px]'
            : 'h-[1000px] sm:h-[600px] md:h-[500px] lg:h-[700px]';

          return (
            <ExploreCard
              key={catalog}
              catalog={catalog}
              processor={world.Processor || world.processor}
              origin={world.Origin || world.origin}
              process={world.Process || world.process}
              altitude={world.Altitude || world.altitude}
              variety={world.Variety || world.variety}
              density={world.Density || world.density}
              weight_loss={world.weight_loss || world.weight_loss}
              tier={world.Tier || world.tier}
              index={index}
              active={active}
              handleClick={handleClick}
              roastData={isActive ? roastProfileData : []}
              brewData={isActive ? brewChartData : []}
              cardHeight={cardHeight}
            />
          );
        })}
      </div>
    </section>
  );
};

export default ExploreSection;
