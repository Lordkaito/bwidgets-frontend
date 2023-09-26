import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "@styles/FoldersPage.css";
import Navbar from "@/components/Navbar";

interface ImageData {
  image_id: number;
  image_name: string;
  image_url: string;
  folder_id: number;
}

type ImagesState = ImageData[];
const FoldersPage = () => {
  const [images, setImages] = useState<ImagesState>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const baseUrl = "https://bwidgets-server-6u3u-dev.fl0.io/api"
  const baseImagesUrl = "https://bwidgets-server-6u3u-dev.fl0.io"
  useEffect(() => {
    try {
      fetch(`${baseUrl}/folder/${id}`, {
        method: "GET",
      }).then((res) =>
        res.json().then((data) => {
          console.log(data);
          setImages(data?.folder?.images);
          // console.log(data?.folder);
          // setFolderName(data?.folder?.name ?? "No images in this folder");
          setIsLoading(false);
        })
      );
    } catch (err) {
      console.log(err);
    }
  }, [id]);

  // need to check this function later
  const handleImageUpload = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    const files = e.target.querySelector("input[type=file]").files;
    // console.log(files);
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        formData.append("image", files[i]);
      }
    }
    formData.append("folder_id", id as string);
    try {
      await fetch(`${baseUrl}/images`, {
        method: "POST",
        body: formData,
      }).then((res) => {
        res.json().then((data) => {
          console.log(data);
          if(res.status === 201) {
            console.log(data.images);
            if(images !== undefined) {
            setImages((prevImages) => [...prevImages, ...data.images]);
            } else {
              setImages(data.images);
            }
          }
        });

      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Navbar />
      {isLoading && <h1>Loading...</h1>}
      <form onSubmit={(e) => handleImageUpload(e)}>
        <label htmlFor="uploadImages">
          <input type="file" name="file" multiple />
        </label>
        <button type="submit">Upload</button>
      </form>
      <div className="image-container">
        {images &&
          images.map((image: { image_id: number; image_name: string; image_url: string }) => (
            <div className="image" key={image.image_id}>
              <img src={`${baseImagesUrl}` + image.image_url} alt={image.image_name} />
            </div>
          ))}
      </div>
    </>
  );
};

export default FoldersPage;
