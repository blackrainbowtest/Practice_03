import { useEffect, useState } from "react";
import AddNewPost from "./components/AddNewPost";
import MainBackground from "./components/MainBackground";
import { useDispatch, useSelector } from "react-redux";
import { getPost } from "../../features/posts/postAPI";
import PostComponent from "./components/PostComponent";
import PostBoxComponent from "./components/PostsBox";
import EditPost from "./components/EditPost";

export default function Home() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state?.post?.data);
  const [isEdit, setIsEdit] = useState(false)

  useEffect(() => {
    dispatch(getPost());
  }, [dispatch]);

  const editPostClickHandle = (post) => {
    setIsEdit(post)
  }

  return (
    <MainBackground>
      <PostBoxComponent>
        {posts.length ? (
          posts.map((post) => {
            return <PostComponent key={`${post.id}postComponent`} post={post} editPostClickHandle={editPostClickHandle} />;
          })
        ) : (
          <h1 style={{ color: "white" }}>No data</h1>
        )}
      </PostBoxComponent>
      <AddNewPost />
      {
        isEdit ? <EditPost post={isEdit} setIsEdit={setIsEdit}/> : ""
      }
    </MainBackground>
  );
}
