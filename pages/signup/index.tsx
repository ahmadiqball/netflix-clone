import SignUpFooter from "@/components/SignUp/SignUpFooter";
import SignUpHeader from "@/components/SignUp/SignUpHeader";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { CheckIcon } from "@heroicons/react/24/solid";
import Head from "next/head";
import { useRouter } from "next/router";

const renderList = [
  "No commitments, cancel anytime.",
  "Everything on Netflix for one low price.",
  "No ads and no extra fees. Ever.",
];

export default function SignUp() {
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>Netflix</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-white text-black">
        <SignUpHeader route="/id-en" label="Sign Out" />

        <div className="pb-[95px] text-[#333]">
          <div className="pt-5 px-8 pb-[60px] max-w-[340px] box-content mx-auto">
            <CheckCircleIcon className="h-[60px] w-[60px] mb-5 text-[#e50914] mt-[30%] sm:mx-auto" />
            <p className="text-[13px] mt-5 sm:text-center">STEP 2 OF 3</p>
            <h1 className="text-[32px] font-medium leading-[1.25] mb-[0.4em] sm:text-center">
              Choose your plan.
            </h1>
            <ul className="mt-[15px] mb-4 font-light w-[300px] h-[193px] flex flex-col justify-evenly">
              {renderList.map((item) => (
                <li key={item} className="flex">
                  <CheckIcon className="h-[26px] w-[26px] min-w-[26px] text-[#e50914]" />
                  <p className="ml-2.5 text-left shrink text-[18px]">{item}</p>
                </li>
              ))}
            </ul>
            <button
              onClick={() => router.push("/signup/planform")}
              className="mt-6 w-full py-[20.5px] px-[2em] text-2xl leading-[1] bg-[#e50914] text-white rounded hover:cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>

        <SignUpFooter />
      </main>
    </div>
  );
}