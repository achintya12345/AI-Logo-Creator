"use client"
import React, { useContext, useEffect, useState } from 'react'
import { UserDetailContext } from '../_context/UserDetailContext';
import Prompt from '../_data/Prompt';
import axios from 'axios';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import Lookup from '../_data/Lookup';
import { DownloadIcon, LayoutDashboard, LoaderIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function GenerateLogo(){

    const {userDetail, setUserDetail} = useContext(UserDetailContext);
    const [formData, setFormData] = useState();
    const [loading, setLoading] = useState(false); 
    const [logoImage, setLogoImage] = useState();
    const searchParams = useSearchParams();
    const modelType = searchParams.get('type');

    useEffect(()=>{
        if(typeof window != 'undefined' && userDetail?.email){
            const storage = localStorage.getItem('formData');
            if(storage){
                setFormData(JSON.parse(storage));
            }
        }
    }, [userDetail])

    useEffect(()=>{
        if(formData?.title){
            GenerateAILogo();
        }
    }, [formData])

    const GenerateAILogo = async() => {

        if(modelType!='Free'){ // userDetail?.credits <= 0
            console.log("Not enough credits")
            toast('Currently not available, please use free option')
            return;
        }

        setLoading(true);
        const PROMPT = Prompt.LOGO_PROMPT.replace('{logoTitle}', formData?.title)
        .replace('{logoDesc}', formData?.desc)
        .replace('{logoIdea}', formData?.idea)
        .replace('{logoColor}', formData?.palette)
        .replace('{logoDesign}', formData?.design?.title)
        .replace('{logoPrompt}', formData?.design?.prompt)

        const result = await axios.post('/api/ai-logo-model', {
            prompt: PROMPT,
            email: userDetail?.email,
            title: formData?.title,
            desc: formData?.desc,
            type: modelType,
            userCredits: userDetail?.credits
        });

        setLogoImage(result?.data?.image);
        setLoading(false);
    }

    const onDownload = () =>{
        const imageWindow =  window.open();
        imageWindow.document.write(`<img src=${logoImage} alt="Base64"/>`)
    }

    return(
        <div className='mt-16 flex flex-col items-center justify-center'>

            {/* <h2>{loading && 'Loading...'}</h2>
            {!loading && <Image src={logoImage} alt='logo' width={200} height={200}/>} */}

            {loading && 
            <div className='flex flex-col items-center mt-2'>
                <h2 className='font-bold text-3xl text-primary'>{Lookup?.LoadingWaitTitle}</h2>
                <p className='text-xl text-gray-500'>{Lookup?.LoadingWaitDesc}</p>
                <Image src={'/loading.gif'} alt='loading' width={200} height={200}/>
                <h2 className='mt-2 font-medium text-2xl text-gray-500'>Do not Refresh</h2>
            </div>}

            {logoImage && 
            <div className='mt-5'>
                <h2 className='font-bold text-3xl text-primary'>{Lookup?.LoadingFinishTitle}</h2>
                <Image src={logoImage} alt='logo' width={300} height={300} className='rounded-xl'/>
                <div className='mt-4 flex items-center gap-5'>
                    <Button onClick={()=>onDownload()}><DownloadIcon/>Download</Button>
                    <Link href="/dashboard"><Button variant='outline'><LayoutDashboard/>Dashboard</Button></Link>
                </div>
            </div>}
        </div>
    )
}

export default GenerateLogo;