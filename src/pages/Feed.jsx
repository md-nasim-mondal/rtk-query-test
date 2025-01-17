import PostCard from "../components/PostCard";
import { useGetPostByIdQuery, useGetPostsQuery } from "../redux/features/api/baseApi";

const Feed = () => {
  const { data: posts, isLoading, isError, error } = useGetPostsQuery(); //* Returns an object
  const { data: post} = useGetPostByIdQuery(1); //* Returns an object
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
      <h1 className='text-red-500'>Feed</h1>
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
