import "./createPost.css";
import ReactQuill from "react-quill";
import { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { Navigate, useParams } from "react-router-dom";
const EditPage = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState();
  const [cover, setCover] = useState("");
  const [redirect, setRedirect] = useState(false);
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  useEffect(() => {
    async function getPostDetails(id) {
      try {
        const response = await fetch(
          `http://localhost:4000/post/getPostById/${id}`,
          {
            credentials: "include",
            method: "POST",
          }
        );
        const data = await response.json();
        console.log(data);
        setTitle(data.title);
        setSummary(data.summary);
        setContent(data.content);
      } catch (error) {
        console.log(error);
      }
    }
    getPostDetails(id);
  }, []);

  const updatePost = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("id", id);
    if (files?.[0]) {
      data.set("files", files[0]);
    }
    try {
      const response = await fetch("http://localhost:4000/post/updatePost", {
        method: "PUT",
        credentials: "include",
        body: data,
      });
    } catch (error) {
      console.log(error);
      alert("Unable to update post");
    }
    setRedirect(true);
  };
  if (redirect) {
    return <Navigate to={`/post/${id}`} />;
  }
  return (
    <form onSubmit={updatePost}>
      <input
        type="title"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="summary"
        placeholder="Summary"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
      />
      <input type="file" onChange={(e) => setFiles(e.target.files)} />
      <ReactQuill
        value={content}
        modules={modules}
        formats={formats}
        onChange={(newValue) => setContent(newValue)}
      />
      <button>Update Post</button>
    </form>
  );
};
export default EditPage;
