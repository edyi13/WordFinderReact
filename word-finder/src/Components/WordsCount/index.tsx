import React from 'react';
import './index.css'; // Create a CSS file for styling

interface Props {
  wordCount: string[];
}

const WordsCount: React.FC<Props> = ({ wordCount }) => {
  return (
    <div className="word-count-horizontal">
      {wordCount.map((count, index) => (
        <div key={index} className="count-square">
          {count}
        </div>
      ))}
    </div>
  );
};

export default WordsCount;