import './reset.css';
import './App.css';

import { useEffect, useState } from 'react';

type PostResponse = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export const App = () => {
  const [id, setId] = useState(1);
  const [data, setData] = useState<PostResponse>();

  useEffect(() => {
    let ignore = false;

    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((response) => response.json() as Promise<PostResponse>)
      .then((response) => {
        if (ignore) return;
        setData(response);
      })
      .catch(() => {
        window.alert('실패');
      });

    return () => {
      ignore = true;
    };
  }, [id]);

  return (
    <div className="box">
      <button
        onClick={() => {
          setId(id - 1);
        }}
      >
        왼쪽
      </button>
      <div className="post-list">
        <p>포스트 목록</p>
        {data?.id} {data?.title}
      </div>
      <div className="post-details">
        <p>내용</p>
        {data?.body}
      </div>
      <button
        onClick={() => {
          setId(id + 1);
        }}
      >
        오른쪽
      </button>
    </div>
  );
};
