import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "@styles/FoldersPage.css";
import Navbar from "@/components/Navbar";
const FoldersPage = () => {
  const [images, setImages] = useState([]);
  const [folderName, setFolderName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  useEffect(() => {
    try {
      fetch(`http://localhost:3000/api/folder/${id}`, {
        method: "GET",
      }).then((res) =>
        res.json().then((data) => {
          console.log(data);
          setImages(data?.folder?.images);
          setFolderName(data?.folder?.name ?? "No images in this folder");
          setIsLoading(false);
        })
      );
    } catch (err) {
      console.log(err);
    }
  }, [id]);
  return (
    <>
      <Navbar />
      {isLoading && <h1>Loading...</h1>}
      <p>{folderName}</p>
      <form action="">
        <label htmlFor="uploadImages">
          <input type="file" name="file" multiple />
        </label>
      </form>
      <div className="image-container">
        {images &&
          images.map((image: { image_id: number; image_name: string; image_url: string }) => (
            <div className="image" key={image.image_id}>
              <img src={`http://localhost:3000` + image.image_url} alt={image.image_name} />
            </div>
          ))}
      </div>
    </>
  );
};

export default FoldersPage;
