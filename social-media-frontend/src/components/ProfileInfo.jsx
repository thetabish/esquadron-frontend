import React from 'react'
import {UilPen} from '@iconscout/react-unicons'


const ProfileInfo = () => {
    

const userData = JSON.parse(localStorage.getItem('userData'));
  return (
    <div className='flex flex-col gap-3 bg-slate-200 p-4 rounded-lg w-90% shadow-md mt-3 ml-3 font-poppins'>
        <div className="flex justify-between items-center">
            <h4 className='text-lg'><b>Bio</b></h4>
        </div>
        <div className="info">
            <span>
                <b>Relationship Status<br></br></b>
            </span>
            <span>{ userData.relation ? userData.relation : '-' }</span>
        </div>
        <div className="info">
            <span>
                <b>Lives in<br></br></b>
            </span>
            <span>{userData.country ? userData.country : '-' }, {userData.city ? userData.city : '-' }</span>
        </div>
        <div className="info">
            <span>
                <b>Works at<br></br></b>
            </span>
            <span>{ userData.work ? userData.work : '-' }</span>
        </div>
        <button type="button" class="self-end text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2">Edit</button>
    </div>
  )
}

export default ProfileInfo