import React from 'react'
import Comment from '../assets/comment.png'
import Share from '../assets/share.png'
import Heart from '../assets/like.png'

const Post = ({ data }) => {
    return (
      <div className="flex flex-col my-6 p-4 bg-slate-100 rounded-lg gap-3 shadow-md max-w-3xl">
        <img src={data.img} alt="" className="w-full h-2/3 object-cover rounded-md" />
  
        <div className="flex items-start gap-6">
          <img src={Heart} alt="" />
          <img src={Comment} alt="" />
          <img src={Share} alt="" />
        </div>
  
        <span className="text-gray-500 text-xs">{data.likes} likes</span>
  
        <div className="mb-0">
          <span>
            <b>{data.name} &nbsp; </b>
          </span>
          <span>{data.desc}</span>
        </div>
      </div>
    );
  };

export default Post