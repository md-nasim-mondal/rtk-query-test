import { useForm } from "react-hook-form";
import PostCard from "../components/PostCard";
import {
  useGetPostByIdQuery,
  useGetPostsQuery,
  useSetPostMutation,
} from "../redux/features/api/baseApi";

const Feed = () => {
  const { data: posts, isLoading, isError, error } = useGetPostsQuery(); //* Returns an object
  const { data: post } = useGetPostByIdQuery(1); //* Returns an object

  const [setPost, { data: postData }] = useSetPostMutation(); //* Returns an array

  console.log(postData);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    // setPost(data);
    setPost({
      title: "This is a new post title",
      body: data?.post,
      userId: 54866,
    });
  };

  if (isLoading) {
    return <p className='text-9xl text-zinc-300 text-center'>Loading...</p>;
  }
  if ((!isLoading && isError) || error) {
    return (
      <p className='text-4xl text-zinc-300 text-center'>
        Something went wrong!!
      </p>
    );
  }
  return (
    <div>
      <h1 className='text-zinc-300'>Feed</h1>
      <div className='my-10'>
        <form
          className='flex gap-3 justify-center'
          onSubmit={handleSubmit(onSubmit)}>
          <input
            className='rounded-md w-1/2'
            type='text'
            {...register("post", {
              required: "Required",
            })}
          />
          {errors?.post && errors?.post?.message}

          <button
            type='submit'
            className='bg-zinc-800 text-zinc-300 text-lg px-3 py-1.5 border border-zinc-300 rounded-md min-w-20'>
            Post
          </button>
        </form>
      </div>
      <div className='flex flex-col gap-3'>
        {/* By Id */}
        <PostCard post={post} />
        {/* All post by query */}
        {posts?.map((post) => (
          <PostCard key={post?.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
