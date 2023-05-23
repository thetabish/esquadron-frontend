import React from 'react'

const Rightbar = () => {
    return (
        <div className='flex-3 sticky top-16 h-[calc(100%-4rem)] bg-slate-300'>
            <div className="container p-5 ">
                <div className="item mb-5 p-5 shadow-lg bg-slate-50 rounded-md">
                    <span className='text-gray-600'>Suggestions</span>
                    <div className="user flex items-center justify-between py-5 px-0">
                        <div className="userInfo flex items-center gap-3 relative">
                            <img
                                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                                alt=""
                                className='w-10 h-10 rounded-md object-cover'
                            />
                            <span className='text-gray-600 mr-4'>John Doe</span>
                        </div>
                        <div className="buttons flex items-center gap-3">
                            <button className='border-none p-2 text-white cursor-pointer bg-blue-500 rounded-lg'>Follow</button>
                            <button className='border-none p-2 text-white cursor-pointer bg-red-700 rounded-lg'>Dismiss</button>
                        </div>
                    </div>
                    <div className="user flex items-center justify-between py-5 px-0">
                        <div className="userInfo userInfo flex items-center gap-3 relative">
                            <img
                                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                                alt=""
                                className='w-10 h-10 rounded-md object-cover'
                            />
                            <span className='text-gray-600 mr-4'>John Doe</span>
                        </div>
                        <div className="buttons flex items-center gap-3">
                            <button className='border-none p-2 text-white cursor-pointer bg-blue-500 rounded-lg'>Follow</button>
                            <button className='border-none p-2 text-white cursor-pointer bg-red-700 rounded-lg'>Dismiss</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Rightbar