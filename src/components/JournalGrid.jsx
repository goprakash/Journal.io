import React from 'react';
import JournalCard from './JournalCard';

const JournalGrid = ({ journals }) => {
  return (
    <div className="masonry-grid">
      {journals.length === 0 ? (
        <p style={{textAlign: 'center', gridColumn: '1/-1'}}>No journals found in this category.</p>
      ) : (
        journals.map((journal) => (
          <JournalCard key={journal.id} {...journal} />
        ))
      )}
    </div>
  );
};

export default JournalGrid;