// client/src/pages/CategoryPage.jsx
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const CategoryPage = () => {
  const { categoryId } = useParams();
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    fetch(`/api/forum/categories/${categoryId}/threads`)
      .then((response) => response.json())
      .then((data) => setThreads(data.threads)); // Assuming the data returned is an object with a threads property
  }, [categoryId]);

  return (
    <div>
      <h1>Category Page</h1>
      <Link to={`/pool-side-lounge/category/${categoryId}/new-thread`}>Create New Thread</Link>
      {threads.map((thread) => (
        <div key={thread._id}>
          <Link to={`/pool-side-lounge/thread/${thread._id}`}>{thread.title}</Link>
        </div>
      ))}
    </div>
  );
};

export default CategoryPage;

