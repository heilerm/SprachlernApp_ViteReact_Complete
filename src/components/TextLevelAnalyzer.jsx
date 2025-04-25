import React from 'react';
import { useState, useEffect } from 'react';

// CEFR Level mapping
const CEFR_LEVELS = {
    'A1': 1,
    'A2': 2,
    'B1': 3,
    'B2': 4,
    'C1': 5,
    'C2': 6
};

const CEFR_LEVEL_NAMES = {
    1: 'A1',
    2: 'A2',
    3: 'B1',
    4: 'B2',
    5: 'C1',
    6: 'C2'
};

const TextLevelAnalyzer = ({ text, glossary }) => {
    const [textLevel, setTextLevel] = useState(null);
    const [difficultWords, setDifficultWords] = useState([]);
    const [averageLevel, setAverageLevel] = useState(null);

    useEffect(() => {
        if (text && glossary) {
            analyzeTextLevel();
        }
    }, [text, glossary]);

    const analyzeTextLevel = () => {
        const words = text.toLowerCase().split(/\s+/);
        let maxLevel = 0;
        let totalLevel = 0;
        let wordCount = 0;
        const difficultWordsList = [];

        words.forEach(word => {
            const glossaryEntry = glossary.find(entry => 
                entry.word.toLowerCase() === word.toLowerCase()
            );

            if (glossaryEntry && glossaryEntry.cefr_level) {
                const level = CEFR_LEVELS[glossaryEntry.cefr_level];
                if (level) {
                    maxLevel = Math.max(maxLevel, level);
                    totalLevel += level;
                    wordCount++;

                    if (level >= 4) { // B2 or higher
                        difficultWordsList.push({
                            word: word,
                            level: CEFR_LEVEL_NAMES[level]
                        });
                    }
                }
            }
        });

        setTextLevel(CEFR_LEVEL_NAMES[maxLevel]);
        setAverageLevel(wordCount > 0 ? CEFR_LEVEL_NAMES[Math.ceil(totalLevel / wordCount)] : null);
        setDifficultWords(difficultWordsList);
    };

    return (
        <div className="mt-4 p-4 bg-white rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Text Level Analysis</h3>
            <div className="space-y-2">
                <p>
                    <span className="font-medium">Text Level:</span> {textLevel || 'Unknown'}
                </p>
                {averageLevel && (
                    <p>
                        <span className="font-medium">Average Word Level:</span> {averageLevel}
                    </p>
                )}
                {difficultWords.length > 0 && (
                    <div>
                        <p className="font-medium">Difficult Words:</p>
                        <ul className="list-disc pl-4">
                            {difficultWords.map((word, index) => (
                                <li key={index}>
                                    {word.word} (Level: {word.level})
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TextLevelAnalyzer; 