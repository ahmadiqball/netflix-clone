import { modalState, movieState } from "@/atoms/modalAtoms";
import { Movie } from "@/typings";
import { InformationCircleIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { useRecoilState } from "recoil";

interface Props {
  netflixOriginals: Movie[];
}

export const baseUrl = "https://image.tmdb.org/t/p/original/";

export default function Banner({ netflixOriginals }: Props) {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [modalMovie, setModalMovie] = useRecoilState(movieState);
  const router = useRouter()

  useEffect(() => {
    setMovie(
      netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]
    );
  }, [netflixOriginals]);

  const playHandler = () => {
    const nameTitle = movie?.name || movie?.title
    router.push(`/${nameTitle?.split(' ').join('-').toLowerCase()}?media=${movie?.media_type === "tv" ? "tv" : "movie"}&id=${movie?.id}`);
  };

  return (
    <div className="flex flex-col justify-end space-y-2 py-16 pb-8 sm:pb-16 h-[55vh] md:space-y-4 lg:h-[70vh] lg:justify-end lg:pb-12">
      <div className="absolute top-0 left-0 -z-10 h-[65vh] md:h-[95vh] w-screen">
        <Image
          src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
          alt="Netflix-Originals"
          fill
          priority
          style={{ objectFit: "cover" }}
        />
      </div>

      <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold lg:max-w-2xl">
        {movie?.title || movie?.name || movie?.original_name}
      </h1>
      <p className="max-w-xs text-xs text-shadow-md md:max-w-lg md:text-lg lg:max-w-[40%] lg:text-lg line-clamp-3">
        {movie?.overview}
      </p>

      <div className="flex space-x-3">
        <button className="bannerButton bg-white text-black" onClick={playHandler}>
          <FaPlay className="h-4 w-4 text-black md:h-7 md:2-7" />
          Play
        </button>
        <button
          className="bannerButton bg-[gray]/70"
          onClick={() => {
            setShowModal(true);
            setModalMovie(movie);
          }}
        >
          More Info <InformationCircleIcon className="h-5 w-5 md:h-8 md:w-8" />
        </button>
      </div>
    </div>
  );
}
