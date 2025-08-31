import React, { useState } from 'react';
import { Hairstyle, UserImage } from '../types';
import { MENS_HAIRSTYLES, WOMENS_HAIRSTYLES } from '../constants';

interface HairstyleSelectorProps {
  userImage: UserImage;
  onHairstyleSelect: (hairstyle: Hairstyle) => void;
  onBack: () => void;
}

const HairstyleSelector: React.FC<HairstyleSelectorProps> = ({ userImage, onHairstyleSelect, onBack }) => {
  const [activeTab, setActiveTab] = useState<'female' | 'male'>('female');
  const [customPrompt, setCustomPrompt] = useState('');

  const handleCustomSubmit = () => {
    if (customPrompt.trim()) {
      onHairstyleSelect({
        id: 'custom',
        name: 'Custom Style',
        prompt: customPrompt,
        imageUrl: '', // Not needed for custom
        gender: activeTab,
      });
    }
  };
  
  const hairstylesToDisplay = activeTab === 'female' ? WOMENS_HAIRSTYLES : MENS_HAIRSTYLES;

  const tabClass = (tabName: 'female' | 'male') => 
    `px-6 py-2 text-lg font-semibold transition-colors duration-300 focus:outline-none ${
      activeTab === tabName 
        ? 'text-indigo-600 border-b-2 border-indigo-600' 
        : 'text-gray-500 hover:text-gray-800'
    }`;
  
  return (
    <div className="w-full max-w-5xl mx-auto p-8">
       <div className="flex items-center mb-8">
        <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-200 transition-colors mr-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h2 className="text-3xl font-bold text-gray-800">Step 2: Choose a Style</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Your Photo</h3>
          <img src={userImage.dataUrl} alt="User upload" className="rounded-2xl shadow-lg w-full object-cover aspect-square" />
        </div>
        <div className="md:col-span-3">
          <div className="flex border-b border-gray-200 mb-6">
            <button onClick={() => setActiveTab('female')} className={tabClass('female')}>Women's</button>
            <button onClick={() => setActiveTab('male')} className={tabClass('male')}>Men's</button>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6">
            <h4 className="font-semibold text-gray-800 mb-2">Create a Custom Style</h4>
            <p className="text-sm text-gray-500 mb-3">Can't find what you're looking for? Describe the hairstyle you want in detail.</p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="e.g., 'wavy shoulder-length hair with red highlights'"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
              />
              <button 
                onClick={handleCustomSubmit} 
                disabled={!customPrompt.trim()}
                className="bg-indigo-600 text-white font-semibold px-5 py-2 rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Generate
              </button>
            </div>
          </div>
          
           <h3 className="text-xl font-semibold mb-4 text-gray-700">Or Select a Preset Style</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {hairstylesToDisplay.map((style) => (
              <div
                key={style.id}
                onClick={() => onHairstyleSelect(style)}
                className="group cursor-pointer rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1"
              >
                <div className="relative">
                  <img src={style.imageUrl} alt={style.name} className="w-full h-40 object-cover" />
                  <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-40 transition-opacity duration-300 flex items-center justify-center">
                     <p className="text-white text-center font-semibold p-2">{style.name}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HairstyleSelector;