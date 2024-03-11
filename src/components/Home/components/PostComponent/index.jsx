import { useDispatch, useSelector } from "react-redux";
import { decodeBase64ToImage } from "../../../../utils/image";
import styles from "./style.module.css";
import { deletePost, likePost } from "../../../../features/posts/postAPI";
import SuccessComponent from "../../../_commonComponents/SuccessComponent";
import { useEffect, useState } from "react";

export default function PostComponent({ post, editPostClickHandle }) {
  const user = useSelector((state) => state?.user?.data);
  const [isDelete, setIsDelete] = useState(false);
  const [id, setId] = useState(0);
  const [isMouseOver, setIsMouseOver] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isMouseOver) {
        setId(prev => (prev < post.images.length - 1 ? prev + 1 : 0));
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [post.images.length, isMouseOver]);

  const handleMouseEnter = () => {
    setIsMouseOver(true);
  };

  const handleMouseLeave = () => {
    setIsMouseOver(false);
  };

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
    e.stopPropagation();
    e.preventDefault();
    editPostClickHandle(post);
  };
  const deleteClickHandle = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (Number(user.id) === Number(post.author)) {
      setIsDelete(true);
    }
  };

  const handleSubmit = (e) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(deletePost(post.id));
  };

  const LtClickHandle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setId((prev) => (prev > 0 ? prev - 1 : post.images.length - 1));
  };

  const GtClickHandle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setId((prev) => (prev < post.images.length - 1 ? prev + 1 : 0));
  };

  return (
    <>
      <div className={styles.postBox} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <div className={styles.postData}>
          <span>Created at:</span>
          <div className={styles.postCreateDate}>{post.createDate}</div>
          <span>, On:</span>
          <div className={styles.postCreateTime}>{post.createTime}</div>
        </div>
        <div className={styles.postTitle}>{post.title}</div>
        <div className={styles.postText}>{post.text}</div>
        {post.images.length ? (
          <div className={styles.postImage}>
            <div className={styles.postImageBox}>
              {post.images.length > 1 ? (
                <div className={styles.imgBtnLt} onClick={LtClickHandle}>
                  &lt;
                </div>
              ) : (
                ""
              )}
              {post.images.map((img, index) => {
                if (id === index) {
                  return (
                    <img
                      src={decodeBase64ToImage(img)}
                      key={`${index}postImg`}
                      alt="img"
                    />
                  );
                }
                return null;
              })}
              {post.images.length > 1 ? (
                <div className={styles.imgBtnGt} onClick={GtClickHandle}>
                  &gt;
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        ) : (
          ""
        )}
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
      {isDelete ? (
        <SuccessComponent
          handleChange={setIsDelete}
          handleSubmit={handleSubmit}
        />
      ) : (
        ""
      )}
    </>
  );
}
