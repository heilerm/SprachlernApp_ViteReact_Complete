
import React, { useState, useEffect } from 'react';
import './index.css';
import GlossaryPopover from './GlossaryPopover_autoclose';
import DragAndDropSentence from './DragAndDropSentence';
import TokenizedText from './TokenizedText_colored';
import ColorLegend from './ColorLegend';
import SentenceStructure from './SentenceStructure';
//import SentenceStructure from './SentenceStructure_debug';


function levelRank(level) {
  const ranks = { A1: 1, A2: 2, B1: 3, B2: 4, C1: 5, C2: 6 };
  return ranks[level] || 0;
}

function SentenceReorder({ correctOrder }) {
  const [shuffled, setShuffled] = useState([]);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    setShuffled([...correctOrder].sort(() => 0.5 - Math.random()));
  }, [correctOrder]);

  function checkOrder() {
    if (shuffled.join(" ") === correctOrder.join(" ")) {
      setFeedback("✅ Satzstellung korrekt!");
    } else {
      setFeedback("❌ Nicht korrekt. Tipp: Im Italienischen steht das direkte Objekt meist nach dem Verb.");
    }
  }

  return (
    <div className="mt-6">
      <h3 className="font-bold mb-2">Satzstellungs-Spiel</h3>
      <div className="flex flex-wrap gap-2 mb-2">
        {shuffled.map((word, idx) => (
          <button
            key={idx}
            className="px-2 py-1 border rounded bg-gray-100"
            onClick={() => {
              const newOrder = [...shuffled];
              const [moved] = newOrder.splice(idx, 1);
              newOrder.push(moved);
              setShuffled(newOrder);
            }}
          >
            {word}
          </button>
        ))}
      </div>
      <button onClick={checkOrder} className="bg-blue-500 text-white px-3 py-1 rounded">Prüfen</button>
      <div className="mt-2 text-sm">{feedback}</div>
    </div>
  );
}

export default function App() {
  const glossaries = {
    sindaco: "glossary_sindaco_translation.json",
    buongiorno: "glossary_ogni_mattina.json"
  };
  const [glossary, setGlossary] = useState({});
  const [cefrLevel, setCefrLevel] = useState("A1");
  const [textKey, setTextKey] = useState("sindaco");
  const [inputText, setInputText] = useState("Ogni mattina Anna prende un caffè e legge il giornale.");

  const texts = {
    sindaco: {
      it: "Il nuovo sindaco di Milano è Giuseppe Sala.",
      de: "Der neue Bürgermeister von Mailand ist Giuseppe Sala."
    },
    buongiorno: {
      it: "Ogni mattina Anna prende un caffè e legge il giornale.",
      de: "Jeden Morgen trinkt Anna einen Kaffee und liest die Zeitung."
    }
  };

  useEffect(() => {
    setInputText(texts[textKey].it);
  }, [textKey]);

  useEffect(() => {
    const file = glossaries[textKey];
    if (file) {
      fetch(`/${file}`)
        .then((res) => res.json())
        .then((data) => setGlossary(data))
        .catch((err) => {
          console.error("Glossar konnte nicht geladen werden:", err);
          setGlossary({});
        });
    }
  }, [textKey]);

  return (
    <div className="p-6 max-w-4xl mx-auto font-sans text-lg space-y-6">
      <div className="space-x-4">
        <label>
          <strong>Text wählen:</strong>
          <select
            className="ml-2 p-1 border"
            value={textKey}
            onChange={(e) => {
              setTextKey(e.target.value);
              setInputText(texts[e.target.value].it);
            }}
          >
            <option value="sindaco">Il sindaco</option>
            <option value="buongiorno">Anna e il caffè</option>
          </select>
        </label>

        <label>
          <strong>CEFR-Level:</strong>
          <select
            className="ml-2 p-1 border"
            value={cefrLevel}
            onChange={(e) => setCefrLevel(e.target.value)}
          >
            <option value="A1">A1</option>
            <option value="A2">A2</option>
            <option value="B1">B1</option>
            <option value="B2">B2</option>
            <option value="C1">C1</option>
          </select>
        </label>
      </div>

      <div className="text-gray-800 italic">
        <strong>Übersetzung:</strong> {texts[textKey].de}
      </div>

      <div>
        <label htmlFor="text-input" className="block font-bold mb-1 mt-6">📝 Eigener italienischer Satz:</label>
        <textarea
          id="text-input"
          rows={2}
          className="w-full p-2 border rounded"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
      </div>

      <TokenizedText text={texts[textKey].it} glossary={glossary} cefrLevel={cefrLevel} />
      <ColorLegend />
      <SentenceStructure text={texts[textKey].it} glossary={glossary} />
      <DragAndDropSentence correctOrder={["Ogni", "mattina", "Anna", "prende", "un", "caffè", "e", "legge", "il", "giornale"]} />
    </div>
  );
}
