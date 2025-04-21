
import React from 'react';

export default function SentenceStructure({ text, glossary }) {
  const words = text.split(" ").map(w => w.replace(/[.,!?%']/g, ''));
  console.log("📚 Satzstruktur-Glossar:", glossary);

  return (
    <div className="mt-6 bg-yellow-50 p-4 border rounded">
      <h4 className="font-semibold mb-2">🧩 Satzstruktur (Debug-Version)</h4>
      <div className="space-y-1 text-sm">
        {words.map((word, idx) => {
          const entry = glossary[word.toLowerCase()];
          const role = entry?.category === "Verb"
            ? "Verb"
            : entry?.grammar?.toLowerCase().includes("subjekt")
              ? "Subjekt"
              : entry?.category === "Substantiv" || entry?.category?.includes("Artikel")
                ? "Objekt"
                : "";

          console.log("🔍", word, "→", entry?.category, "|", entry?.grammar);

          return (
            <div key={idx}>
              <strong>{word}</strong>
              <span className="text-gray-500">
                {" "}— Kategorie: {entry?.category || "?"} | Grammatik: {entry?.grammar || "?"} | Rolle: {role || "-"}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
