import { useEffect, useState } from "react";
import AddNewPost from "./components/AddNewPost";
import MainBackground from "./components/MainBackground";
import { useDispatch, useSelector } from "react-redux";
import { getPost } from "../../features/posts/postAPI";
import PostComponent from "./components/PostComponent";
import PostBoxComponent from "./components/PostsBox";

export default function Home() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state?.post?.data);
  const [isEdit, setIsEdit] = useState(false)

  useEffect(() => {
    dispatch(getPost());
  }, [dispatch]);

  return (
    <MainBackground>
      <PostBoxComponent>
        {posts.length ? (
          posts.map((post) => {
            return <PostComponent key={`${post.id}postComponent`} post={post} />;
          })
        ) : (
          <h1 style={{ color: "white" }}>No data</h1>
        )}
      </PostBoxComponent>
      <AddNewPost />
    </MainBackground>
  );
}
