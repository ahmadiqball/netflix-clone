import Image from "next/image";

interface Props {
  head: string;
  desc: string;
  image: string;
  video: string;
  videoSize?: string;
  second?: boolean;
  margin?: string;
  rev?: boolean;
}

export default function LandingPanel({
  head,
  desc,
  image,
  video,
  videoSize,
  second,
  margin,
  rev,
}: Props) {
  return (
    <div className="py-[50px] px-[5%] bg-black text-center sm:py-[70px] sm:px-[45px] ">
      <div
        className={`lg:flex lg:space-between lg:items-center ${
          rev && "lg:flex-row-reverse"
        }  lg:max-w-[1100px] lg:mx-auto`}
      >
        <div
          className={`lg:text-left lg:w-[52%] ${
            !rev ? "lg:pr-12" : "lg:pl-12"
          } lg:box-content`}
        >
          <h2 className="text-[1.625rem] relative z-20 font-medium mb-2 sm:text-[2.5rem] lg:text-[3.125rem] lg:mb-2 leading-[1.1]">
            {head}
          </h2>
          <p className="text-lg relative z-20 mt-[0.75em] mb-[0.25em] leading-6 sm:text-xl lg:text-[1.625rem] ">
            {desc}
          </p>
        </div>

        <div className="lg:w-[48%] ">
          <div
            className={`relative w-full max-w-[600px] lg:max-w-[100%] min-h-[100px] pt-1 h-full mx-auto   ${margin}`}
          >
            <Image
              src={image}
              className="object-contain w-full z-10 relative mt-[1em] lg:mt-0"
              alt="tv-player"
              width={1000}
              height={1000}
            />
            <div
              className={`${videoSize} absolute left-1/2 -translate-x-1/2 -translate-y-1/2`}
            >
              <video
                src={video}
                width="100%"
                height="100%"
                style={{ position: "absolute", top: "0", left: "0" }}
                autoPlay
                loop
                muted
              />
            </div>

            {second && (
              <div className="flex items-center box-content bg-black border-2 border-white/40 rounded-xl absolute bottom-[8%] z-10 left-1/2 -translate-x-1/2 w-[60%] min-w-[15em] px-[0.65em] py-[0.25em] shadow-[0_0_2em_0_#000] sm:px-[0.75em] sm:py-[0.35em]">
                <Image
                  src="https://shrtco.de/hoPVwX"
                  className="h-12 mr-[1em] sm:h-16"
                  alt="wrapper"
                  width={100}
                  height={100}
                />
                <div className="my-[0.3em] text-left grow">
                  <p className="text-white text-[0.9em] sm:text-[1em] font-medium">
                    Stranger Things
                  </p>
                  <p className="text-[#0071eb] text-[0.75em] sm:text-[0.9em]">
                    Downloading...
                  </p>
                </div>
                <Image
                  src="https://shrtco.de/PtVx3"
                  className="h-[3em] w-[3em]"
                  alt="stranger-things"
                  width={100}
                  height={100}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
