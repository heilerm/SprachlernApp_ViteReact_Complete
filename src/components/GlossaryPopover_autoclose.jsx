import React, { useEffect, useRef, useState } from 'react';
import '../index.css';

let openPopoverRef = null;

function GlossaryPopover({ word, glossary, cefrLevel, colorClass }) {
  const entry = glossary[word.toLowerCase()];
  const [isOpen, setIsOpen] = useState(false);
  const [showExamples, setShowExamples] = useState(false);
  const ref = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClick = () => {
    if (openPopoverRef && openPopoverRef !== setIsOpen) {
      openPopoverRef(false);
    }
    setIsOpen(true);
    openPopoverRef = setIsOpen;
  };

  if (!entry) return <span>{word}</span>;

  return (
    <span ref={ref} className={`relative inline-block font-semibold ${colorClass}`}>
      <span onClick={handleClick} className="cursor-pointer">{word}</span>
      {isOpen && (
        <div className="absolute z-10 bg-white text-black border rounded p-3 shadow-lg w-[28rem] text-sm mt-1">
          <div className="flex justify-between items-start">
            <strong>{entry.word}</strong>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-black text-xs ml-2">✖</button>
          </div>
          <p><strong>Bedeutung:</strong> {entry.translation}</p>
          <p><strong>Kategorie:</strong> {entry.category}</p>
          <p><strong>Grammatik:</strong> {entry.grammar}</p>
          <p><strong>CEFR-Level:</strong> {entry.cefr_level || "?"}</p>
          {entry.culture_note && <p><strong>Kultureller Kontext:</strong> {entry.culture_note}</p>}
          {entry.context_annotation && <p><strong>Kontextbezogene Anmerkung:</strong> {entry.context_annotation}</p>}
          {entry.comparison && <p><strong>Sprachvergleich:</strong> {entry.comparison}</p>}
          {entry.cultural_examples && (
            <button onClick={() => setShowExamples(!showExamples)} className="text-blue-500 underline mt-2">
              {showExamples ? 'Beispiele ausblenden' : 'Beispiele anzeigen'}
            </button>
          )}
          {showExamples && entry.cultural_examples && (
            <ul className="mt-2 space-y-1">
              {entry.cultural_examples.map((ex, index) => (
                <li key={index}>
                  <em>{ex.example}</em> – {ex.explanation}
                </li>
              ))}
            </ul>
          )}
          {entry.external_links && entry.external_links.map((link, index) => (
            <p key={index}>
              <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                {link.title}
              </a>
            </p>
          ))}
        </div>
      )}
    </span>
  );
}

export default GlossaryPopover;