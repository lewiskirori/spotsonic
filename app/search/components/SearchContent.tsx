"use client";

import LikeButton from "@/components/LikeButton";
import MediaItem from "@/components/MediaItem";
import useOnPlay from "@/hooks/useOnPlay";
import { Song } from "@/types";

interface SearchContentProps {
    songs: Song[];
}

const SearchContent: React.FC<SearchContentProps> = ({
    songs
}) => {
    const onPlay = useOnPlay(songs);

    if (songs.length === 0) {
        return (
            <div
                className="
                    flex
                    flex-col
                    items-center
                    gap-y-2
                    w-full
                    px-6
                    text-neutral-400
                "
                style={{ paddingTop: '50px', marginTop: 'auto', marginBottom: 'auto' }}
            >
                <span style={{ fontSize: '1.4rem' }}>
                    Hmm… Couldn’t find a song match
                </span>
                <br />
                <span style={{ fontSize: '0.9rem' }}>
                    Try a different spelling or keyword, or you could please refresh.
                </span>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-y-2 w-full px-6">
            {songs.map((song) => (
                <div 
                    key={song.id}
                    className="flex items-center gap-x-4 w-full"
                >
                    <div className="flex-1">
                        <MediaItem 
                            onClick={(id: string) => onPlay(id)}
                            data={song}
                        />
                    </div>
                    <LikeButton songId={song.id} />
                </div>
            ))}
        </div>
    );
}

export default SearchContent;