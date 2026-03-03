import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import JournalGrid from "./components/JournalGrid";
import Modal from "./components/Modal";
import "./App.css";

function App() {
  const updateJournalFolders = (journalId, updatedFolders) => {
    const updated = journals.map((journal) =>
      journal.id === journalId
        ? { ...journal, folders: updatedFolders }
        : journal
    );

    setJournals(updated);
  };
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState("All");

  // 🔹 FOLDERS STATE
  const [folders, setFolders] = useState(() => {
    const saved = localStorage.getItem("folders");
    return saved ? JSON.parse(saved) : ["All", "Personal", "Work"];
  });

  // 🔹 JOURNALS STATE
  const [journals, setJournals] = useState(() => {
    const saved = localStorage.getItem("journals");
    return saved ? JSON.parse(saved) : [
      { id: 1, title: "First Note", content: "Welcome!", folders: ["Personal"] }
    ];
  });

  // 🔹 PERSISTENCE
  useEffect(() => {
    localStorage.setItem("folders", JSON.stringify(folders));
  }, [folders]);

  useEffect(() => {
    localStorage.setItem("journals", JSON.stringify(journals));
  }, [journals]);

  const addNewJournal = (title, content, image, selectedFolders) => {
    const newEntry = {
      id: Date.now(),
      title,
      content,
      folders: selectedFolders,
      image,
    };
    setJournals([newEntry, ...journals]);
    setIsModalOpen(false);
  };

  const filteredJournals = selectedFolder === "All"
      ? journals
      : journals.filter((j) => j.folders?.includes(selectedFolder));

  return (
    <div className="app-container">
      {/* Mobile Menu Button - Fixed positioning handled in CSS */}
      <button className="mobile-menu-btn" onClick={() => setIsSidebarOpen(true)}>
        ☰
      </button>

      <Sidebar
        folders={folders}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onAdd={() => setIsModalOpen(true)}
        onSelectFolder={(folder) => {
          setSelectedFolder(folder);
          setIsSidebarOpen(false); 
        }}
        onAddFolder={(newFolder) => setFolders([...folders, newFolder])}
      />

      <main className="main-content">
        <JournalGrid
          journals={filteredJournals}
          allFolders={folders}
          onUpdateFolders={updateJournalFolders}
        />
      </main>

      {isModalOpen && (
        <Modal
          folders={folders.filter(f => f !== "All")} // Don't allow "All" as a specific folder tag
          onClose={() => setIsModalOpen(false)}
          onSave={addNewJournal}
        />
      )}
    </div>
  );
}

export default App;