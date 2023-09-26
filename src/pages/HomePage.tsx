import Navbar from "@components/Navbar";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import FolderComponent from "@/components/Folder";
import { useNavigate } from "react-router-dom";
import "@styles/Homepage.css";
const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [folders, setFolders] = useState([]);
  const [folderName, setFolderName] = useState("");
  const [images, setImages] = useState([]);
  const { state } = useLocation();
  const navigate = useNavigate();
  const baseUrl = "https://bwidgets-server-6u3u-dev.fl0.io/api";
  const baseImagesUrl = "https://bwidgets-server-6u3u-dev.fl0.io";
  useEffect(() => {
    console.log(baseUrl);
    if (folders.length > 0) return;

    if (state === null && Cookies.get("token") === undefined) {
      navigate("/login");
      return;
    }

    if (state?.isLoggedIn) {
      fetchData();
      return;
    }

    const token = Cookies.get("token");
    if (token) {
      fetchData();
    }
  }, [state]);

  const fetchData = async () => {
    try {
      fetch(`${baseUrl}/folders`, {
        method: "GET",
      }).then((res) =>
        res.json().then((data) => {
          if (data.length > 0) {
            setFolders(data);
          } else {
            fetch(`${baseUrl}/images`).then((res) =>
              res.json().then((data) => {
                setImages(data);
              })
            );
          }
          setIsLoading(false);
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleFolderCreation = async (e: any) => {
    const input = e.target.querySelector("#folder-name");
    e.preventDefault();
    try {
      await fetch(`${baseUrl}/folder`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: folderName }),
      }).then((res) => {
        res.json().then((data) => {
          console.log(data.message);
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
    <>
      <Navbar logged={state?.isLoggedIn} />
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
      <h1>HomePage</h1>
      {isLoading && <h1>Loading...</h1>}
      {folders.length > 0 ? (
        <div className="folders-container">
          {folders.map((folder: { id: number; name: string }) => (
            <FolderComponent
              key={folder.id}
              name={folder.name}
              id={folder.id}
            />
          ))}
        </div>
      ) : (
        <div className="images-container">
          {images.map((image: any) => (
            <div className="image" key={image.id}>
              <img src={`${baseImagesUrl}` + image.url} alt={image.name} />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default HomePage;
