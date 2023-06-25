import React from 'react';


const NoPost = () => {
  return (
    <div className="flex flex-col my-6 p-4 py-6 bg-slate-100 rounded-lg gap-3 shadow-md max-w-3xl font-poppins">
    <img
        src="https://media.tenor.com/y_RjYoWx5NQAAAAC/spongebob-wait.gif"
        alt=""
        className="w-full h-2/3 object-cover rounded-md"
      />
      <div><b>Hello darkness, my old friend. Looks like there are no posts to entertain us at the moment.</b></div>
    </div>
  );
};

export default NoPost;
