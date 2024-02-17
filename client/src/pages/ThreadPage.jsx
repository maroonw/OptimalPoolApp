import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/ThreadPage.css';

const ThreadPage = () => {
  const { threadId } = useParams();
  const [thread, setThread] = useState(null);
  const [replies, setReplies] = useState([]);
  const [newReply, setNewReply] = useState('');

  useEffect(() => {
    fetch(`/api/forum/threads/${threadId}`)
      .then((response) => response.json())
      .then((data) => setThread(data));
  
    fetch(`/api/forum/threads/${threadId}/replies`)
      .then((response) => response.json())
      .then((data) => setReplies(data));
  }, [threadId]);

  const handleReplySubmit = (e) => {
    e.preventDefault();
    if (!newReply.trim()) return; // Prevent submitting empty replies
  
    fetch(`/api/forum/threads/${threadId}/replies`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: newReply }),
    })
      .then((response) => response.json())
      .then((data) => {
        setReplies([...replies, data]); // Update the replies state with the new reply
        setNewReply(''); // Clear the textarea
      })
      .catch((error) => console.error('Error submitting reply:', error));
  };

  return (
    <div className="thread-page">
      {thread ? (
        <div>
          <h1 className="thread-title">{thread.title}</h1>
          <p>{thread.content}</p>
          <div className="replies">
            {replies.map((reply) => (
              <div key={reply._id} className="reply">
                <p>{reply.content}</p>
              </div>
            ))}
          </div>
          <form onSubmit={handleReplySubmit} className="reply-form">
            <textarea
              className="reply-textarea"
              value={newReply}
              onChange={(e) => setNewReply(e.target.value)}
              placeholder="Add a reply..."
            />
            <button type="submit" className="reply-submit">Submit Reply</button>
          </form>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ThreadPage;
