'use client';

import { useState } from 'react';

const Japanese = () => {
  const [formData, setFormData] = useState({
    waterTotal: '',
    waterRatio: '',
    beansUsed: '',
    diluteWater: 40
  });
  const [result, setResult] = useState('');
  const [calculatedField, setCalculatedField] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Reset calculated field styling when user types
    setCalculatedField('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Parse input values
    const totalWater = parseFloat(formData.waterTotal);
    const waterRatio = parseFloat(formData.waterRatio);
    const beansUsed = parseFloat(formData.beansUsed);
    const dilution = parseFloat(formData.diluteWater / 100);

    // Calculate the total water including ice (50% ice, 50% water)
    const effectiveWater = (0.5) * (1 + dilution);

    // Check which fields are empty or invalid
    const isWaterTotalEmpty = formData.waterTotal === '' || isNaN(totalWater);
    const isWaterRatioEmpty = formData.waterRatio === '' || isNaN(waterRatio);
    const isBeansUsedEmpty = formData.beansUsed === '' || isNaN(beansUsed);

    // Count how many fields are empty
    const emptyFields = [isWaterTotalEmpty, isWaterRatioEmpty, isBeansUsedEmpty].filter(Boolean).length;

    console.log('Empty fields:', { isWaterTotalEmpty, isWaterRatioEmpty, isBeansUsedEmpty, emptyFields });

    if (emptyFields !== 1) {
      setResult('Please leave exactly one field blank.');
      return;
    }

    setResult('Voila!');

    // Perform calculations and update the blank input field
    if (isWaterTotalEmpty) {
      const numerator = beansUsed * waterRatio;
      const calculatedTotalWater = (numerator / (effectiveWater * 1.1765));
      setFormData(prev => ({
        ...prev,
        waterTotal: calculatedTotalWater.toFixed(1)
      }));
      setCalculatedField('waterTotal');
    } else if (isWaterRatioEmpty) {
      const calculatedWaterRatio = (effectiveWater * 1.1765 * totalWater) / beansUsed;
      setFormData(prev => ({
        ...prev,
        waterRatio: calculatedWaterRatio.toFixed(1)
      }));
      setCalculatedField('waterRatio');
    } else if (isBeansUsedEmpty) {
      const calculatedBeansUsed = (effectiveWater * 1.1765 * totalWater) / waterRatio;
      setFormData(prev => ({
        ...prev,
        beansUsed: calculatedBeansUsed.toFixed(1)
      }));
      setCalculatedField('beansUsed');
    }

    console.log("EW:", effectiveWater, dilution); // Debug print
  };

  const getInputStyle = (fieldName) => {
    if (calculatedField === fieldName) {
      return {
        backgroundColor: 'red',
        color: 'white'
      };
    }
    return {
      backgroundColor: 'white',
      color: 'black'
    };
  };

  return (
    <section className="paddings">
      <div className="innerWidth mx-auto">
        {/* Section Header */}
        <div className="flex justify-center items-center mb-0">
          <div className="flex flex-col justify-center items-center mb-4">
            <h2 className="font-bold md:text-[64px] text-[40px] text-white text-center">
              Japanese Formula
            </h2>
            <p className="text-white text-center mt-4">
              for refreshing and dynamic recipe but with the same tasting as hot.
            </p>
          </div>
        </div>
        {/* Form Container */}
        <div className="flex justify-center items-center">
          <form 
            id="coffee-form" 
            onSubmit={handleSubmit}
            className="glassmorphism p-8 rounded-[24px] max-w-md w-full"
          >

            <div className="space-y-6">
              <div>
                <label 
                  htmlFor="waterTotal" 
                  className="block text-white mb-3 font-medium"
                >
                  Total Water + Ice (ml) [50:50]:
                </label>
                <input
                  type="number"
                  id="waterTotal"
                  name="waterTotal"
                  value={formData.waterTotal}
                  onChange={handleInputChange}
                  style={getInputStyle('waterTotal')}
                  className="w-full p-4 rounded-[12px] border border-white/20 focus:border-white/50 focus:outline-none transition-all duration-300"
                />
              </div>

              <div>
                <label 
                  htmlFor="waterRatio" 
                  className="block text-white mb-3 font-medium"
                >
                  Beans to Water Ratio (e.g., 16 means 1:16):
                </label>
                <input
                  type="number"
                  id="waterRatio"
                  name="waterRatio"
                  value={formData.waterRatio}
                  onChange={handleInputChange}
                  style={getInputStyle('waterRatio')}
                  className="w-full p-4 rounded-[12px] border border-white/20 focus:border-white/50 focus:outline-none transition-all duration-300"
                />
              </div>

              <div>
                <label 
                  htmlFor="beansUsed" 
                  className="block text-white mb-3 font-medium"
                >
                  Beans Used (gr):
                </label>
                <input
                  type="number"
                  step="0.1"
                  id="beansUsed"
                  name="beansUsed"
                  value={formData.beansUsed}
                  onChange={handleInputChange}
                  style={getInputStyle('beansUsed')}
                  className="w-full p-4 rounded-[12px] border border-white/20 focus:border-white/50 focus:outline-none transition-all duration-300"
                />
              </div>

              <div>
                <label 
                  htmlFor="diluteWater" 
                  className="block text-white mb-3 font-medium"
                >
                  Diluted Water Percentage (0-100%):
                </label>
                <input
                  type="number"
                  id="diluteWater"
                  name="diluteWater"
                  value={formData.diluteWater}
                  onChange={handleInputChange}
                  min="0"
                  max="100"
                  className="w-full p-4 rounded-[12px] border border-white/20 focus:border-white/50 focus:outline-none transition-all duration-300 bg-white/10 text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-[12px] transition-all duration-300 transform hover:scale-105"
              >
                Calculate
              </button>

              {result && (
                <div className="text-center">
                  <p className="text-white text-xl font-semibold mt-6 p-4 rounded-[12px] bg-white/10">
                    {result}
                  </p>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Japanese;
