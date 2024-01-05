import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../assets/css/home.css';
import HomeContainer from './HomeContainer';
const Home = () => {
  const { loggedIn, user, allPosts,handleInput, handleSub, handleLogout} = HomeContainer();

  
  return (
    <section className="home-section">
      <div className="home-content">
        <div className='profile-sec'>
          {loggedIn ? (
            <>
              {user && (
                <Link to={`/profile/${user.id}`} className='btn'>
                  <div className='profile-box'>
                    <p className='profile-name'>{user.name}</p>
                    <img src={`http://localhost:8080/${user.profilePicture}`} alt="Profile"/>
                  </div>
                </Link>
              )}
              <button onClick={handleLogout} className='btn2'>Logout</button>
            </>
          ) : (
            <>
              <Link to={"/login"} className="btn3">
                Login
              </Link>
              <Link to={"/register"} className="btn3">
                Register
              </Link>
            </>
          )}
        </div>
        <div className='post-sec'>
          {loggedIn && (
            <div className='make-post-area'>
              <h1>Make a Post</h1>
              <form method="post" onSubmit={handleSub}>
                <textarea name="content" id="" cols="40" rows="2" onChange={handleInput} placeholder='Make a post'></textarea>
                <button type="submit" className='btn2'>Make Post</button>
              </form>
            </div>
          )}
          <div className='post-area'>
            <h1>All Posts</h1>
            {allPosts?.length > 0 ? (
              allPosts.map((post) => (
                <div key={post.id} className="post">
                  <div className='post-user'>
                    <h3>{post.User.name}</h3>
                    <img src={`http://localhost:8080/${post.User.profilePicture}`} alt="Profile"/>
                  </div>
                  <p>{post.content}</p>
                  <p>{post.likes} likes</p>
                </div>
              ))
            ) : (
              <p>There are no posts</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
