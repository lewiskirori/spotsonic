"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import ListItem from "@/components/ListItem";

export default function Home() {
  const [greetings, setGreeting] = useState('');

  useEffect(() => {
    const currentTime = new Date().getHours();

    if (currentTime >= 0 && currentTime < 12) {
      setGreeting('Good morning');
    } else if (currentTime >= 12 && currentTime < 16) {
      setGreeting('Good afternoon');
    } else if (currentTime >= 16 && currentTime < 21) {
      setGreeting('Good evening');
    } else {
      setGreeting('Zzzzzzz');
    }
  }, []);

  return (
    <div className="
      bg-neutral-900
      rounded-lg
      h-full
      w-full
      overflow-hidden
      overflow-y-auto
    ">
      <Header>
        <div className="mb-2">
          <h1
            className="
              text-white
              text-3xl
              font-semibold
            "
          >
            {greetings}
          </h1>
          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              xl:grid-cols-3
              2xl:grid-cols-4
              gap-3
              mt-4
            "
          >
            <ListItem 
              image="/images/liked.png"
              name="Liked Songs (Favorites)"
              href="liked"
            />
          </div>
        </div>
      </Header>
      <div className="mt-2 mb-7 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-2xl font-semibold">
            Today’s freshest hits
          </h1>
        </div>
        <div>
          List of Songs!!
        </div>
      </div>
    </div>
  )
}
 