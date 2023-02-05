import Image from "next/image";
import { useEffect, useState } from "react";
import Computer from "@/public/assets/icons/computer.svg";
import PlanIcons from "./PlanIcons";

const paramOptions = [
  { label: "Monthly price", param: "price" },
  { label: "Video quality", param: "quality" },
  { label: "Resolution", param: "resolution" },
  { label: "Devices you can use to watch", param: "devices" },
];

interface Plans {
  type: string;
  price: string;
  quality: string;
  resolution: string;
  devices: string[];
}

const planOptions: Plans[] = [
  {
    type: "mobile",
    price: "IDR54,000",
    quality: "good",
    resolution: "480p",
    devices: ["phone", "tablet"],
  },
  {
    type: "basic",
    price: "IDR120,000",
    quality: "good",
    resolution: "720p",
    devices: ["phone", "tablet", "computer", "TV"],
  },
  {
    type: "standard",
    price: "IDR153,000",
    quality: "better",
    resolution: "1080p",
    devices: ["phone", "tablet", "computer", "TV"],
  },
  {
    type: "premium",
    price: "IDR186,000",
    quality: "best",
    resolution: "4K+HDR",
    devices: ["phone", "tablet", "computer", "TV"],
  },
];

interface Props {
  choosenPlan: string;
  setChoosenPlan: (plan: string) => void
}

export default function PlanOptions({ choosenPlan, setChoosenPlan }: Props) {
  const [planFixed, setPlanFixed] = useState(false);

  useEffect(() => {
    if (
      document.getElementById("plan-option") &&
      document.getElementById("plan-el")
    ) {
      const planPos = document.getElementById("plan-option")!.getBoundingClientRect();
      const element = document.getElementById("plan-el")!.getBoundingClientRect();
      const handleScroll = () => {
        if (window.scrollY > planPos.y && window.scrollY < element.bottom - planPos.height) {
          setPlanFixed(true);
        } else {
          setPlanFixed(false);
        }
      };

      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  return (
    <div className={`${planFixed && "pt-[91px] sm:pt-[114px]"}`} id="plan-el">
      <div className={`w-full bg-white flex flex-end max-w-[978px] mx-auto ${
          planFixed ? "fixed top-0 right-0 px-4 md:left-1/2 md:-translate-x-1/2" : ""
        }`}>
      <div
        id="plan-option"
        className={`flex w-full ml-auto text-white bg-white capitalize text-xs font-medium sm:text-base sm:w-[65%] `}
      >
        {planOptions.map((plan) => (
          <div
            key={plan.type}
            className={`relative w-1/4 mx-1 my-2 h-[75px] bg-[#e50914] rounded-sm sm:my-3 sm:h-[90px] sm:w-[90px] sm:mx-auto lg:h-[120px] lg:w-[120px] ${
              choosenPlan !== plan.type && "opacity-60"
            } flex items-center justify-center`}
            onClick={() => setChoosenPlan(plan.type)}
          >
            {plan.type}
            <span
              className={`border-transparent border-t-[#e50914] border-x-[15px] border-t-[15px] sm:border-x-[10px] sm:border-t-[10px] absolute left-1/2 top-full -translate-x-1/2 -translate-y-[1px] ${
                choosenPlan !== plan.type && "hidden"
              }`}
            />
          </div>
        ))}
      </div></div>

      <div className=" text-[13px] text-[#333] ">
        <div className="divide-y divide-[#ccc] w-full pb-2.5">
          {paramOptions.map((param, index) => (
            <div key={param.label} className={`flex ${index === 3 ? "items-start" : "items-center"}  flex-wrap w-full sm:min-h-[60px]`}>
              <div className="w-full pt-4 px-2 pb-1 text-center min-h-[37px] font-light sm:w-[35%] sm:text-left sm:text-base sm:py-3 sm:px-4">
                {param.label}
              </div>
              {param.param !== "devices" &&
                planOptions.map((plan) => (
                  <div
                    key={plan.type}
                    className={`${
                      choosenPlan === plan.type
                        ? "text-[#e50914]"
                        : "text-[#737373]"
                    } text-xs w-1/4 p-2 text-center capitalize min-h-[37px] sm:w-[16.25%] sm:py-3 sm:px-4 sm:text-sm lg:text-base lg:font-medium`}
                  >
                    {plan[param.param as keyof Plans]}
                  </div>
                ))}
              {param.param === "devices" &&
                planOptions.map((plan) => (
                  <div
                    key={plan.type}
                    className={`${
                      choosenPlan === plan.type
                        ? "text-[#e50914]"
                        : "text-[#737373]"
                    } w-1/4 text-xs text-center capitalize px-2 pb-1.5 pt-[2px] sm:w-[16.25%] sm:pt-2 sm:pb-3 sm:px-4`}
                  >
                    {plan.devices.map((device) => (
                      <div key={device} className="">
                        <PlanIcons
                          icon={device}
                          className="h-[26px] w-[26px] mx-auto mt-1.5 mb-[2px]"
                        />
                        <p className="pb-1.5">{device}</p>
                      </div>
                    ))}
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>

      <div className="text-[13px] text-[#737373]">
        <p className="px-4 sm:pr-[160px]">
          HD (720p), Full HD (1080p), Uldiva HD (4K) and HDR availability subject
          to your internet service and device capabilities. Not all content is
          available in all resolutions. See our{" "}
          <span className="text-[#0071eb] hover:underline hover:cursor-pointer">
            Terms of use
          </span>{" "}
          for more details.
        </p>
        <p className="px-4 mt-2.5 sm:pr-[160px]">
          Only people who live with you may use your account. Watch on 4
          different devices at the same time with Premium, 2 with Standard, and
          1 with Basic and Mobile.
        </p>
      </div>
    </div>
  );
}
