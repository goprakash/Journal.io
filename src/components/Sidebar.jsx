import React, { useState } from "react";

const Sidebar = ({
  folders,
  isOpen,
  onClose,
  onAdd,
  onSelectFolder,
  onAddFolder,
}) => {
  const [newFolder, setNewFolder] = useState("");

  const handleAddFolder = () => {
    if (!newFolder.trim()) return;

    onAddFolder(newFolder);
    setNewFolder("");
  };

  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
      
      {/* Close button (mobile only) */}
      <button className="close-sidebar" onClick={onClose}>
        ✕
      </button>

      <div className="sidebar-header">
        <h2>Journal.io</h2>
        <h4>Journal It.</h4>
        <button className="new-btn" onClick={onAdd}>
          + New Journal
        </button>
      </div>

      <nav className="folder-list">
        <p className="label">FOLDERS</p>

        {folders.map((folder) => (
          <button
            key={folder}
            className="folder-btn"
            onClick={() => {
              onSelectFolder(folder);
              onClose(); // auto-close on mobile
            }}
          >
            📁 {folder}
          </button>
        ))}

        <div style={{ marginTop: "20px" }}>
          <input
            type="text"
            placeholder="New folder..."
            value={newFolder}
            onChange={(e) => setNewFolder(e.target.value)}
          />
          <button onClick={handleAddFolder}>Add Folder</button>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;