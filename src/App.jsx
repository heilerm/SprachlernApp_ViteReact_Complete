import React, { useState, useEffect } from 'react';
import './index.css';
import GlossaryPopover from './GlossaryPopover_autoclose';
import DragAndDropSentence from './DragAndDropSentence';
import TokenizedText from './TokenizedText_colored';
import ColorLegend from './ColorLegend';
import SentenceStructure from './SentenceStructure';
import { generateGlossary } from './glossary_generator';

export default function App() {
  const glossaries = {
    sindaco: "glossary_sindaco_translation.json",
    buongiorno: "glossary_ogni_mattina.json"
  };
  const [glossary, setGlossary] = useState({});
  const [cefrLevel, setCefrLevel] = useState("A1");
  const [textKey, setTextKey] = useState("sindaco");
  const [inputText, setInputText] = useState("");
  const [highlightedCategory, setHighlightedCategory] = useState("");

  const texts = {
    sindaco: {
      it: "Il nuovo sindaco di Milano è Giuseppe Sala.",
      de: "Der neue Bürgermeister von Mailand ist Giuseppe Sala."
    },
    buongiorno: {
      it: "Ogni mattina Anna prende un caffè e legge il giornale.",
      de: "Jeden Morgen trinkt Anna einen Kaffee und liest die Zeitung."
    },
    userinput: {
      it: inputText,
      de: "Benutzereingabe"
    }
  };

  // Nur Standardtexte initial setzen
  useEffect(() => {
    if (textKey !== "userinput") {
      setInputText(texts[textKey].it);
    }
  }, [textKey]);

  useEffect(() => {
    if (textKey === "userinput") {
      const autoGlossary = generateGlossary(inputText);
      setGlossary(autoGlossary);
    } else {
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
    }
  }, [textKey, inputText]);

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
              if (e.target.value !== "userinput") {
                setInputText(texts[e.target.value].it);
              }
            }}
          >
            <option value="sindaco">Il sindaco</option>
            <option value="buongiorno">Anna e il caffè</option>
            <option value="userinput">📝 Eigener Text</option>
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

      {textKey === "userinput" && (
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
      )}

      <TokenizedText
        text={inputText}
        glossary={glossary}
        cefrLevel={cefrLevel}
        setHighlightedCategory={setHighlightedCategory}
      />
      <ColorLegend highlightedCategory={highlightedCategory} />
      <SentenceStructure text={inputText} glossary={glossary} />
      <DragAndDropSentence correctOrder={inputText.split(" ").filter(word => word.trim())} />
    </div>
  );
}