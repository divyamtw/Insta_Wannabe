import style from "./Post.module.scss";

const Post = (post) => {
  const { caption, createdAt, img } = post;
  const formattedDate = new Date(createdAt).toLocaleString();
  return (
    <div className={style.main}>
      <div className={style.top}>
        <img
          src="https://images.unsplash.com/vector-1754112354428-874fda8f5fe8?q=80&w=1112&auto=format&fit=crop"
          alt="profile-img"
        />

        <div className={style.usernamePostedat}>
          <h2>{post.user.username}</h2>
          <p>{formattedDate.toLocaleString()}</p>
        </div>
      </div>

      <div className={style.caption}>{caption}</div>

      {img && <div className={style.img}>{img && <img src={img} />}</div>}
    </div>
  );
};

export default Post;
