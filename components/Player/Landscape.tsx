import { useRouter } from "next/router";
import { useFullScreenHandle } from "react-full-screen";
import ReactPlayer from "react-player";
import { useState, useEffect } from "react";
import {
  MdCast,
  MdOutlineForward10,
  MdPause,
  MdPlayArrow,
  MdReplay10,
  MdSubtitles,
} from "react-icons/md";
import { BsArrowLeft, BsFiles } from "react-icons/bs";
import { AiFillStepForward } from "react-icons/ai";

interface Props {
  movie: string;
  displayedName: string;
  fsIn: () => void;
}

export default function PlayerLandscape({ movie, displayedName, fsIn }: Props) {
  const router = useRouter();
  let mediaRef: ReactPlayer | null = null;
  const fsHandle = useFullScreenHandle();
  const [progess, setProgress] = useState("0%");
  const [duration, setDuration] = useState("");
  const [playing, setPlaying] = useState(true);
  const [controlDisp, setControlDisp] = useState(false);

  useEffect(() => {
    fsIn();
  });

  const forwardTen = () => {
    const currTime = mediaRef!.getCurrentTime();
    mediaRef?.seekTo(currTime + 10, "seconds");
  };

  const backwardTen = () => {
    const currTime = mediaRef!.getCurrentTime();
    mediaRef?.seekTo(currTime - 10, "seconds");
  };

  const getProgress = (progress: any) => {
    setProgress(`${progress.played * 100}%`);
  };

  const getDuration = (time: number) => {
    const hour = Math.floor(time / 3600);
    const min = Math.floor((time % 3600) / 60);
    const sec = Math.round((time % 3600) % 60);
    const dur = hour === 0 ? min + ":" + sec : hour + ":" + min + ":" + sec;
    setDuration(dur);
  };

  let timeout: any;
  const handleControl = () => {
    if (playing) {
      setControlDisp(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => setControlDisp(false), 1500);
      return () => clearTimeout(timeout);
    }
  };

  return (
    <div onClick={handleControl} className="min-w-screen min-h-screen relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vh] h-[100vw] rotate-90 -z-10">
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${movie}`}
          width="100%"
          height="100%"
          playing={playing}
          muted={false}
          ref={(p) => (mediaRef = p)}
          onDuration={(time) => getDuration(time)}
          onProgress={(progress) => getProgress(progress)}
          onReady={fsIn}
        />
      </div>

      <div
        className={`${
          playing ? !controlDisp && "opacity-0" : ""
        } transition-all w-screen h-screen z-20 bg-black/40 relative flex items-center justify-center text-white`}
      >
        <div className="min-w-[100vh] flex justify-evenly items-center rotate-90">
          <MdReplay10
            className="h-20 w-20 cursor-pointer"
            onClick={backwardTen}
          />
          <div onClick={() => setPlaying(!playing)} className="cursor-pointer">
            {playing && <MdPause className="h-24 w-24 text-white" />}
            {!playing && <MdPlayArrow className="h-24 w-24" />}
          </div>
          <MdOutlineForward10
            className="h-20 w-20 cursor-pointer"
            onClick={forwardTen}
          />
        </div>

        <div className="absolute top-1/2 left-[calc(100%-32px)] -translate-x-1/2 -translate-y-1/2 w-[100vh] flex justify-between items-center px-8 rotate-90">
          <BsArrowLeft
            className={`h-7 w-7 cursor-pointer trasnition-all ${
              !controlDisp && fsHandle.active && "opacity-0"
            }`}
            onClick={() => router.push("/")}
          />
          <p>{displayedName}</p>
          <MdCast className="h-7 w-7" />
        </div>

        <div className="absolute w-[100vh] left-0 top-1/2 -translate-x-[calc(50%-44px)] -translate-y-1/2 rotate-90">
          <div className="flex gap-7 items-center px-8">
            <div className="w-full h-1 bg-gray-300/40">
              <div
                className={`h-full bg-[#e50914] ${progess}`}
                style={{ width: `${progess}` }}
              />
            </div>
            <p className="text-sm font-thin">{duration}</p>
          </div>

          <div className="flex gap-8 justify-center items-center py-5">
            <div className="flex items-center gap-2">
              <BsFiles className="h-7 w-7 cursor-pointer -rotate-90" />
              <p>Episodes</p>
            </div>
            <div className="flex items-center gap-2">
              <MdSubtitles className="h-7 w-7 cursor-pointer" />
              <p>Audio & Subtitles</p>
            </div>
            <div className="flex items-center gap-2">
              <AiFillStepForward className="h-7 w-7 cursor-pointer" />
              <p>Next Episode</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
