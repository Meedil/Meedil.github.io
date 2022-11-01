import Navbar from "../Navbar";
import UserPost from "../UserPost";
import "./PostsPage.css";

// REQUIREMENTS
/*  Navbar
    Array of UserPosts
*/

interface localPostsProps{
    localPosts:any,
    setLocalPosts:any,
    deletePost:any,
    toggleLike:any
}

export default function LocalPosts(props:localPostsProps){
    const {localPosts} = props;

    const posts = localPosts.posts.map((details, index) => 
    <div key={details.id} className={"gy-5 col-8 col-md-6 col-lg-4"}>
        <UserPost details={details} local={true} toggleLike={()=>{props.toggleLike(index)}} delete={() => {props.deletePost(index)}}/>
    </div>
    )

    return <>
    <Navbar />
    <div className="container mt-5 pt-5">
         <div className="row justify-content-center">{posts.length ? posts : <h1 className="no-posts">NO LOCAL POSTS AVAILABLE</h1>}</div>
        
    </div>
    </>;
}