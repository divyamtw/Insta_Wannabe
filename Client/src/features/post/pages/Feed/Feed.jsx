import { useEffect } from "react";
import { usePost } from "../../hooks/usePost";
import style from "./Feed.module.scss";
import Post from "../../components/Post/Post";

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
            <Post key={post.id} {...post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Feed;
