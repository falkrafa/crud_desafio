import React, { useState, useEffect } from 'react';
import '../../assets/css/home.css';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Post } from '../../Processer/Post.js';
const HomeContainer = () => {
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const user = useSelector((state) => state.auth.user);  
  const [formData, setFormData] = useState({
    content: '',
  });
  
  const allPosts = useSelector((state) => state.post.allPosts);
  const dispatch = useDispatch();

  const fetchPosts = async () => {
    try {
      await Post(dispatch)
    } catch (error) {
      console.error('Error:', error);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, []);
  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.location.reload();
  };
  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSub = async (e) => {
    e.preventDefault();

    if (!loggedIn) {
      console.error('You must be logged in to create a post.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          content: formData.content,
          likes: 0,
          userId: user.id,
        }),
      });

      if (response.ok) {
        console.log('Post created successfully');
        window.location.reload();
      } else {
        console.error('Failed to create post');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return {loggedIn, user, allPosts, handleLogout, handleInput, handleSub};
};

export default HomeContainer;