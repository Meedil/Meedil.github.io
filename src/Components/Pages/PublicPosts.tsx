import axios from "axios";
import { useEffect, useState } from "react";
import PostDetails from "../../Types/PostDetails";
import Navbar from "../Navbar";
import UserPost from "../UserPost";
import "./PostsPage.css";

// Outline
/*  Get Data from unsplash
    Make postDetails array from data
    map postDetails array into User Posts */
/*  Make it so that likes affect local storage and page state */

var storageSyncedLikes:string[] = JSON.parse(localStorage.getItem("publicsLiked")) || [];

export default function PublicPosts(){
    const [postData, setPostData] = useState<PostDetails[]>([]);
    
    useEffect(() => {
        const firstLoad = axios.get("https://api.unsplash.com/photos/?client_id=msi92vAUtdMagF7SOQKE9ju3ayR9sMTWfnLWYugAqXM&order_by=latest&per_page=24")
    .then((resp) => {
        const dataExtract = resp.data.map((photo) => {
            let post:PostDetails = {
                id: photo.id,
                username: photo.user.username,
                userProfilePic: photo.user.profile_image.small,
                image: photo.urls.small,
                photoName: '',
                photoDescription: photo.description,
                likedByUser: storageSyncedLikes.includes(photo.id),
                likes: 0
            };
            post.likes = photo.likes + (post.likedByUser ? 1 : 0);
            return post;
        })
        setPostData(dataExtract);
    });
    }, []);
    

    const toggleLike = (index) => {
        const dataCopy = postData.slice();
        dataCopy[index].likedByUser = !dataCopy[index].likedByUser;
        console.log(dataCopy[index].likedByUser)
        dataCopy[index].likes += (dataCopy[index].likedByUser ? 1 : -1);
        setPostData(dataCopy);
        
        if (dataCopy[index].likedByUser) storageSyncedLikes.push(dataCopy[index].id);
        else storageSyncedLikes.splice(storageSyncedLikes.findIndex((id) => id === dataCopy[index].id), 1);
        localStorage.setItem("publicsLiked", JSON.stringify(storageSyncedLikes));
    }

    const posts = postData.map((details, index) => <div key={details.id} className={"gy-5 col-8 col-md-6 col-lg-4 "}>
        <UserPost  details={details} local={false} toggleLike={() => toggleLike(index)}/>
    </div>)

    return (<div>
        <Navbar />
        <div className="container mt-5">
            <div className="row justify-content-center">{posts}</div>
        </div>
    </div>)
}