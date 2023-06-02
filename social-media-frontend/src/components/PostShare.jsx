import React, { useState, useRef } from 'react'
import { UilScenery, UilPlayCircle, UilPostcard } from "@iconscout/react-unicons"
import Profile from "../assets/profileImg.jpg"


const PostShare = () => {
    const [image, setImage] = useState(null)
    const imageRef = useRef()
   const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
        let img = event.target.files[0];
        setImage({
            image: URL.createObjectURL(img),
        });
    }
}

    return (
        <>
            <div className='PostShare flex gap-4 bg-slate-100 p-4 rounded-2xl shadow-md w-full'>
                <img
                    src={Profile}
                    alt=""
                    className='w-12 h-12 rounded-full object-cover'
                />
                <div className='flex flex-col w-5/6 gap-4'>
                    <input type="text" placeholder="What's happening?" className='bg-slate-300 rounded-xl p-3 text-base text-black outline-none' />
                    <div className="postOptions flex justify-around">
                        <div className="option p-1 flex items-center justify-center text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"
                            onClick={() => imageRef.current.click()}
                        >
                            <UilScenery />
                            Photo
                        </div>
                        <div className="option p-1 flex items-center justify-center text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2">
                            <UilPlayCircle />
                            Video
                        </div>
                        <div className='p-1 flex items-center justify-center text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2'>
                            <UilPostcard/>
                            Post
                        </div>
                        <div className='hidden'>
                            <input type='file' name="myImage" ref={imageRef} onChange={onImageChange} />
                        </div>
                    </div>
                    {image && (

                        <div className="previewImage">
                            <UilTimes onClick={() => setImage(null)} />
                            <img src={image.image} alt="" />
                        </div>

                    )}
                </div>

            </div>
        </>
    )
}

export default PostShare