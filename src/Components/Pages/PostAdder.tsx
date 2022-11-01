import Joi from "joi"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "../Navbar"
import "./PostAdder.css"

interface postAdderProps{
    localPosts:any,
    setLocalPosts:any,
}

const schema = Joi.object({
    name: Joi.string().min(5).max(30).pattern(/^[a-zA-z-,]+$/).required(),
    description: Joi.string().required(),
    pictureUrl: Joi.string().required()
})

const loadedNextId:number = JSON.parse(localStorage.getItem('nextId')) || 0;

export default function PostAdder(props:postAdderProps){
    const [valid, setValid] = useState<any>({});
    const [nextId, setNextId] = useState<number>(loadedNextId);
    const navigate  = useNavigate();

    const [photoName, setPhotoName] = useState('');
    const [description, setDescription] = useState('');
    const [pictureURL, setPictureURL] = useState('');

    useEffect(() => {
        if(!valid.error) return;
        if(valid.error.details[0].type !== 'string.pattern.base') return;
        let validCopy = {...valid};
        validCopy.error.message = `Illegal characters entered in "${valid.error.details[0].context.key}"`;
        validCopy.error.details[0].type = 'string.illegalChar';
        setValid(validCopy);
    },[valid]);
    useEffect(() => {
        localStorage.setItem('nextId', JSON.stringify(nextId));
    }, [nextId]);

    const handlePictureUrl = (e) => {
        let url = e.target.value && URL.createObjectURL(e.target.files[0]);
        setPictureURL(url);
    }
    
    const handleSubmit = (e) => {
        e.preventDefault(); 
        const result = schema.validate({name: photoName, description: description, pictureUrl: pictureURL});
        if(result.error) {setValid(result); return;}
        let localPostsCopy = props.localPosts; 
        localPostsCopy.posts = localPostsCopy.posts.concat([{id: nextId.toString(), photoName: result.value.name, photoDescription: result.value.description, username: "aliHaitham", userProfilePic: "", likes: 0, image: result.value.pictureUrl, likedByUser: false}])
        setNextId(nextId+1);
        props.setLocalPosts(localPostsCopy);
        navigate('/local');
    }

    return <>
    <Navbar />
    <div className="container">
        <form className="mt-5 pt-5" onSubmit={handleSubmit}>
            <div className="row mt-3 mb-3 justify-content-center">
                {valid && valid.error && <div className="text-center btn btn-danger error-message col-10 col-sm-8 col-md-6 mb-3"> {valid.error.message} </div>}
            </div>
            <div className="row mb-3 justify-content-center">
                <div className="d-flex align-items-start justify-content-space-between col-12 col-sm-8 col-md-6">
                    <label htmlFor="post-name" className="mt-2 me-4">Name</label>
                    <div className="w-100">
                        <input autoComplete={"off"} name="post-name" type="text" className="form-control" onChange={(e) => {setPhotoName(e.target.value)}}/>
                        <div className="d-flex justify-content-between validation-requirements fst-italic">
                            <div>required*</div>
                            <div>
                                <div>letters, -, and commas are allowed</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3 justify-content-center">
                <div className="d-flex align-items-center col-12 col-sm-8 col-md-6">
                    <label htmlFor="post-description" className="me-4">Description</label>
                    <div className="w-100" >
                        <textarea name="post-description" className="form-control" maxLength={255} onChange={((e)=>{setDescription(e.target.value)})} />
                        <div className="d-flex justify-content-between validation-requirements fst-italic">
                            <div>required*</div>
                            <div>{description.length} / 255</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3 justify-content-center">
                <div className="d-flex align-items-start col-12 col-sm-8 col-md-6">
                    <label htmlFor="post-photo" className="mt-2 me-4">Photo</label>
                    <div className="w-100">
                        <input className="form-control" name="post-photo" type="file" accept="image/jpg image/jpeg image/png" onChange={handlePictureUrl}/>
                        <div className="d-flex justify-content-between validation-requirements fst-italic">
                            <div>required*</div>
                            <div>jpg / jpeg / png</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row justify-content-center"><div className="d-flex justify-content-center"><button type="submit" className="btn btn-primary">ADD</button></div></div>
        </form>
    </div>
    </>
}