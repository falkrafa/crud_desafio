import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../../assets/css/profile.css';
import { useSelector } from 'react-redux';
import { getProfile, deletePost, updatePostF} from '../../Processer/Profile';

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
    getProfile(userProfile.id,setAllPosts);
  }, []);

  const deletePostFunc = async (postId) => {
    deletePost(postId, userProfile.id,setAllPosts);
  };

  const handleSub = async (e, id) => {
    e.preventDefault();

    updatePostF(id,formData.content, userProfile.id, setAllPosts, setUpdatePost);
  };
  return { handleSub, deletePostFunc, handleInputChange, updatePost, setUpdatePost, allPosts, userProfile}
}

export default ProfileContainer;