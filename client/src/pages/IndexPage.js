import { useEffect, useState } from "react";
import Post from "../components/postComponent/Post";
const IndexPage = () => {
  const [posts, setsPosts] = useState([]);
  useEffect(() => {
    async function getPost() {
      try {
        const response = await fetch("http://localhost:4000/post/getAllPosts", {
          credentials: "include",
        });
        const data = await response.json();
        setsPosts(data);
        console.log(data);
      } catch (error) {
        console.log(error);
        alert("Error fetching posts");
      }
    }
    getPost();
  }, []);
  return (
    <>
      {posts.length > 0 &&
        posts.map((post) => {
          return <Post {...post} />;
        })}
    </>
  );
};
export default IndexPage;
