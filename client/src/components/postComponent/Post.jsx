import { useEffect } from "react";
import "./post.css";
import { formatISO9075 } from "date-fns";
import { Link } from "react-router-dom";
const Post = (props) => {
  return (
    <div className="post">
      <div className="image">
        <Link to={`/post/${props._id}`}>
          <img src={"http://localhost:4000/" + props.cover} alt="Image" />
        </Link>
      </div>
      <div className="texts">
        <Link to={`/post/${props._id}`}>
          <h2>{props.title}</h2>
        </Link>
        <p className="info">
          <a className="author">{props.author.username}</a>
          <time>{formatISO9075(props.createdAt)}</time>
        </p>

        <p className="summary">{props.summary}</p>
      </div>
    </div>
  );
};
export default Post;
