import React, { useState, useEffect } from 'react';
import Card from './Card';
import Button from './Button';

const ApiData = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPosts(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <div className="text-center p-10">Loading posts...</div>;
  if (error) return <div className="text-center p-10 text-red-500">Error: {error}</div>;

  return (
    <Card>
      <h2 className="text-2xl font-bold mb-4 text-center">JSONPlaceholder Posts</h2>
      <input
        type="text"
        placeholder="Search posts by title..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1); // Reset to first page on search
        }}
        className="w-full px-4 py-2 mb-6 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {currentPosts.map(post => (
          <div key={post.id} className="p-4 border rounded-lg dark:border-gray-700 hover:shadow-lg transition-shadow">
            <h3 className="font-bold text-lg text-blue-600 dark:text-blue-400">{post.title}</h3>
            <p className="text-sm mt-2 text-gray-600 dark:text-gray-300">{post.body}</p>
          </div>
        ))}
      </div>
      
      {filteredPosts.length === 0 && (
        <p className="text-center text-gray-500 py-4">No posts found.</p>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-8 space-x-2">
          <Button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} size="sm">
            Prev
          </Button>
          <span className="text-gray-700 dark:text-gray-300">
            Page {currentPage} of {totalPages}
          </span>
          <Button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} size="sm">
            Next
          </Button>
        </div>
      )}
    </Card>
  );
};

export default ApiData;