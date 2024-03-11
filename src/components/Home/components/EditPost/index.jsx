import { useState } from "react";
import PostBodyComponent from "../PostBodyComponent";
import { useDispatch, useSelector } from "react-redux";
import { editPost } from "../../../../features/posts/postAPI";
import { setPostSuccessMessage } from "../../../../features/posts/postSlice";

export default function EditPost({ post, setIsEdit }) {
  const [text, setText] = useState(post.text);
  const [title, setTitle] = useState(post.title);
  const [selectedImages, setSelectedImages] = useState(post.images);
  const dispatch = useDispatch();
  const successMessage = useSelector((state) => state?.post?.successMessage);

  const newPostHandle = (e) => {
    e.preventDefault();
    if (text.trim() && title.trim()) {
      dispatch(
        editPost({
          title,
          text,
          images: selectedImages,
          id: post.id,
        })
      );
      dispatch(setPostSuccessMessage([...successMessage, {id: successMessage.length > 0 ? successMessage[successMessage.length - 1].id + 1 : 1, message: "Post successfully edited", exit: false}]))
      setIsEdit(false);
    }
  };
  const changePostHandle = (e) => {
    setIsEdit(false);
  };
  const changeTitleHandle = (e) => {
    const inputValue = e.target.value;
    setTitle(inputValue);
  };
  const textChangeHandle = (e) => {
    const inputValue = e.target.value;
    setText(inputValue);
  };

  return (
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
  );
}
