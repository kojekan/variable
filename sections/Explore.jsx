// The parent component that uses ExploreCard (e.g., ExploreSection.jsx)

'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient'; // Adjust path as needed
import ExploreCard from '../components/ExploreCard'; // Adjust path as needed
import { getRoastProfile, getBrewChart } from '../utils/dbService'; // Add services

// A common initial state for the active card, often the first item's ID
const initialActiveCardId = '2'; // Or whatever your first card's ID is

const ExploreSection = () => {
  const [active, setActive] = useState(initialActiveCardId);
  const [exploreWorlds, setExploreWorlds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [roastProfileData, setRoastProfileData] = useState([]);
  const [brewChartData, setBrewChartData] = useState([]);

  // Function to fetch data from Supabase
  useEffect(() => {
    const fetchWorlds = async () => {
      // Assuming your table is named 'worlds' and has columns like:
      // id (string/uuid), title (string), imgUrl (string)
      const { data, error: fetchError } = await supabase
        .from('beans_catalog') // Change 'worlds' to your actual table name
        .select('id, catalog, origin, process, altitude, variety, image_url') // Select the columns needed by ExploreCard
        .limit(3); // Optional: limit the number of cards

      if (fetchError) {
        console.error('Error fetching data:', fetchError);
        setError('Failed to load data.');
        setIsLoading(false);
      } else {
        setExploreWorlds(data);
        // Set the active card to the first item's ID if data is available
        if (data.length > 0) {
          setActive(data[0].id);
        }
        setIsLoading(false);
      }
    };

    fetchWorlds();
  }, []); // Run only on initial mount

  // Function to fetch roast profile data
  const fetchRoastProfile = async (beanId) => {
    try {
      const { data, error: roastError } = await getRoastProfile(beanId);
      if (roastError) {
        console.error('Error fetching roast profile:', roastError);
        setRoastProfileData([]);
      } else {
        setRoastProfileData(data);
      }
    } catch (err) {
      console.error('Unexpected error fetching roast profile:', err);
      setRoastProfileData([]);
    }
  };

  const fetchBrewChart = async (beanId) => {
    try {
      const { data, error: brewError } = await getBrewChart({ beanId, limit: 200, orderBy: 'created_at', ascending: false });
      if (brewError) {
        console.error('Error fetching brew chart:', brewError);
        setBrewChartData([]);
      } else {
        setBrewChartData(data);
      }
    } catch (err) {
      console.error('Unexpected error fetching brew chart:', err);
      setBrewChartData([]);
    }
  };

  // Load roast profile for the initially active card
  useEffect(() => {
    if (active && exploreWorlds.length > 0) {
      fetchRoastProfile(active);
      fetchBrewChart(active);
    }
  }, [active, exploreWorlds]);

  const handleClick = (id) => {
    setActive(id);
    // Fetch roast profile and brew chart data when a card is clicked
    fetchRoastProfile(id);
    fetchBrewChart(id);
  };

  if (isLoading) return <div>Loading cards...</div>;
  if (error) return <div>Error: {error}</div>;
  if (exploreWorlds.length === 0) return <div>No worlds found.</div>;

  return (
    <section className="paddings">
      {/* ... your section content, e.g., headings ... */}
      <div className="flex lg:flex-row flex-col min-h-[70vh] sm:min-h-[80vh] md:min-h-[90vh] lg:min-h-[70vh] gap-5">
        {exploreWorlds.map((world, index) => (
          <ExploreCard
            key={world.id}
            {...world} // Passes id, title, and imgUrl as props
            imageUrl={world.image_url} // Convert snake_case to camelCase
            index={index}
            active={active}
            handleClick={handleClick}
            roastData={active === world.id ? roastProfileData : []}
            brewData={active === world.id ? brewChartData : []}
          />
        ))}
      </div>
    </section>
  );
};

export default ExploreSection;
