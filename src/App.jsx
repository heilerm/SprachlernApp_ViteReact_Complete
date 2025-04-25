import React, { useState } from 'react';
import './index.css';
import TokenizedText from './components/TokenizedText_colored';
import TextLevelAnalyzer from './components/TextLevelAnalyzer';


export default function App() {
  const [inputText, setInputText] = useState("");
  const [highlightedCategory, setHighlightedCategory] = useState("");
  const [selectedWord, setSelectedWord] = useState("");

  const handleTokenClick = (word) => {
    setSelectedWord(word);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-red-500">SprachlernApp</h1>
        
        <div className="grid grid-cols-1 gap-8">
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Text Input</h2>
              <textarea
                className="w-full h-32 p-2 border rounded"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Enter your text here..."
              />
            </div>

            {inputText && (
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Tokenized Text</h2>
                <TokenizedText
                  text={inputText}
                  glossary={{}}
                  cefrLevel="A1"
                  setHighlightedCategory={setHighlightedCategory}
                  onTokenClick={handleTokenClick}
                />
                <TextLevelAnalyzer text={inputText} glossary={Object.values(glossary)} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}