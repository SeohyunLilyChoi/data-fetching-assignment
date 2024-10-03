import { useEffect, useState } from 'react';

type Comment = {
  body: string;
  email: string;
  id: number;
  name: string;
  postId: number;
};

type postDetailProp = {
  id: number;
  body: string;
};

const PostDetail = ({ id, body }: postDetailProp) => {
  const [comments, setComments] = useState<Comment[]>();

  useEffect(() => {
    let ignore = false;
    fetchComments(id)
      .then((response) => {
        if (!ignore) setComments(response);
      })
      .catch(() => {
        alert('댓글을 가져올 수 없음');
      });
    return () => {
      ignore = true;
      setComments(undefined);
    };
  }, [id]);

  const fetchComments = async (postId: number) => {
    const data = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${postId}/comments`,
    );
    const json = (await data.json()) as Comment[];
    return json;
  };

  return (
    <div className="detail-box">
      <div className="detail-body">
        <div className="title">내용</div>
        {body !== '' ? (
          <div className="details">{body}</div>
        ) : (
          <div className="loading">Loading Content...</div>
        )}
      </div>
      <div className="detail-comments">
        <div className="title">댓글</div>
        {comments !== undefined ? (
          <div>
            {comments.map((comment) => (
              <div key={comment.id} className="comment-item">
                <div className="comment-writer">{comment.email}</div>
                <div className="comment-body">{comment.body}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="loading">Loading Comments...</div>
        )}
      </div>
    </div>
  );
};

export default PostDetail;
