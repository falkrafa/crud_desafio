import { setAllPosts } from "../reducers/postReducer.js";

export const Post = async(dispatch) => {

    const response = await fetch('http://localhost:8080/posts', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          dispatch(setAllPosts(data));
        } else {
          console.error('Failed to fetch posts');
        }
    }