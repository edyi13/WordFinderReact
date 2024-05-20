import React from 'react';
import './index.css'; // Create a CSS file for styling

interface Props {
  wordStream: string[];
}

const WordStream: React.FC<Props> = ({ wordStream }) => {
  
  const lines: string[][] = [];
  for (let i = 0; i < wordStream.length; i += 8) {
    lines.push(wordStream.slice(i, i + 8));
  }

  return (
    <div className="word-stream">
      {lines.map((line, lineIndex) => (
        <div key={lineIndex} className="word-line" style={{display: 'flex', flexDirection: 'row'}}>
          {line.map((word, wordIndex) => (
            <div key={wordIndex} className="word-square">
              {word}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default WordStream;