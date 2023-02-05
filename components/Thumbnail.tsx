import { modalState, movieState } from "@/atoms/modalAtoms";
import { Movie } from "@/typings";
import Image from "next/image";
import { useRecoilState } from "recoil";

interface Props {
  movie: Movie;
}

export default function Thumbnail({ movie }: Props) {
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [modalMovie, setModalMovie] = useRecoilState(movieState);

  return (
    <div
      onClick={() => {
        setShowModal(true);
        setModalMovie(movie)
      }}
      className="relative h-28 min-w-[180px] transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105"
    >
      <Image
        src={`https://image.tmdb.org/t/p/w500${
          movie.backdrop_path || movie.poster_path
        }`}
        className="rounded-sm object-cover nd:rounded"
        fill
        sizes="300px"
        alt="movie-thumb"
      />
      
    </div>
  );
}
