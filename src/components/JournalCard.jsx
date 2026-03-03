import React from "react";

const JournalCard = ({ title, content, folder, image }) => {
  return (
    <div className="journal-card">
      <span className="folder-tag">{folder}</span>

      <h3>{title}</h3>

      {image && (
        <img
          src={image}
          alt="Journal"
          className="journal-image"
        />
      )}

      <p>{content}</p>

    </div>
  );
};

export default JournalCard;