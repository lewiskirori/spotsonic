import { GrPlayFill } from "react-icons/gr";


const PlayButton = () => {
    return (
        <button
            className="                
                opacity-0
                rounded-full
                flex
                items-center
                bg-green-500
                p-4
                drop-shadow-md
                group-hover:opacity-100
                hover:transform hover:scale-110
                transition-transform duration-100 ease-in-out
            "
        >
            <GrPlayFill className="text-black" />
        </button>
    );
}

export default PlayButton;