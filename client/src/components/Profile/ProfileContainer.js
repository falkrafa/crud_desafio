import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../../assets/css/profile.css';
import { useSelector } from 'react-redux';

const ProfileContainer = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [updatePost, setUpdatePost] = useState(false);  
  const userProfile = useSelector((state) => state.auth.user);
  const [formData, setFormData] = useState({
    content: '', 
  });
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`http://localhost:8080/posts/user/${userProfile.id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setAllPosts(data);
        } else {
          console.error('Falha ao buscar posts');
        }
      } catch (error) {
        console.error('Erro:', error);
      }
    };

    fetchPosts();
  }, []);

  const deletePost = async (postId) => {
    try {
      const response = await fetch(`http://localhost:8080/posts/${postId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        const newPosts = allPosts.filter((post) => post.id !== postId);
        setAllPosts(newPosts);
      } else {
        console.error('Failed to delete post');
      }
    } catch (error) {
      console.error('Error during API call', error);
    }
  };

  const handleSub = async (e, id) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8080/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          content: formData.content,
        }),
      });

      if (response.ok) {
        console.log('Post editado com sucesso');
        window.location.reload();
      } else {
        console.error('Falha na edição do post');
      }
    } catch (error) {
      console.error('Error during API call', error);
    }
  };
  return { handleSub, deletePost, handleInputChange, updatePost, setUpdatePost, allPosts, userProfile}
}

export default ProfileContainer;