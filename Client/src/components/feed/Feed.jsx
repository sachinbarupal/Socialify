import "./feed.css";
import Share from "../share/Share";
import Post from "../post/Post";
import { Posts } from "../../DummyData";
export default function Feed() {
  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {Posts.map((post) => (
          <Post key={post.id} Post={post} />
        ))}
      </div>
    </div>
  );
}
