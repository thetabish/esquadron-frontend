import React from 'react'
import {PostsData} from '../Data/PostsData.js'
import Post from './Post.jsx'

const Posts = () => {
    return (
      <div>
          {PostsData.map((post, id)=>{
              return <Post data={post} id={id}/>
          })}
      </div>
    )
  }

export default Posts