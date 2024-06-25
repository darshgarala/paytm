import React, { useEffect } from 'react'
import { useState } from 'react';
import Button from './Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState([]);

    useEffect( ()=>{
        const getUserFun = async () => {
            const getAllUser = await axios.get('http://localhost:3001/api/v1/user/bulk?filter='+filter);
            setUsers(getAllUser.data.user);
        }
        getUserFun();
    },[filter]);
  return (
    <>
        <div className="font-bold mt-6 text-lg">
            Users
        </div>
        <div className="my-2">
            <input onChange={(e)=>{setFilter(e.target.value)}} type="text" placeholder="Search users..." className="w-full px-2 py-1 border rounded border-slate-200"></input>
        </div>
        <div>
            {users.map(user => <User user={user} />)}
        </div>
    </>
  )
}

function User({user}) {
    const navigate = useNavigate();
    console.log(user);
    return <div className="flex justify-between">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.firstname[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center h-ful">
                <div>
                    {user.firstname} {user.lastname}
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center h-ful">
            <Button onClick={(e)=>{
                navigate('/send?id='+user._id+"&name="+user.firstname);
            }} label={"Send Money"} />
        </div>
    </div>
}
export default Users
