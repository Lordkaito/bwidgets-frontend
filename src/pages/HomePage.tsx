import Navbar from "@components/Navbar";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [folders, setFolders] = useState([]);
  const [images, setImages] = useState([]);
  const { state } = useLocation();
  useEffect(() => {
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
      fetch("http://localhost:3000/api/folders", {
        method: "GET",
      }).then((res) =>
        res.json().then((data) => {
          if (data.length > 0) {
            setFolders(data);
            setIsLoading(false);
          } else {
            fetch("http://localhost:3000/api/images").then((res) =>
              res.json().then((data) => {
                setImages(data);
                setIsLoading(false);
              })
            );
          }
        })
      );
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Navbar />
      {state?.isLoggedIn ? <h1>Logged in</h1> : <h1>Home page</h1>}
      {isLoading && <h1>Loading...</h1>}
      {folders.length > 0 ? (
        <div className="folders-container">
          {folders.map((folder: any) => (
            <div className="folder" key={folder.id}>
              <h2>{folder.name}</h2>
            </div>
          ))}
        </div>
      ) : (
        <div className="images-container">
          {images.map((image: any) => (
            <div className="image" key={image.id}>
              <img src={"http://localhost:3000" + image.url} alt={image.name} />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default HomePage;
