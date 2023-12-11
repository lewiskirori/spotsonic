"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { GrPlayFill } from "react-icons/gr";

interface ListItemProps {
    image: string;
    name: string;
    href: string;
}

const ListItem: React.FC<ListItemProps> = ({
    image,
    name,
    href,
}) => {
    const router = useRouter();

    const onClick = () => {
        router.push(href);
    }

    return (
        <button
            onClick={onClick}
            className="
                relative
                group
                flex
                items-center
                rounded-md
                overflow-hidden
                gap-x-4
                bg-neutral-100/10
                hover:bg-neutral-100/20
                transition
                duration-300 ease-in-out
                pr-4
            "
        >
            <div className="
                relative
                min-h-[64px]
                min-w-[64px]
            ">
                <Image 
                    className="object-cover"
                    fill
                    src={image}
                    alt="SS-Image"
                />
            </div>
            <p className="truncate py-5">
                {name}
            </p>
            <div
                className="
                    absolute
                    transition-transform duration-100 ease-in-out
                    opacity-0
                    rounded-full
                    flex
                    items-center
                    justify-center
                    bg-green-500
                    p-4
                    drop-shadow-md
                    right-5
                    group-hover:opacity-100
                    hover:transform hover:scale-110
                "
            >
                <GrPlayFill className="text-black" />
            </div>
        </button>
    );
}

export default ListItem;