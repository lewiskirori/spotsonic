import React, { useState } from 'react';
import * as Dialog from "@radix-ui/react-dialog";
import { CgClose } from "react-icons/cg";
import Tooltip from '@mui/material/Tooltip';

interface ModalProps {
    isOpen: boolean;
    onChange: (open: boolean) => void;
    title: string;
    description: string;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onChange,
    title,
    description,
    children
}) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Dialog.Root
            open={isOpen}
            defaultOpen={isOpen}
            onOpenChange={onChange}
        >
            <Dialog.Portal>
                <Dialog.Overlay 
                    className="
                        bg-neutral-900/90
                        backdrop-blur-sm
                        fixed
                        inset-0
                    "
                />
                <Dialog.Content
                    className="
                        fixed
                        drop-shadow-md
                        border
                        border-neutral-700
                        top-[50%]
                        left-[50%]
                        max-h-full
                        h-full
                        md:h-auto
                        md:max-h-[85vh]
                        w-full
                        md:w-[90vw]
                        md:max-w-[450px]
                        translate-x-[-50%]
                        translate-y-[-50%]
                        rounded-md
                        bg-neutral-800
                        p-[25px]
                        focus:outline-none
                    "
                >
                    <Dialog.Title
                        className="
                            text-xl
                            text-center
                            font-bold
                            mb-4
                        "
                    >
                        {title}
                    </Dialog.Title>
                    <Dialog.Description
                        className="
                            mb-5
                            text-sm
                            leading-normal
                            text-center
                        "
                    >
                        {description}
                    </Dialog.Description>
                    <div>
                        {children}
                    </div>
                    <Dialog.Close asChild>
                        <Tooltip
                            title={
                                <span
                                style={{
                                    fontFamily: 'Montserrat',
                                    fontWeight: '600',
                                }}
                                >
                                {'Close'}
                                </span>
                            }
                            arrow={false}
                            placement="bottom"
                        >
                            <button
                                className="
                                    text-neutral-400
                                    hover:text-white
                                    transform
                                    hover:scale-110
                                    absolute
                                    top-[10px]
                                    right-[10px]
                                    inline-flex
                                    h-[25px]
                                    w-[25px]
                                    appearance-none
                                    items-center
                                    justify-center
                                    rounded-full
                                "
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                                style={{
                                    backgroundColor: isHovered ? '#000000' : 'transparent',
                                }}
                            >
                                <CgClose />
                            </button>
                        </Tooltip>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}

export default Modal;