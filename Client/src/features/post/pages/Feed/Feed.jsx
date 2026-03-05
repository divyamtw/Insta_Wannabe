import { useEffect } from "react";
import { usePost } from "../../hooks/usePost";

const Feed = () => {
  const { feed, loading, handleGetFeed } = usePost();

  useEffect(() => {
    handleGetFeed();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading || !feed) {
    return (
      <main>
        <h1>loading...</h1>
      </main>
    );
  }

  return (
    <main>
      <div className="feed">
        <div className="post">
          {feed.map((post) => (
            <div key={post._id}>
              <h3>{post.caption}</h3>
              {post.img && (
                <img src={post.img} alt={post.caption} height={400} />
              )}
              {post.isLiked && <p>Liked</p>}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Feed;
