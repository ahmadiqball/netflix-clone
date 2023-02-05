import { Movie } from "@/typings";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useRef, useState } from "react";
import Thumbnail from "./Thumbnail";

interface Props {
  title: String;
  movies: Movie[];
}

export default function Row({ title, movies }: Props) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [isScroll, setIsScroll] = useState(false);

  const scrollHandler = (direction: String) => {
    setIsScroll(true)

    if(rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current

      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;

      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' })
    }
  };

  return (
    <div className="h-40 space-y-0.5">
      <h2 className="w-56 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl">
        {title}
      </h2>
      <div className="group relative md:-ml-2">
        <ChevronLeftIcon
          className={`absolute top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 ${!isScroll && 'hidden'}`}
          onClick={() => scrollHandler("left")}
        />

        <div
          ref={rowRef}
          className="flex items-center space-x-0.5 overflow-x-scroll scrollbar-hide md:space-x-2.5 md:p-2"
        >
          {movies.map((item) => (
            <Thumbnail key={item.id} movie={item} />
          ))}
        </div>

        <ChevronRightIcon
          className="absolute top-0 bottom-0 right-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100"
          onClick={() => scrollHandler("right")}
        />
      </div>
    </div>
  );
}
