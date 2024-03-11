import { useState } from "react";
import styles from "./style.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../../../../features/posts/postAPI";
import PostBodyComponent from "../PostBodyComponent";

export default function AddNewPost() {
  const [isNew, setIsNew] = useState(false);
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user?.data);

  const changeTitleHandle = (e) => {
    const inputValue = e.target.value;
    setTitle(inputValue);
  };
  const textChangeHandle = (e) => {
    const inputValue = e.target.value;
    setText(inputValue);
  };
  const changePostHandle = (e) => {
    setIsNew((prev) => !prev);
  };
  const newPostHandle = (e) => {
    e.preventDefault();
    if (text.trim() && title.trim()) {
      dispatch(
        addPost({
          title,
          text,
          images: selectedImages,
          author: user.id,
        })
      );
      setIsNew((prev) => !prev);
      setSelectedImages([]);
      setTitle("");
      setText("");
    }
  };

  return (
    <>
      {isNew ? (
        <PostBodyComponent
          setSelectedImages={setSelectedImages}
          title={title}
          text={text}
          changePostHandle={changePostHandle}
          newPostHandle={newPostHandle}
          changeTitleHandle={changeTitleHandle}
          textChangeHandle={textChangeHandle}
          selectedImages={selectedImages}
        />
      ) : (
        ""
      )}

      <div className={styles.postBox} onClick={changePostHandle}>
        +
      </div>
    </>
  );
}
