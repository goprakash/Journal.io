import React from "react";
import JournalCard from "./JournalCard";

const JournalGrid = ({ journals, allFolders, onUpdateFolders }) => {
  return (
    <div className="masonry-grid">
      {journals.length === 0 ? (
        <p>No journals yet. Click "+ New Journal" to start!</p>
      ) : (
        journals.map((journal) => (
          <JournalCard
            key={journal.id}
            journal={journal}
            allFolders={allFolders}
            onUpdateFolders={onUpdateFolders}
          />
        ))
      )}
    </div>
  );
};

export default JournalGrid;