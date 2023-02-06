import { modalState, movieState } from "@/atoms/modalAtoms";
import {
  CheckIcon,
  PlusIcon,
  SpeakerWaveIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { useRecoilState, useRecoilValue } from "recoil";
import MuiModal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import { Element, Genre } from "@/typings";
import ReactPlayer from "react-player/lazy";
import { FaPlay } from "react-icons/fa";
import { HandThumbUpIcon, SpeakerXMarkIcon } from "@heroicons/react/24/outline";
import { TailSpin } from "react-loader-spinner";
import useAuth from "@/hooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/router";

interface Show {
  id: string;
  media: string;
}

export default function HomeModal() {
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [movie, setMovie] = useRecoilState(movieState);
  const { addUserMovie, userData } = useAuth();
  const [addMovie, setAddMovie] = useState("add");
  const [trailer, setTrailer] = useState("");
  const [genre, setGenre] = useState<Genre[]>([]);
  const [muted, setMuted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!movie) return;

    const fetchMovie = async () => {
      const data = await fetch(
        `https://api.themoviedb.org/3/${
          movie?.media_type === "tv" ? "tv" : "movie"
        }/${movie?.id}?api_key=${
          process.env.NEXT_PUBLIC_API_KEY
        }&language=en-US&append_to_response=videos`
      ).then((response) => response.json());

      if (data?.videos) {
        const index = data.videos.results.findIndex(
          (element: Element) => element.type === "Trailer"
        );
        setTrailer(data.videos?.results[index]?.key);
      }

      if (data?.genres) {
        setGenre(data.genres);
      }

      if (userData!.personalShows.some((item: Show) => item.id === movie!.id)) {
        setAddMovie("added");
      }
    };

    fetchMovie();
  }, [movie, userData]);

  const addMovieHandler = async () => {
    setAddMovie("fetch");
    if (addMovie === "add") {
      await addUserMovie(movie!.id, movie!.media_type, "add")
        .then(() => setAddMovie("added"))
        .catch(() => setAddMovie("add"));
    } else if (addMovie === "added") {
      await addUserMovie(movie!.id, movie!.media_type, "remove")
        .then(() => setAddMovie("add"))
        .catch(() => setAddMovie("added"));
    }
  };

  const playHandler = () => {
    setShowModal(false)
    const nameTitle = movie?.name || movie?.title
    router.push(`/${nameTitle?.split(' ').join('-').toLowerCase()}?media=${movie?.media_type === "tv" ? "tv" : "movie"}&id=${movie?.id}`);
  };

  return (
    <MuiModal
      open={showModal}
      onClose={() => setShowModal(false)}
      className="fixed !top-7 pb-7 px-5 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide"
    >
      <>
        <button
          onClick={() => setShowModal(false)}
          className="absolute right-5 top-5 !z-40 border-none hover:bg-[#181818] modalButton"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>

        <div className="relative pt-[56.25%] bg-black">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailer}`}
            width="100%"
            height="100%"
            style={{ position: "absolute", top: "0", left: "0" }}
            playing
            muted={muted}
          />

          <div className="absolute bottom-10 flex w-full items-center justify-between px-10">
            <div className="flex space-x-2">
              <button onClick={playHandler} className="flex items-center gap-x-2 rounded bg-white px-8 text-xl font-bold text-black transition hover:bg-[#e6e6e6]">
                <FaPlay className="h-7 w-7 text-black" /> Play
              </button>

              <button className="modalButton" onClick={addMovieHandler}>
                {addMovie === "add" && <PlusIcon className="h-7 w-7" />}
                {addMovie === "fetch" && (
                  <TailSpin
                    height="24"
                    width="24"
                    color="#fff"
                    ariaLabel="tail-spin-loading"
                    radius="1"
                    visible={true}
                  />
                )}
                {addMovie === "added" && <CheckIcon className="h-7 w-7" />}
              </button>
              <button className="modalButton ">
                <HandThumbUpIcon className="h-7 w-7" />
              </button>
            </div>

            <button onClick={() => setMuted(!muted)} className="modalButton">
              {muted ? (
                <SpeakerXMarkIcon className="h-6 w-6" />
              ) : (
                <SpeakerWaveIcon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        <div className="flex space-x-16 rounded-b-md bg-[#181818] px-10 py-8">
          <div className="space-y-6 text-lg">
            <div className="flex items-center space-x-2 text-xs">
              <p className="font-semibold text-green-400 ">
                {Math.floor(movie!.vote_average * 10)}% Match
              </p>
              <p className="font-light ">
                {movie?.release_date || movie?.first_air_date}
              </p>
              <div className="flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-xs">
                HD
              </div>
            </div>

            <div className="flex flex-col gap-x-10 gap-y-4 font-light md:flex-row">
              <p className="w-5/6">{movie?.overview}</p>
              <div className="textflex flex-col space-y-3 text-sm">
                <div>
                  <span className="text-[gray]">Genres: </span>
                  {genre.map((item) => item.name).join(", ")}
                </div>

                <div>
                  <span className="text-[gray]">Original language: </span>
                  {movie?.original_language}
                </div>

                <div>
                  <span className="text-[gray]">Total votes: </span>
                  {movie?.vote_count}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </MuiModal>
  );
}
