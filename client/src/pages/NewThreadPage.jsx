// client/src/pages/NewThreadPage.jsx
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const NewThreadPage = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`/api/forum/categories/${categoryId}/threads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to create thread');
        }
        return response.json();
      })
      .then((data) => navigate(`/pool-side-lounge/thread/${data._id}`))
      .catch((error) => console.error('Error creating thread:', error.message));
  };
  

  return (
    <div>
      <h1>Create New Thread</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <label>
          Content:
          <textarea value={content} onChange={(e) => setContent(e.target.value)} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default NewThreadPage;
