"use client";

import uniqid from "uniqid";
import useUploadModal from "@/hooks/useUploadModal";
import Modal from "./Modal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import toast from "react-hot-toast";
import { useUser } from "@/hooks/useUser";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";

const UploadModal = () => {
    const [isLoading, setIsLoading] = useState(false);
    const uploadModal = useUploadModal();
    const { user } = useUser();
    const supabaseClient = useSupabaseClient();
    const router = useRouter();

    const {
        register,
        handleSubmit,
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            author: '',
            title: '',
            song: null,
            image: null,
        }
    })

    const onChange = (open: boolean) => {
        if (!open) {
            reset();
            uploadModal.onClose();
        }
    }

    const onSubmit: SubmitHandler<FieldValues> = async (values) => {
        try {
            setIsLoading(true);

            const imageFile = values.image?.[0];
            const songFile = values.song?.[0];

            if (!imageFile || !songFile || !user) {
                toast.error('Mandatory details are omitted.');
                return;
            }

            const uniqueID = uniqid();

            // Song upload
            const {
                data: songData,
                error: songError,
            } = await supabaseClient
                .storage
                .from('songs')
                .upload(`song-${values.title}-${uniqueID}`, songFile, {
                    cacheControl: '3600',
                    upsert: false
                });

                if (songError) {
                    setIsLoading(false);
                    return toast.error('We hit a bump while uploading the song:/ Let’s try that again.');
                }


            // Picture upload
            const {
                data: imageData,
                error: imageError,
            } = await supabaseClient
                .storage
                .from('images')
                .upload(`image-${values.title}-${uniqueID}`, imageFile, {
                    cacheControl: '3600',
                    upsert: false
                });

                if (imageError) {
                    setIsLoading(false);
                    return toast.error('Uh-oh! We hit a snag during picture upload.')
                }

            const {
                error: supabaseError
            } = await supabaseClient
                .from('songs')
                .insert({
                    user_id: user.id,
                    title: values.title,
                    author: values.author,
                    image_path: imageData.path,
                    song_path: songData.path
                });

                if (supabaseError) {
                    setIsLoading(false);
                    return toast.error(supabaseError.message);
                }

                router.refresh();
                setIsLoading(false);
                toast.success('Sweet! Your song is now in the mix.');
                reset();
                uploadModal.onClose();
        } catch (error) {
            toast.error("Oops! Something didn’t work. Check your connection.")
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Modal
            title="Add a Song to Playlist(s)"
            description="Upload an MP3 audio file for the song."
            isOpen={uploadModal.isOpen}
            onChange={onChange}

        >
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-y-4"
            >
                <Input 
                    id="title"
                    disabled={isLoading}
                    {...register('title', { required: true })}
                    placeholder="Song Name"
                />
                <Input 
                    id="author"
                    disabled={isLoading}
                    {...register('author', { required: true })}
                    placeholder="Artist Name"
                />
                <div>
                    <div className="pb-1">
                        Pick a song file
                    </div>
                    <Input 
                        id="song"
                        type="file"
                        disabled={isLoading}
                        accept=".m4a, .flac, .mp3, .wav, .wma, .aac"
                        {...register('song', { required: true })}
                    />
                </div>
                <div>
                    <div className="pb-1">
                        Select a picture
                    </div>
                    <Input 
                        id="image"
                        type="file"
                        disabled={isLoading}
                        accept="image/*"
                        {...register('image', { required: true })}
                    />
                </div>
                <Button className="hover:opacity-75" disabled={isLoading} type="submit">
                    {isLoading ? 'Composing…' : 'Compose your music'}
                </Button>
            </form>
        </Modal>
    );
}

export default UploadModal;