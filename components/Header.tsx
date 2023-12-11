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

interface HeaderProps {
    children: React.ReactNode;
    className?: String;
}

const Header: React.FC<HeaderProps> = ({
    children,
    className
}) => {
    const router = useRouter();

    const handleLogout = () => {

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
                            <GoHomeFill className="text-black" size={20}/>
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
                            <LuSearch className="text-black" size={20}/>
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
                    <>
                        <div>
                            <Button
                                onClick={() => {}}
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
                                onClick={() => {}}
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
                </div>
            </div>
            {children}
        </div>
    );
}

export default Header;