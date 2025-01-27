"use client"
import React, {useState} from 'react'
import LogoDesig from '@/app/_data/LogoDesig';
import Link from 'next/link';
import Lookup from '../_data/Lookup';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

function Hero(){
    const [logoTitle, setLogoTitle] = useState();

    return(
        <div className='flex items-center mt-24 flex-col gap-5'>
            <h2 className='text-primary text-5xl text-center font-bold'>{Lookup.HeroHeading}</h2>
            <h2 className='text-5xl text-center font-bold'>{Lookup.HeroSubHeading}</h2>
            <h2 className='text-lg text-gray-500 text-center'>{Lookup.HeroDesc}</h2>

            <div className='flex gap-6 w-full max-w-2xl mt-10'>
                <input placeholder={Lookup.InputTitlePlaceholder}
                className='p-3 border rounded-md w-full shadow-md'
                onChange={(e)=>{setLogoTitle(e.target.value)}}/>
                <Link href={'/create?title=' + logoTitle}>
                    <Button className="w-full p-6">Get Started</Button>
                </Link>
            </div>

            <div className='mt-10 '>
                <div className='grid grid-cols-2 md: grid-cols-3 lg:grid-cols-3 gap-5'>
                    {LogoDesig.map((design, index)=>(
                        <div key={index} className= {`p-1`}>
                            <Image src={design?.image} alt={design?.title} width={500} height={200} className='w-full rounded-xl h-[150px] object-cover'/>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default Hero;