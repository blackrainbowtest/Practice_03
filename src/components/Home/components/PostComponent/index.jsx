import { useDispatch, useSelector } from "react-redux";
import { decodeBase64ToImage } from "../../../../utils/image";
import styles from "./style.module.css";
import { deletePost, likePost } from "../../../../features/posts/postAPI";
import SuccessComponent from "../../../_commonComponents/SuccessComponent";
import { useState } from "react";

export default function PostComponent({ post }) {
  const user = useSelector((state) => state?.user?.data);
  const [isDelete, setIsDelete] = useState(false);
  const dispatch = useDispatch();

  const likeClickHandle = (e) => {
    if (post.author !== user.id) {
      e.preventDefault();
      e.stopPropagation();
      if (!post.likes.includes(user.id)) {
        dispatch(
          likePost({
            id: post.id,
            likes: [...post.likes, user.id],
          })
        );
      }
    }
  };

  const editClickHandle = (e) => {
    console.log("Edit");
  };
  const deleteClickHandle = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (Number(user.id) === Number(post.author)) {
      setIsDelete(true)
    }
  };

  const handleSubmit = (e) => {
    e.stopPropagation()
    e.preventDefault()
    dispatch(deletePost(post.id));
  }

  return (
    <>
      <div className={styles.postBox}>
        <div className={styles.postData}>
          <span>Created at:</span>
          <div className={styles.postCreateDate}>{post.createDate}</div>
          <span>, On:</span>
          <div className={styles.postCreateTime}>{post.createTime}</div>
        </div>
        <div className={styles.postTitle}>{post.title}</div>
        <div className={styles.postText}>{post.text}</div>
        {post.images.map((img, index) => {
          return (
            <img
              src={decodeBase64ToImage(img)}
              key={`${index}postImg`}
              alt="img"
            />
          );
        })}
        <div className={styles.postLikes}>
          <span>Likes:</span>
          {post.likes.length}
          <div
            className={`${styles.likeButton} ${
              Number(user.id) === Number(post.author) ||
              post.likes.includes(user.id)
                ? styles.likeButtonDissable
                : styles.likeButtonEnable
            }`}
            onClick={likeClickHandle}
          >
            Like
          </div>
          {Number(user.id) === Number(post.author) ? (
            <div className={styles.editButton} onClick={editClickHandle}>
              edit
            </div>
          ) : (
            ""
          )}
          {Number(user.id) === Number(post.author) ? (
            <div className={styles.deleteButton} onClick={deleteClickHandle}>
              delete
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      {isDelete ? <SuccessComponent handleChange={setIsDelete} handleSubmit={handleSubmit}/> : ""}
    </>
  );
}
