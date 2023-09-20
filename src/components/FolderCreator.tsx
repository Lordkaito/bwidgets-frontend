import { useState } from "react";
const FolderCreator = () => {
  const [folderName, setFolderName] = useState("");
  const handleFolderCreation = async (e: any) => {
    const input = e.target.querySelector("#folder-name");
    e.preventDefault();
    try {
      await fetch("http://localhost:3000/api/folder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: folderName }),
      }).then((res) => {
        console.log(res);
        res.json().then((data) => {
          console.log(data);
        });
      });
      setFolderName("");
      input.value = "";
    } catch (err) {
      console.log(err);
    } finally {
      setFolderName("");
    }
  };
  return (
    <div className="folder-creator">
      <h2>Create a folder</h2>
      <form onSubmit={handleFolderCreation}>
        <label htmlFor="folder-name">Name</label>
        <input
          type="text"
          id="folder-name"
          required
          onChange={(e) => setFolderName(e.target.value)}
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default FolderCreator;
