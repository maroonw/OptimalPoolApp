import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/PoolSideLounge.css';

const PoolSideLounge = () => {
  const [categories, setCategories] = useState([]);

useEffect(() => {
  fetch('/api/forum/categories')
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      const promises = data.categories.map((category) =>
        fetch(`/api/forum/categories/${category._id}/threads/top?limit=5`)
          .then((response) => response.json())
          .then((threadsData) => {
            // Ensure threadsData.threads is an array before assigning it to the category
            const threads = Array.isArray(threadsData.threads) ? threadsData.threads : [];
            return { ...category, threads };
          })
      );
      return Promise.all(promises);
    })
    
    .then((categoriesWithThreads) => {
      setCategories(categoriesWithThreads);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}, []);

return (
  <div>
    <h1>PoolSide Lounge Forum</h1>
    {categories.map((category) => (
      <div key={category._id} className="category">
        <h2>{category.name}</h2>
        <p>{category.description}</p>
        <Link to={`/pool-side-lounge/category/${category._id}/new-thread`} className="new-thread-button">
          Create New Thread
        </Link>
        <div className="top-threads">
          {category.threads.map((thread) => (
            <div key={thread._id} className="thread">
              <Link to={`/pool-side-lounge/thread/${thread._id}`}>{thread.title}</Link>
              <span>{thread.repliesCount} replies</span>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
);
};


export default PoolSideLounge;
