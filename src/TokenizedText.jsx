
import React from 'react';

export default function TokenizedText({ text }) {
  return (
    <div className="mt-4 leading-8">
      {text.split(" ").map((word, idx) => (
        <span key={idx} className="inline-block px-1 rounded bg-red-200 text-red-800">
          {word}{" "}
        </span>
      ))}
    </div>
  );
}
