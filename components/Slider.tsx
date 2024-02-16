"use client";

import * as RadixSlider from "@radix-ui/react-slider"
import { useState } from "react";

interface SliderProps {
    value?: number;
    onChange?: (value: number) => void;
};

const Slider: React.FC<SliderProps> = ({
    value = 1,
    onChange
}) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleChange = (newvalue: number[]) => {
        onChange?.(newvalue[0]);
    };

    return (
        <RadixSlider.Root
            className={`
                relative
                flex
                items-center
                select-none
                touch-none
                w-full
                h-10
            `}
            defaultValue={[1]}
            value={[value]}
            onValueChange={handleChange}
            max={1}
            step={0.1}
            aria-label="Volume"
        >
            <RadixSlider.Track
                className={`
                    bg-neutral-600
                    relative
                    grow
                    rounded-full
                    h-[3px]
                    transition-colors
                `}
            >
                <RadixSlider.Range 
                    className={`
                        absolute
                        bg-white
                        rounded-full
                        h-full
                        transition-colors
                        ${isHovered ? 'hover:bg-green-500' : ''}
                    `}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                />
            </RadixSlider.Track>
        </RadixSlider.Root>
    );
}

export default Slider;