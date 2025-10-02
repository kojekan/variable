// The parent component that uses ExploreCard (e.g., ExploreSection.jsx)
"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient"; // Adjust path as needed
import ExploreCard from "../components/ExploreCard"; // Adjust path as needed

// A common initial state for the active card, often the first item's ID
const initialActiveCardId = "2"; // Or whatever your first card's ID is

const ExploreSection = () => {
  const [active, setActive] = useState(initialActiveCardId);
  const [exploreWorlds, setExploreWorlds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch data from Supabase
  useEffect(() => {
    const fetchWorlds = async () => {
      // Assuming your table is named 'worlds' and has columns like:
      // id (string/uuid), title (string), imgUrl (string)
      let { data, error } = await supabase
        .from("beans_catalog") // Change 'worlds' to your actual table name
        .select("id, catalog, origin, process, altitude, variety, image_url") // Select the columns needed by ExploreCard
        .limit(3); // Optional: limit the number of cards

      if (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load data.");
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

  const handleClick = (id) => {
    setActive(id);
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
            index={index}
            active={active}
            handleClick={handleClick}
          />
        ))}
      </div>
    </section>
  );
};

export default ExploreSection;
