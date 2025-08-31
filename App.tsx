
import React, { useState, useCallback } from 'react';
import { AppStep, Hairstyle, UserImage, AnalysisResult } from './types';
import FileUpload from './components/FileUpload';
import HairstyleSelector from './components/HairstyleSelector';
import ResultDisplay from './components/ResultDisplay';
import Loader from './components/Loader';
import { editImageWithHairstyle, analyzeHairstyle } from './services/geminiService';

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>('upload');
  const [userImage, setUserImage] = useState<UserImage | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleImageUpload = (image: UserImage) => {
    setUserImage(image);
    setStep('selectStyle');
  };

  const handleHairstyleSelect = useCallback(async (hairstyle: Hairstyle) => {
    if (!userImage) return;

    setStep('processing');
    setIsLoading(true);
    setError(null);

    try {
      const newImage = await editImageWithHairstyle(userImage.file, hairstyle.prompt);
      setGeneratedImage(newImage);
      
      const analysis = await analyzeHairstyle(newImage);
      setAnalysisResult(analysis);
      
      setStep('result');
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      setStep('selectStyle'); // Go back to selection on error
    } finally {
      setIsLoading(false);
    }
  }, [userImage]);

  const handleStartOver = () => {
    // Keep user image but allow choosing a new style
    setGeneratedImage(null);
    setAnalysisResult(null);
    setError(null);
    setStep('selectStyle');
  };

  const handleReset = () => {
    // Fully reset the app
    setUserImage(null);
    setGeneratedImage(null);
    setAnalysisResult(null);
    setError(null);
    setStep('upload');
  }

  const renderStep = () => {
    switch (step) {
      case 'upload':
        return <FileUpload onImageUpload={handleImageUpload} />;
      case 'selectStyle':
        if (userImage) {
          return <HairstyleSelector userImage={userImage} onHairstyleSelect={handleHairstyleSelect} onBack={handleReset} />;
        }
        return null;
      case 'processing':
        return <Loader />;
      case 'result':
        if (userImage && generatedImage && analysisResult) {
          return <ResultDisplay originalImage={userImage} generatedImage={generatedImage} analysis={analysisResult} onStartOver={handleStartOver} />;
        }
        return null;
      default:
        return <div>Invalid state</div>;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-center transition-all duration-500">
      <header className="w-full p-4 text-center">
        <h1 className="text-2xl font-bold text-indigo-600">AI Hair Stylist</h1>
      </header>
      <main className="flex-grow w-full flex items-center justify-center">
        {error && (
            <div className="absolute top-20 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg z-10" role="alert">
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{error}</span>
                 <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => setError(null)}>
                    <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                </span>
            </div>
        )}
        {renderStep()}
      </main>
      <footer className="w-full p-4 text-center text-gray-500 text-sm">
        <p>Powered by Gemini AI</p>
      </footer>
    </div>
  );
};

export default App;
