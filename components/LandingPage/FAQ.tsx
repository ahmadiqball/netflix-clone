import { PlusIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import SignUpForm from "./SignUpForm";

const questions = [
  {
    id: 1,
    question: "What is Netflix?",
    answer: [
      "Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.",
      "You can watch as much as you want, whenever you want without a single commercial – all for one low monthly price. There's always something new to discover and new TV shows and movies are added every week!",
    ],
  },
  {
    id: 2,
    question: "How much does Netflix cost?",
    answer: [
      "Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from IDR54,000 to IDR186,000 a month. No extra costs, no contracts.",
    ],
  },
  {
    id: 3,
    question: "Where can I watch?",
    answer: [
      "Watch anywhere, anytime. Sign in with your Netflix account to watch instantly on the web at netflix.com from your personal computer or on any internet-connected device that offers the Netflix app, including smart TVs, smartphones, tablets, streaming media players and game consoles.",
      "You can also download your favorite shows with the iOS, Android, or Windows 10 app. Use downloads to watch while you're on the go and without an internet connection. Take Netflix with you anywhere.",
    ],
  },
  {
    id: 4,
    question: "How do I cancel?",
    answer: [
      "Netflix is flexible. There are no pesky contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees – start or stop your account anytime.",
    ],
  },
  {
    id: 5,
    question: "What can I watch on Netflix?",
    answer: [
      "Netflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Netflix originals, and more. Watch as much as you want, anytime you want.",
    ],
  },
  {
    id: 6,
    question: "Is Netflix good for kids?",
    answer: [
      "The Netflix Kids experience is included in your membership to give parents control while kids enjoy family-friendly TV shows and movies in their own space.",
      "Kids profiles come with PIN-protected parental controls that let you restrict the maturity rating of content kids can watch and block specific titles you don’t want kids to see.",
    ],
  },
];

export default function FAQ() {
  const [active, setActive] = useState(0);

  const changeActive = (index: number) => {
    if (active === index) {
      setActive(0);
    } else {
      setActive(index);
    }
  };

  return (
    <div className="bg-black py-[50px] sm:px-[45px]">
      <h1 className="text-center px-[5%] text-[1.625rem] mb-2 sm:text-[2.5rem] sm:px-0 font-medium lg:text-[3.125rem]">
        Frequently Asked Questions
      </h1>
      <div className="text-lg space-y-2 my-[1.25em] mx-auto max-w-[815px] sm:w-[90%] lg:w-3/4 lg:text-[1.625rem] transition-all">
        {questions.map((item) => (
          <div key={item.id} className="space-y-[1px]">
            <div
              className="flex justify-between py-[0.8em] px-[1.2em] bg-[#303030] items-center"
              onClick={() => changeActive(item.id)}
            >
              <p className="">{item.question}</p>
              <XMarkIcon
                className={`h-6 w-6 transition-all lg:h-9 lg:w-9 ${
                  active !== item.id && "rotate-45"
                } `}
              />
            </div>
            <div
              className={`p-[1.2em] bg-[#303030] transition-all ease-in ${
                active !== item.id ? "hidden" : "scale-100"
              }`}
            >
              {item.answer[0]}{" "}
              {item.answer.length === 2 ? (
                <>
                  <br />
                  <br />
                  {item.answer[1]}
                </>
              ) : null}
            </div>
          </div>
        ))}
      </div>

      <div className="px-[5%]">
        <p className="px-[5%] text-center text-lg max-w-[450px] leading-6 md:leading-7 mx-auto md:text-[23px] box-content lg:max-w-none lg:pb-5 lg:pt-[0.85rem] lg:text-xl">
          Ready to watch? Enter your email to create or restart your membership.
        </p>
        <SignUpForm />
      </div>
    </div>
  );
}
