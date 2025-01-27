"use client"
import { UserDetailContext } from '@/app/_context/UserDetailContext';
import { db } from '@/configs/FirebaseConfig';
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react'
import { doc, setDoc, getDocs, collection } from "firebase/firestore"

function LogoList(){

    const  {userDetail, setUserDetail} = useContext(UserDetailContext);
    const [logoList, setLogoList] = useState([]);

    useEffect(()=>{
        userDetail && GetUsersLogo();
    }, [userDetail]);

    const GetUsersLogo = async() => {
        const querySnapshot = await getDocs(collection(db, "users", userDetail?.email, "logos"))

        setLogoList([]);
        querySnapshot.forEach((doc)=>{
            setLogoList(prev=>[...prev, doc.data()])
        });
    }

    const ViewLogo = (image) => {
        const imageWindow =  window.open();
        imageWindow.document.write(`<img src=${image} alt="Base64 Image"/>`)
    }

    return(
        <div className='mt-10 '>
            <div className='grid grid-cols-2 md: grid-cols-3 lg:grid-cols-4 gap-5'>
                {logoList?.length > 0 ? logoList.map((logo, index)=>(
                    <div key={index} className='hover:scale-105 transition-all cursor-pointer' onClick={()=>ViewLogo(logo?.image)}>
                        <Image src={logo?.image} width={400} height={200} alt={logo?.title} className='w-full rounded-xl'/>
                        <h2 className='text-center text-lg mt-2'>{logo?.title}</h2>
                        <p className='text-sm text-gray-500 text-center'>{logo?.desc}</p>
                    </div>
                )) : 
                [1,2,3,4,5,6].map((item, index)=>(
                    <div key={index} className='bg-slate-200 animate-pulse rounded-xl w-full height-[200px]'>
        
                    </div>
                ))}
            </div>
        </div>
    )
}

export default LogoList;