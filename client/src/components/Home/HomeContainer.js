import React, { useState, useEffect } from 'react';
import '../../assets/css/home.css';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Post, MakePost } from '../../Processer/Post.js';
import axios from 'axios';

const HomeContainer = () => {
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const user = useSelector((state) => state.auth.user);  
  const [formData, setFormData] = useState({
    content: '',
  });
  
  const allPosts = useSelector((state) => state.post.allPosts);
  const dispatch = useDispatch();

  useEffect(() => {
    Post(dispatch);
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
    await MakePost(formData, user, dispatch, setFormData)
  };
  return {loggedIn, user, allPosts, handleLogout, handleInput, handleSub, formData};
};

export default HomeContainer;