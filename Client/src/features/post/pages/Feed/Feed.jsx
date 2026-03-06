import { useEffect } from "react";
import { usePost } from "../../hooks/usePost";
import style from "./Feed.module.scss";

const Feed = () => {
  const { feed, loading, handleGetFeed } = usePost();

  useEffect(() => {
    handleGetFeed();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading || !feed) {
    return (
      <main className={`loaderCenter`}>
        <h1>loading...</h1>
      </main>
    );
  }

  return (
    <div className={style.main}>
      <div className={style.feed}>
        <div className={style.post}>
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
    </div>
  );
};

export default Feed;
