import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faTrash, faHeart as faSolidHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PostDetails from '../Types/PostDetails';
import './UserPost.css';

interface postProps{
    details:PostDetails,
    local:boolean,
    toggleLike:any,
    delete?:any;
}

// REQUIREMENTS
/*  ID
    Username
    UserProfilePic
    Image
    Photo name
    Photo description
    Like button
    Like Status
    delete if local
*/
// Props
/*  string id
    string Username
    string UserProfilePic (path)
    string Image (path)
    string PhotoName
    string PhotoDesc
    bool liked */

export default function UserPost({details, local, toggleLike, ...props}:postProps){
    return (
        <div className='post-card overflow-hidden'>
            <div className="post-header rounded d-flex align-items-center justify-content-between p-2">
                <div className='d-inline-flex'>
                    <div className="pfp rounded-circle overflow-hidden d-inline-block me-2">
                        <img src={details.userProfilePic} alt=''/>
                    </div>
                    <div className="username fw-bold fs-small d-flex align-items-center">{details.username}</div>
                </div>
                {local && <FontAwesomeIcon className='c-pointer' icon={faTrash} onClick={() => props.delete()} />}
            </div>
            <div className="img-container">
                {details.image && <img className="post-photo" src={details.image} alt={details.photoDescription} onDoubleClick={toggleLike}/>}
            </div>
            <div className="post-footer rounded p-3">
                <div className='w-100 d-flex align-items-center'>
                    <h6 className='my-0 me-1 me-sm-2'>{details.photoName || "no name available"}</h6>
                    <span className='likes-num'>{details.likes || 0} likes</span>
                    <div className='ms-auto ps-4'>
                        { details.likedByUser ?
                        <FontAwesomeIcon className='h4 mb-0 like-icon c-pointer' icon={faSolidHeart} onClick={toggleLike} />:
                        <FontAwesomeIcon className='h4 mb-0 like-icon c-pointer' icon={faHeart} onClick={toggleLike}/> }
                    </div>
                </div>
                <p className='post-description shrunk-text mt-1'>{details.photoDescription || "no description available"}</p>
            </div>
        </div>
    )
}