"use client";

import './playerContent.css';
import { Song } from "@/types";
import MediaItem from "./MediaItem";
import LikeButton from "./LikeButton";
import { MdPause } from "react-icons/md";
import { ImPlay3 } from "react-icons/im";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import Slider from "./Slider";
import usePlayer from "@/hooks/usePlayer";
import { useEffect, useRef, useState } from "react";
import { Howl } from 'howler';
import Tooltip from '@mui/material/Tooltip';

interface PlayerContentProps {
    song: Song;
    songUrl: string;
}

const PlayerContent: React.FC<PlayerContentProps> = ({
    song,
    songUrl
}) => {
    const player = usePlayer();
    const [volume, setVolume] = useState(1);
    const [isPlaying, setIsPlaying] = useState(false);
    const [sound, setSound] = useState<Howl | null>(null);
    const [prevVolume, setPrevVolume] = useState(1);

    const keyListener = useRef<any>(null);

    const Icon = isPlaying ? MdPause : ImPlay3;
    const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

    const onPlayNext = () => {
        if (player.ids.length === 0) {
            return;
        }

        const currentIndex = player.ids.findIndex((id) => id === player.activeId);
        const nextSong = player.ids[currentIndex + 1];

        if (!nextSong) {
            return player.setId(player.ids[0]);
        }

        player.setId(nextSong);
    };

    const onPlayPrev = () => {
        if (player.ids.length === 0) {
            return;
        }

        const currentIndex = player.ids.findIndex((id) => id === player.activeId);
        const prevSong = player.ids[currentIndex - 1];

        if (!prevSong) {
            return player.setId(player.ids[player.ids.length - 1]);
        }

        player.setId(prevSong);
    };

    useEffect(() => {
        const newSound = new Howl({
            src: [songUrl],
            autoplay: true,
            volume: volume,
            loop: false,
            format: ['mp3'],
            onplay: () => setIsPlaying(true),
            onpause: () => setIsPlaying(false),
            onend: () => {
                setIsPlaying(false);
                onPlayNext();
            }
        });

        setSound(newSound);

        keyListener.current = (event: KeyboardEvent) => {
            if (event.code === 'Space') {
                handlePlay();
            } else if (event.code === 'KeyM') {
                toggleMute();
            }
        };

        window.addEventListener('keydown', keyListener.current);

        return () => {
            if (newSound) {
                newSound.unload();
            }

            window.removeEventListener('keydown', keyListener.current);
        };
    }, [songUrl]);

    useEffect(() => {
        if (sound) {
            sound.volume(volume);
        }
    }, [sound, volume]);

    const handlePlay = () => {
        if (!sound) return;

        if (isPlaying) {
            sound.pause();
        } else {
            sound.play();
        }
    };

    const toggleMute = () => {
        if (volume === 0) {
            setVolume(prevVolume);
        } else {
            setPrevVolume(volume);
            setVolume(0);
        }
    };

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 h-full">
            <div className="
                player-content
                flex
                w-full
                justify-start
            ">
                <div className="flex items-center gap-x-4">
                    <div className="w-36">
                        <MediaItem data={song} />
                    </div>
                    <LikeButton songId={song.id} />
                </div>
            </div>

            <div className="
                flex
                md:hidden
                col-auto
                w-full
                justify-end
                items-center
            ">
                <div
                    onClick={handlePlay}
                    className="
                        h-10
                        w-10
                        flex
                        items-center
                        justify-center
                        rounded-full
                        bg-white
                        p-1
                        cursor-pointer
                    "
                >
                    <Icon size={30} className="text-black" />
                </div>
            </div>

            <div
                className="
                    hidden
                    h-full
                    md:flex
                    justify-center
                    items-center
                    w-full
                    max-w-[722px]
                    gap-x-6
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
                        {'Previous'}
                        </span>
                    }
                    arrow={false}
                    placement="top"
                >
                <AiFillStepBackward
                    onClick={onPlayPrev} 
                    size={30}
                    className="
                        text-neutral-400
                        cursor-pointer
                        hover:text-white
                        transition
                    "
                />
                </Tooltip>
                <div
                    onClick={handlePlay}
                    className="
                        flex
                        items-center
                        justify-center
                        h-10
                        w-10
                        rounded-full
                        bg-white
                        p-1
                        cursor-pointer
                    "
                >
                    <Icon size={30} className="text-black" />
                </div>
                <Tooltip
                    title={
                        <span
                        style={{
                            fontFamily: 'Montserrat',
                            fontWeight: '600',
                        }}
                        >
                        {'Next'}
                        </span>
                    }
                    arrow={false}
                    placement="top"
                >
                <AiFillStepForward
                    onClick={onPlayNext}
                    size={30}
                    className="
                        text-neutral-400
                        cursor-pointer
                        hover:text-white
                        transition
                    "
                />
                </Tooltip>
            </div>

            <div className="hidden md:flex w-full justify-end pr-2">
                <div className="flex items-center gap-x-2 w-[120px]">
                    <Tooltip
                        title={
                            <span
                            style={{
                                fontFamily: 'Montserrat',
                                fontWeight: '600',
                            }}
                            >
                            {volume === 0 ? 'Unmute' : 'Mute'}
                            </span>
                        }
                        arrow={false}
                        placement="top"
                    >
                    <VolumeIcon 
                        onClick={toggleMute}
                        className="text-neutral-400 cursor-pointer hover:text-white transition"
                        size={34}
                    /></Tooltip>
                    <Slider 
                        value={volume} 
                        onChange={(value) => setVolume(value)}
                    />
                </div>
            </div>
        </div>
    );
}
export default PlayerContent;