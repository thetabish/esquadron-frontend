import React from 'react'

import { useState, useEffect } from "react";


function ProfileInfo() {
    const [loc, setLoc] = useState('-');
    const [work, setWork] = useState('-');
    const [rel, setRel] = useState('-');
    const [edit, setEdit] = useState(true);
    const [bio, setBio] = useState(null)

    const triggerEdit = () => {
        return setEdit( !edit )
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setEdit( !edit )
        const bio = {rel, loc, work};
        
        fetch('http://localhost:3000/bio/1', {
            method: 'PUT',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                rel: rel,
                work: work,
                loc: loc,
                id: 1
            })
        })
        .then(res => res.json())
    }

    useEffect(() => {
        fetch('http://localhost:3000/bio')
            .then(res => {
                return res.json();
            })
            .then(data => {
                setBio(data);
            })
    },[bio])

  return (
    <form onSubmit={handleSubmit}>
        { bio &&
    <div className='flex flex-col gap-3 bg-slate-200 p-4 rounded-lg w-90% shadow-md mt-3 ml-3 font-poppins'>
        <div className="flex justify-between items-center cursor-pointer">
            <h4 className='text-lg'><b>Bio</b></h4>
        </div>
        {bio.map(bios => ( 
        <div className="bio" key={bios.id}>
        <div className="info">
            <span>
                <b>Relationship Status<br></br></b>
            </span>
            {edit ? (
            <span>{bios.rel}</span>
            ) : (
                <select
                    value={rel}
                    onChange={(e) => setRel(e.target.value)}
                >
                    <option value="Single">Single</option>
                    <option value="In a relationship">In a Relationship</option>
                    <option value="It's complicated">It's complicated</option>
                    <option value="-">-</option>
                </select>
                )}
        </div>
        <div className="info">
            <span>
                <b>Lives in<br></br></b>
            </span>
            {edit ? (
            <span>{bios.loc}</span>
            ) : (
             <input type='text' onChange={(e) => setLoc(e.target.value)}></input>
            )}
        </div>
        <div className="info">
            <span>
                <b>Works at<br></br></b>
            </span>
            {edit ? (
            <span>{bios.work}</span>
            ) : (
                <input type='text' onChange={(e) => setWork(e.target.value)}></input>
                )}
        </div>
        </div>
        ))}
        <div className='self-end'>
        {edit ? (
        <button onClick={triggerEdit} 
        class=" text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2">Edit</button>
        ) : (
            <button onClick={handleSubmit} 
            type="button"
            class=" text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2">Done</button>   
        )}
        </div>
    </div>
}
    </form>
  )
}

export default ProfileInfo