"use client"

import React, { useState } from 'react';
import { LuLibrary } from "react-icons/lu";
import { HiOutlinePlus } from "react-icons/hi";
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';

const Library = () => {
    const [isActive, setIsActive] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const onClick = () => {
        setIsActive(!isActive);

    };

    React.useEffect(() => {
        if (!document.fonts.check('16px Montserrat')) {
          const head = document.head || document.getElementsByTagName('head')[0];
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap';
          head.appendChild(link);
        }
    }, []);

    
    return (
        <div className="flex flex-col">
            <div
                className="
                    flex
                    items-center
                    justify-between
                    px-5
                    pt-4
                "
            >
                <Tooltip
                    title={
                        <span
                        style={{
                            fontFamily: 'Montserrat',
                            fontWeight: '600',
                        }}
                        >
                        {'Your Collection Library'}
                        </span>
                    }
                    arrow={false}
                    placement="top"
                >
                    <div
                        className="inline-flex items-center gap-x-2 cursor-pointer"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        data-tip="Lib"
                    >
                        <LuLibrary
                            className={isHovered ? "text-white" : "text-neutral-400"}
                            size={26}
                            style={{
                                transition: "color 0.5s ease-in-out",
                            }}
                        />
                        <p
                            className={`text-neutral-400 text-md ${isHovered && "text-white"}`}
                            style={{
                                transition: "color 0.5s ease-in-out",
                            }}
                        >
                            My Library
                        </p>
                    </div>
                </Tooltip>

                <div>
                    <Tooltip
                        title={
                            <span
                            style={{
                                fontFamily: 'Montserrat',
                                fontWeight: '600',
                            }}
                            >
                            {isActive ? 'Creating your playlist' : 'Create playlist'}
                            </span>
                        }
                        arrow={false}
                        placement="top"
                    >
                        <IconButton
                            onClick={onClick}
                            className={`
                                text-neutral-400
                                hover:text-white
                                hover:bg-neutral-800
                                transition
                                duration-500 ease-in-out
                                ${isActive ? 'bg-black' : ''}
                            `}
                            >
                            <HiOutlinePlus size={20} />
                        </IconButton>
                    </Tooltip>
                </div>
            </div>
            <div className="
                flex
                flex-col
                gap-y-2
                mt-4
                px-3
            ">
                List of songs
            </div>
        </div>
    );
}

export default Library;