import './reset.css';
import './App.css';

import { useEffect, useState } from 'react';

import PostDetail from './PostDetail';
import PostList from './PostList';

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export const App = () => {
  const [posts, setPosts] = useState<Post[]>();
  const [selectedId, setSelectedId] = useState<number>();

  const handleId = (id: number) => {
    setSelectedId(id);
  };

  const fetchPosts = async () => {
    const data = await fetch('https://jsonplaceholder.typicode.com/posts');
    const json = (await data.json()) as Post[];
    return json;
  };

  useEffect(() => {
    fetchPosts()
      .then((response) => {
        setPosts(response);
        if (response[0] !== undefined) setSelectedId(response[0].id);
      })
      .catch(() => {
        alert('Cannot load posts');
      });
  }, []);

  return (
    <div className="container">
      <PostList posts={posts} idSelectFunction={handleId} postId={selectedId} />
      {selectedId !== undefined ? (
        <PostDetail
          id={selectedId}
          body={
            posts !== undefined && posts[selectedId] !== undefined
              ? posts[selectedId].body
              : ''
          }
        />
      ) : (
        <div className="detail-container"></div>
      )}
    </div>
  );
};
