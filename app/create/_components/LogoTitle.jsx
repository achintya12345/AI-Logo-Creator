"use client"
import React, {useEffect, useState} from 'react'

import Lookup from '@/app/_data/Lookup';
import { useSearchParams } from 'next/navigation';
import HeadingDescription from './HeadingDescription';

function LogoTitle({onHandleInputChange, formData}){

    const searchParams = useSearchParams();
    const [title,setTitle] = useState(searchParams?.get('title') ?? formData?.title);

    useEffect(()=>{
        onHandleInputChange(title);
    }, [])

    return(
        <div className='my-10 '>
            <HeadingDescription 
                title={Lookup?.LogoTitle}
                description={Lookup?.LogoTitleDesc}
            /> 

            <input type='text' placeholder={Lookup?.InputTitlePlaceholder}
            className='p-4 border rouned-lg mt-5 w-full'
            value={formData?.title}
            onChange={(e)=>onHandleInputChange(e.target.value)}
            />
        </div>
    )
}

export default LogoTitle;