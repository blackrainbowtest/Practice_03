import { useEffect } from "react";
import AddNewPost from "./components/AddNewPost";
import MainBackground from "./components/MainBackground";
import { useDispatch, useSelector } from "react-redux";
import { getPost } from "../../features/posts/postAPI";
import PostComponent from "./components/PostComponent";


export default function Home() {
  const dispatch = useDispatch()
  const posts = useSelector((state) => state?.post?.data);

  useEffect(() => {
    dispatch(getPost())
  }, [dispatch])
  
  console.log(posts);
  
  return (
    <MainBackground>
      {
        posts.length ? (
          posts.map((post) => {
            return (
              <PostComponent key={post.id}/>
            )
          })
        ): <h1 style={{color: "white"}}>No data</h1>
      }
      <AddNewPost/>
    </MainBackground>
  );
}
