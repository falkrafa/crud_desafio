import axios from "axios";
import { useSelector } from "react-redux";
import ProfileContainer from "../components/Profile/ProfileContainer";


export const getProfile = async (id,setAllPosts)=>{
    
    await axios.get(`http://localhost:8080/posts/user/${id}`,{
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
    }).then((response) => {
        setAllPosts(response.data);
    }).catch((error) => {
        console.error('Error:', error);
    });
}

export const deletePost = async (postId, id,setAllPosts) => {
    await axios.delete(`http://localhost:8080/posts/${postId}`,{
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
    }).then((response) => {
        console.log('Post deletado com sucesso');
        getProfile(id,setAllPosts);
    }).catch((error) => {
        console.error('Error:', error);
    });
}

export const updatePostF = async (id,content, userId, setAllPosts, setUpdatePost) => {
    await axios.put(`http://localhost:8080/posts/${id}`,{
        content: content,
    },{
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
    }).then((response) => {
        console.log('Post editado com sucesso');
        getProfile(userId, setAllPosts);
        setUpdatePost(false);
    }).catch((error) => {
        console.error('Error:', error);
    });
}