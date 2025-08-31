
import React from 'react';
import { AnalysisResult, UserImage } from '../types';
import StarIcon from './icons/StarIcon';

interface ResultDisplayProps {
  originalImage: UserImage;
  generatedImage: string;
  analysis: AnalysisResult;
  onStartOver: () => void;
}

const RatingStars: React.FC<{ rating: number }> = ({ rating }) => {
    return (
        <div className="flex items-center">
            {[...Array(10)].map((_, i) => (
                <StarIcon key={i} className={`w-6 h-6 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`} />
            ))}
            <span className="ml-3 text-xl font-bold text-gray-700">{rating.toFixed(1)} / 10</span>
        </div>
    );
};

const ResultDisplay: React.FC<ResultDisplayProps> = ({ originalImage, generatedImage, analysis, onStartOver }) => {
  return (
    <div className="w-full max-w-6xl mx-auto p-8 animate-fade-in">
      <h2 className="text-4xl font-bold text-gray-800 text-center mb-8">Your New Look!</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div className="text-center">
          <h3 className="text-2xl font-semibold mb-4 text-gray-600">Before</h3>
          <img src={originalImage.dataUrl} alt="Original" className="rounded-2xl shadow-xl w-full object-cover aspect-square" />
        </div>
        <div className="text-center">
          <h3 className="text-2xl font-semibold mb-4 text-indigo-600">After</h3>
          <img src={generatedImage} alt="Generated Hairstyle" className="rounded-2xl shadow-xl w-full object-cover aspect-square" />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Stylist's Analysis</h3>
        <div className="space-y-6">
            <div>
                <h4 className="text-lg font-semibold text-gray-600 mb-2">Rating</h4>
                <RatingStars rating={analysis.rating} />
            </div>
             <div>
                <h4 className="text-lg font-semibold text-gray-600 mb-2">Styling Advice</h4>
                <p className="text-gray-700 leading-relaxed">{analysis.advice}</p>
            </div>
             <div>
                <h4 className="text-lg font-semibold text-gray-600 mb-2">Recommended Products</h4>
                <div className="flex flex-wrap gap-3">
                    {analysis.products.map((product, index) => (
                        <span key={index} className="bg-indigo-100 text-indigo-800 text-sm font-medium px-4 py-2 rounded-full">{product}</span>
                    ))}
                </div>
            </div>
        </div>
      </div>

      <div className="text-center mt-12">
        <button 
            onClick={onStartOver}
            className="bg-indigo-600 text-white font-bold py-3 px-8 rounded-full hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
            Try Another Style
        </button>
      </div>
    </div>
  );
};

export default ResultDisplay;
