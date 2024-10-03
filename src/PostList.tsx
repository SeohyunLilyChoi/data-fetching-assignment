type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

type postListProp = {
  posts: Post[] | undefined;
  idSelectFunction: (id: number) => void;
  postId: number | undefined;
};

const PostList = ({ posts, postId, idSelectFunction }: postListProp) => {
  return (
    <div className="post-container">
      <div className="bar">
        <div className="title">포스트 목록</div>
      </div>
      {posts !== undefined ? (
        <div className="post-list">
          {posts.map(({ id, title }) => (
            <div
              key={id}
              className={`postlist-item ${id === postId ? 'selected' : ''}`}
              onClick={() => {
                idSelectFunction(id);
              }}
            >
              <div>
                {id}. {title}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="loading">Loading Postlists...</div>
      )}
    </div>
  );
};

export default PostList;
