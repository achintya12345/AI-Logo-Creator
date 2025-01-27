"use client"
import React from 'react';
import Image from 'next/image'
import { Button } from '@/components/ui/button';
import { UserButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { User } from 'lucide-react';

function Header(){

    const {user} = useUser();

    return(
        <div className='px-10 lg:px-32 xl:px-48 2xl:px-56 p-4 flex justify-between items-center shadow-sm'>
            <Link href="/"><Image src={'/logo.svg'} alt='logo' width={180} height={10}/></Link>
            <div className='flex gap-3 items-center'>
                {user ?  <Link href="/dashboard"><Button>DashBoard</Button></Link> : 
                <Image src={'/logo2.svg'} alt='logo' width={180} height={10}/>}
                <UserButton></UserButton>
            </div>
        </div>        
    )
}

export default Header;