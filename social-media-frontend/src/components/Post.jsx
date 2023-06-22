import React from 'react';
import Comment from '../assets/comment.png';
import Share from '../assets/share.png';
import Heart from '../assets/like.png';

const Post = ({ data }) => {
  return (
    <div className="flex flex-col my-6 p-4 py-6 bg-slate-100 rounded-lg gap-3 shadow-md max-w-3xl font-poppins">
      {data.image_base64 && (
        <img
          src={`data:image/png;base64,${data.image_base64}`}
          alt=""
          className="w-full h-2/3 object-cover rounded-md"
        />
      )}

      <div className="flex items-start gap-6">
        <img src={Heart} alt="" />
        <img src={Comment} alt="" />
        <img src={Share} alt="" />
      </div>

      <div className="mb-0">
        <span>
          <b>{data.user_name}&nbsp;</b>
        </span>
        <span>{data.text}</span>
      </div>
    </div>
  );
};

export default Post;
