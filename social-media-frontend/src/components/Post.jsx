import React from 'react'
import Comment from '../assets/comment.png'
import Share from '../assets/share.png'
import Heart from '../assets/like.png'

const Post = ({ data }) => {
    return (
      <div className="flex flex-col p-4 bg-cardColor rounded-lg gap-4">
        <img src={data.img} alt="" className="w-full max-h-20rem object-cover rounded-md" />
  
        <div className="flex items-start gap-6">
          <img src={Heart} alt="" />
          <img src={Comment} alt="" />
          <img src={Share} alt="" />
        </div>
  
        <span className="text-gray-500 text-xs">{data.likes} likes</span>
  
        <div className="detail">
          <span>
            <b>{data.name} &nbsp; </b>
          </span>
          <span>{data.desc}</span>
        </div>
      </div>
    );
  };

export default Post