import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../assets/css/profile.css';

const Profile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const { userId } = useParams();
  const [allPosts, setAllPosts] = useState([]);
  const [updatePost, setUpdatePost] = useState(false);  
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
        const response = await fetch(`http://localhost:8080/posts/user/${userId}`, {
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

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`http://localhost:8080/users/${userId}`, {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
            'Autorization': `Bearer ${localStorage.getItem('token')}`,
          },
      });
      
      if (response.ok) {
          const data = await response.json();
          setUserProfile(data);
        } else {
          console.error('Failed to fetch user profile');
        }
      } catch (error) {
        console.error('Error during API call', error);
      }
    };

    fetchUserProfile();
  }, [userId]);

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

  return (
    <section className="profile-section">
      <h1>User Profile</h1>
      {userProfile ? (
        <><div className='info-sec'>
          <div className='profile-names'>
            <p>Name: {userProfile.name}</p>
            <p>Email: {userProfile.email}</p>
          </div>
          {userProfile.profilePicture && (
            <img
              src={`http://localhost:8080/${userProfile.profilePicture}`}
              alt="Profile"/>
          )}
        </div>
        <div className='my-post-section'>
  <h2>My Posts</h2>
  {allPosts.length === 0 ? (
    <p>No posts yet</p>
  ) : (
    <>
      {allPosts.map((post) => (
        <div key={post.id} className="post-profile">
          <p>{post.content}</p>
          <span>{post.likes} likes</span>
          <div className='buttons'>
            <button onClick={() => deletePost(post.id)} className='btn2'>Delete Post</button>
            <button onClick={() => setUpdatePost(post.id)} className='btn2'>Update Post</button>
          </div>
        </div>
      ))}
      {updatePost && (
        <div className='update-post-wrapper'>
          <div className='update-post-modal'>
            <div className='head'>
              <h2>Update Post</h2>
              <button onClick={() => setUpdatePost(false)} className='close'>X</button>
            </div>
            <form method="post" onSubmit={(e) => handleSub(e, updatePost)}>
            <textarea
              name="content"
              id=""
              cols="40"
              rows="2"
              onChange={handleInputChange}
            >
              {allPosts.find((post) => post.id === updatePost)?.content}
            </textarea>

              <button type="submit" className='btn2'>Update Post</button>
            </form>
          </div>
        </div>
      )}
    </>
  )}
</div>

        </>
      ) : (
        <p>Loading profile...</p>
      )}
    </section>
  );
};

export default Profile;
