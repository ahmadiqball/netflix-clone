import Image from "next/image";
import Link from "next/link";
import SignUpForm from "./SignUpForm";

export default function LandingHeader() {
  return (
    <div className="relative z-10">
      <Image
        src="https://shrtco.de/twtoFU"
        className="-z-10 opacity-60 !inline object-cover "
        alt="background-image"
        fill
      />

      <div
        style={{
          background:
            "linear-gradient(0deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 15%, rgba(0,0,0,0) 40%, rgba(0,0,0,0) 75%,rgba(0,0,0,0.5) 85%, rgba(0,0,0,0.9) 100%)",
        }}
      >
        <div className="pt-7 mx-[5%] flex justify-between items-center sm:mx-11 lg:mx-[3.5rem]">
          <Image
            src="https://shrtco.de/I8XtQq"
            className="cursor-pointer object-contain md:left-10 md:top-6 h-6 sm:h-8 lg:h-10 xl:h-12"
            alt="netflix"
            width={100}
            height={100}
          />

          <Link
            href="/login"
            className="text-[0.9rem] sm:text-base py-1 px-2 bg-[#e50914] rounded text-white sm:py-[7px] sm:px-[17px]"
          >
            Sign In
          </Link>
        </div>

        <div className="py-[65px] px-[5%] text-center max-w-[950px] mx-auto sm:px-11 sm:py-[145px] sm:max-w-[950px] box-content">
          <h1 className="text-[1.75rem] leading-[1.1] font-medium sm:text-[3.125rem] max-w-[640px] mx-auto xl:text-[4rem]">
            Unlimited movies, TV shows, and more.
          </h1>
          <p className="text-lg my-4 sm:text-[1.625rem]">
            Watch anywhere. Cancel anytime.
          </p>
          <p className="px-[5%] text-lg max-w-[450px] leading-6 sm:px-[10%] mx-auto md:text-[23px] box-content lg:max-w-none lg:pb-5 lg:pt-[0.85rem] lg:text-[1.2rem]">
            Ready to watch? Enter your email to create or restart your
            membership.
          </p>
          <SignUpForm />
        </div>
      </div>
    </div>
  );
}
