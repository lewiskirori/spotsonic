"use client";

import React from 'react';
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import Tooltip from '@mui/material/Tooltip';
import { GoHomeFill } from "react-icons/go";
import Ripples from 'react-ripples';
import { LuSearch } from 'react-icons/lu';
import Button from './Button';
import useAuthModal from '@/hooks/useAuthModal';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useUser } from '@/hooks/useUser';
import { useState } from 'react';
import { HiUser } from "react-icons/hi";
import { Typography } from '@mui/material';

interface HeaderProps {
    children: React.ReactNode;
    className?: String;
}

const Header: React.FC<HeaderProps> = ({
    children,
    className
}) => {
    const authModal = useAuthModal();
    const router = useRouter();

    const supabaseClient = useSupabaseClient();
    const { user } = useUser();

    const [loggingOut, setLoggingOut] = useState(false);

    const handleLogout = async () => {
        setLoggingOut(true);

        const { error } = await supabaseClient.auth.signOut();

        setLoggingOut(false);
    
        router.refresh();

        if (error) {
            console.log(error);
        }
    }


    return (
        <div
         className={twMerge(`
            h-fit
            bg-gradient-to-b
            from-emerald-800
            p-6
            ${className}
         `)}
        >
            <div className="
                w-full
                mb-4
                flex
                items-center
                justify-between
            ">
                <div className="
                    hidden
                    md:flex
                    gap-x-2
                    items-center
                ">
                    <Ripples
                        className="rounded-full"
                        color="rgba(255, 255, 255, 0.7)"
                    >
                        <Tooltip
                            title={
                                <span
                                style={{
                                    fontFamily: 'Montserrat',
                                    fontWeight: '600',
                                }}
                                >
                                {'Go back'}
                                </span>
                            }
                            arrow={false}
                            placement="bottom"
                        >
                        <button
                            onClick={() => router.back()}
                            className="
                                rounded-full
                                bg-black
                                flex
                                items-center
                                justify-center
                                hover:opacity-75
                                transition
                                duration-300 ease-in-out
                            "
                        >
                            <RxCaretLeft className="text-white" size={35} />
                        </button>
                        </Tooltip>
                    </Ripples>
                    <Ripples
                        className="rounded-full"
                        color="rgba(255, 255, 255, 0.7)"
                    >
                        <Tooltip
                            title={
                                <span
                                style={{
                                    fontFamily: 'Montserrat',
                                    fontWeight: '600',
                                }}
                                >
                                {'Go forward'}
                                </span>
                            }
                            arrow={false}
                            placement="bottom"
                        >
                        <button
                            onClick={() => router.forward()}
                            className="
                                rounded-full
                                bg-black
                                flex
                                items-center
                                justify-center
                                hover:opacity-75
                                transition
                                duration-300 ease-in-out
                            "
                        >
                            <RxCaretRight className="text-white" size={35} />
                        </button>
                        </Tooltip>
                    </Ripples>
                </div>
                <div className="flex md:hidden gap-x-2 items-center">
                    <Ripples
                        className="rounded-full"
                        color="rgba(255, 255, 255, 0.7)"
                    >
                        <button
                            className="
                                rounded-full
                                p-2
                                bg-white
                                flex
                                items-center
                                justify-center
                                hover:opacity-75
                                transition
                                duration-300 ease-in-out
                            "
                        >
                            <GoHomeFill className="text-black" size={20} />
                        </button>
                    </Ripples>
                    <Ripples
                        className="rounded-full"
                        color="rgba(255, 255, 255, 0.7)"
                    >
                        <button
                            className="
                                rounded-full
                                p-2
                                bg-white
                                flex
                                items-center
                                justify-center
                                hover:opacity-75
                                transition
                                duration-300 ease-in-out
                            "
                        >
                            <LuSearch className="text-black" size={20} />
                        </button>
                    </Ripples>
                </div>
                <div
                    className="
                        flex
                        justify-between
                        items-center
                        gap-x-4
                    "
                >
                    {user ? (
                        <div className={`flex gap-x-4 items-center ${className}`}>
                            <Button
                                onClick={handleLogout}
                                className="
                                bg-white 
                                px-6
                                py-2
                                transition-all
                                ease-in-out
                                border
                                border-solid
                                border-white
                                hover:bg-transparent
                                hover:border-red-500
                                hover:text-red-500
                                active:bg-transparent
                                active:border-red-500
                                active:text-red-500
                                "
                            >
                                {loggingOut ? 'Logging out…' : 'Logout'}
                            </Button>
                            <Tooltip
                                title={
                                    <React.Fragment>
                                        <span
                                        style={{
                                            fontFamily: 'Montserrat',
                                            fontWeight: '600',
                                        }}
                                        >
                                        <Typography 
                                            fontFamily= 'inherit'
                                            fontWeight= '600'
                                            fontSize= 'inherit'
                                        >
                                            {'Hi,'}
                                        </Typography>
                                        {user ? user.email : ''}
                                        </span>
                                    </React.Fragment>
                                }
                                arrow={false}
                                placement="bottom"
                            >
                                <Button
                                    onClick={() => router.push('/account')}
                                    className='
                                    bg-white
                                    hover:opacity-75
                                    transition
                                    duration-300 ease-in-out
                                    '
                                >
                                    <HiUser size={20} />
                                </Button>
                            </Tooltip>
                        </div>
                    ) : (
                        <>
                            <div>
                                <Button
                                    onClick={authModal.onOpen}
                                    className='
                                        bg-transparent
                                        text-neutral-300
                                        font-md
                                        transition-transform duration-100 ease-in-out
                                        hover:text-white
                                        hover:transform hover:scale-110
                                    '
                                >
                                    Sign up
                                </Button>
                            </div>
                            <div>
                                <Button
                                    onClick={authModal.onOpen}
                                    className='
                                        bg-white
                                        px-8
                                        py-3
                                        hover:transform hover:scale-110
                                        transition-transform duration-100 ease-in-out
                                    '
                                >
                                    Log in
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            </div>
            {children}
        </div>
    );
}

export default Header;