import "@styles/Folder.css";
import { Link } from "react-router-dom";

const FolderComponent = ({ name, id }: { name: string; id: number }) => {
  return (
    <div className="folder-cont">
      <Link to={{pathname: `/folders/${id}`}} className="folder">{name}</Link>
    </div>
  );
};

export default FolderComponent;
