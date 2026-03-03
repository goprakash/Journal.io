import React, { useState } from "react";

const JournalCard = ({ journal, allFolders, onUpdateFolders }) => {
  const [editing, setEditing] = useState(false);

  const toggleFolder = (folder) => {
    const currentFolders = journal.folders || [];

    const updated =
      currentFolders.includes(folder)
        ? currentFolders.filter((f) => f !== folder)
        : [...currentFolders, folder];

    onUpdateFolders(journal.id, updated);
  };

  return (
    <div className="journal-card">
      <h3>{journal.title}</h3>

      {journal.image && (
        <img
          src={journal.image}
          alt="Journal"
          className="journal-image"
        />
      )}

      <p>{journal.content}</p>

      {/* Folder badges */}
      <div style={{ marginTop: "10px" }}>
        {journal.folders?.map((folder) => (
          <span
            key={folder}
            style={{
              background: "#eee",
              padding: "4px 8px",
              borderRadius: "8px",
              marginRight: "5px",
              fontSize: "12px",
            }}
          >
            {folder}
          </span>
        ))}
      </div>

      <button
        style={{ marginTop: "10px" }}
        onClick={() => setEditing(!editing)}
      >
        +
      </button>

      {editing && (
        <div style={{ marginTop: "10px" }}>
          {allFolders
            .filter((f) => f !== "All")
            .map((folder) => (
              <label key={folder} style={{ display: "block" }}>
                <input
                  type="checkbox"
                  checked={journal.folders?.includes(folder)}
                  onChange={() => toggleFolder(folder)}
                />
                {folder}
              </label>
            ))}
        </div>
      )}
    </div>
  );
};

export default JournalCard;