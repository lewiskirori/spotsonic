"use client";

import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaHeart, FaRegHeart } from "react-icons/fa";

interface LikeButtonProps {
    songId: string;
}

const LikeButton: React.FC<LikeButtonProps> = ({
    songId
}) => {
    const router = useRouter();
    const { supabaseClient } = useSessionContext();

    const authModal = useAuthModal();
    const { user } = useUser();

    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        if (!user?.id) {
            return;
        }

        const fetchData = async () => {
            const { data, error } = await supabaseClient
                .from('liked_songs')
                .select('*')
                .eq('user_id', user.id)
                .eq('song_id', songId)
                .single();

            if (!error && data) {
                setIsLiked(true);
            }
        };

        fetchData();
    }, [songId, supabaseClient, user?.id]);

    const Icon = isLiked ? FaHeart : FaRegHeart;

    const handleLike = async () => {
        if(!user) {
            return authModal.onOpen();
        }

        if(isLiked) {
            const { error } = await supabaseClient
                .from('liked_songs')
                .delete()
                .eq('user_id', user.id)
                .eq('song_id', songId);

            if (error) {
                toast.error(error.message);
            } else {
                setIsLiked(false);
                toast.promise(
                    new Promise<void>((resolve, reject) => {
                        setTimeout(() => {
                        const success = true;
                        if (success) {
                            resolve();
                        } else {
                            reject();
                        }
                        }, 2500);
                    }),
                        {
                        loading: 'Disliking…',
                        success: <b>Unliked!</b>,
                        error: <b>Oops! Could’t withdraw your like.</b>,
                        }
                    );
                } 
            } else {
                const { error } = await supabaseClient
                    .from('liked_songs')
                    .insert({
                        song_id: songId,
                        user_id: user.id
                    });

            if (error) {
                toast.error(error.message);
            } else {
                setIsLiked(true);
                toast.promise(
                new Promise<void>((resolve, reject) => {
                    setTimeout(() => {
                    const success = true;
                    if (success) {
                        resolve();
                    } else {
                        reject();
                    }
                    }, 3000);
                }),
                    {
                    loading: 'Liking…',
                    success: <b>I like this!</b>,
                    error: <b>Oops! Could’t add your like.</b>,
                    }
                );
            }
        }

        router.refresh();
    }

    return (
        <button
            onClick={handleLike}
            className="
                hover:opacity-75
                transition
            "
        >
            <Icon color={isLiked ? '#22c55e' : 'rgb(163, 163, 163)'} size={25} />
        </button>
    );
}

export default LikeButton;