import FAQ from "@/components/LandingPage/FAQ";
import LandingFooter from "@/components/LandingPage/LandingFooter";
import LandingHeader from "@/components/LandingPage/LandingHeader";
import LandingPanel from "@/components/LandingPage/LandingPanel";
import Head from "next/head";

export default function LandingPage() {

  return (
    <div className="bg-[#222222]">
      <Head>
        <title>Netflix - Watch TV Shows Online, Watch Movies Online</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="space-y-2">
        <LandingHeader />
        <section className="relative space-y-2">
          <LandingPanel
            head="Enjoy on your TV."
            desc="Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more."
            image="https://shrtco.de/nNgSdI"
            video="https://shrtco.de/tAxDMW"
            videoSize="h-[54%] w-[73%] top-[46%]"
            margin="-mt-[10%] lg:-mr-[5%] lg:-mb-[5%]"
          />
           <LandingPanel
            head="Download your shows to watch offline."
            desc="Save your favorite easily and always have something to watch."
            image="https://shrtco.de/M5KXKc"
            video=""
            second
            margin="-mt-[8%]"
            rev
          />
          <LandingPanel
            head="Watch everywhere."
            desc="Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV."
            image="https://shrtco.de/Divvp"
            video="https://shrtco.de/ZZMNvT"
            videoSize="h-[47%] w-[63%] top-[34%]"
            margin="-mt-[5%]"
          />
          <LandingPanel
            head="Create profiles for kids."
            desc="Send kids on adventures with their favorite characters in a space made just for them—free with your membership."
            image="https://shrtco.de/8wQVwh"
            video=""
            rev
          />
        </section>

        <FAQ />
        <LandingFooter />
      </main>
    </div>
  );
}
