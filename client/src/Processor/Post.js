import { setAllPosts } from "../reducers/postReducer.js";
import axios from "axios";

export const Post = async(dispatch) => {

  await axios.get('http://localhost:8080/posts', {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then((response) => {
    dispatch(setAllPosts(response.data));
  }
  )
  .catch((error) => {
    console.error('Error:', error);
  }
  );
}

export const MakePost = async(formData, user, dispatch, setFormData) => {
  await axios.post('http://localhost:8080/posts', {
      content: formData.content,
      likes: 0,
      userId: user.id,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    }).then((response) => {
      console.log('Post created successfully');
      setFormData({ ...formData, content: '' });
      Post(dispatch);
    }).catch((error) => {
      console.error('Error:', error);
    });
}