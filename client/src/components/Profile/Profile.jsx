import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../../assets/css/profile.css';
import { useSelector } from 'react-redux';
import ProfileContainer from './ProfileContainer';

const Profile = () => {
  const { allPosts, setUpdatePost, updatePost, handleInputChange, handleSub, deletePost, userProfile } = ProfileContainer();
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
