// The parent component that uses ExploreCard (e.g., ExploreSection.jsx)

'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient'; // Adjust path as needed
import ExploreCard from '../components/ExploreCard'; // Adjust path as needed
import { getRoastProfile } from '../utils/dbService'; // Add roast profile service

// A common initial state for the active card, often the first item's ID
const initialActiveCardId = '2'; // Or whatever your first card's ID is

const ExploreSection = () => {
  const [active, setActive] = useState(initialActiveCardId);
  const [exploreWorlds, setExploreWorlds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [roastProfileData, setRoastProfileData] = useState([]);

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

  // Load roast profile for the initially active card
  useEffect(() => {
    if (active && exploreWorlds.length > 0) {
      fetchRoastProfile(active);
    }
  }, [active, exploreWorlds]);

  const handleClick = (id) => {
    setActive(id);
    // Fetch roast profile data when a card is clicked
    fetchRoastProfile(id);
  };

  if (isLoading) return <div>Loading cards...</div>;
  if (error) return <div>Error: {error}</div>;
  if (exploreWorlds.length === 0) return <div>No worlds found.</div>;

  return (
    <section className="paddings">
      {/* ... your section content, e.g., headings ... */}
      <div className="flex lg:flex-row flex-col min-h-[70vh] gap-5">
        {exploreWorlds.map((world, index) => (
          <ExploreCard
            key={world.id}
            {...world} // Passes id, title, and imgUrl as props
            imageUrl={world.image_url} // Convert snake_case to camelCase
            index={index}
            active={active}
            handleClick={handleClick}
            roastData={active === world.id ? roastProfileData : []}
          />
        ))}
      </div>
    </section>
  );
};

export default ExploreSection;
