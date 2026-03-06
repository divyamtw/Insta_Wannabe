import useZodForm from "../../../../shared/hooks/useZodForm";
import { createPostSchema } from "../../../../shared/validations/schemas";
import { handleCreatePost } from "../../services/post.api";

const CreatePost = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useZodForm(createPostSchema);

  const submitForm = async (data) => {
    const file = data.img?.[0];
    if (!file) return;
    await handleCreatePost(data.caption, file);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(submitForm)}>
        <div>
          <label htmlFor="caption">Caption: </label>
          <input id="caption" type="text" {...register("caption")} />
          {errors.caption && <span>{errors.caption.message}</span>}
        </div>
        <div>
          <label htmlFor="img">Select Img </label>
          <input id="img" type="file" hidden {...register("img")} />
          {errors.img && <span>{errors.img.message}</span>}
        </div>
        <button type="submit">Post</button>
      </form>
    </div>
  );
};

export default CreatePost;
