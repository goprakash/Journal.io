import React, { useState } from "react";

const Modal = ({ onClose, onSave, folders }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [selectedFolders, setSelectedFolders] = useState([]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        const maxWidth = 800;
        const scale = maxWidth / img.width;

        canvas.width = maxWidth;
        canvas.height = img.height * scale;

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        const compressed = canvas.toDataURL("image/jpeg", 0.7);
        setImage(compressed);
      };
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content) return alert("Please fill in both fields!");
    if (selectedFolders.length === 0)
      return alert("Please select at least one folder!");

    onSave(title, content, image, selectedFolders);
  };

  const toggleFolder = (folder) => {
    if (selectedFolders.includes(folder)) {
      setSelectedFolders(selectedFolders.filter((f) => f !== folder));
    } else {
      setSelectedFolders([...selectedFolders, folder]);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>

        <h2>Create New Journal</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <input type="file" accept="image/*" onChange={handleImageChange} />

          <div style={{ margin: "15px 0" }}>
            <strong>Select Folders:</strong>
            {folders
              .filter((f) => f !== "All")
              .map((folder) => (
                <label
                  key={folder}
                  style={{ display: "block", marginTop: "5px" }}
                >
                  <input
                    type="checkbox"
                    checked={selectedFolders.includes(folder)}
                    onChange={() => toggleFolder(folder)}
                  />
                  {folder}
                </label>
              ))}
          </div>

          <button type="submit" className="post-btn">
            Post to Journal
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;