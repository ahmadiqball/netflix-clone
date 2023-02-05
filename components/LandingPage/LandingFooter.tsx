const footerList = [
  "FAQ",
  "Help Center",
  "Account",
  "Media Center",
  "Investor Relations",
  "Jobs",
  "Redeem Gift Cards",
  "Buy Gift Cards",
  "Ways to Watch",
  "terms of Use",
  "Privacy",
  "Cookie Performance",
  "Corporate information",
  "Contact Us",
  "Speed test",
  "Legal Notices",
  "Only on Netflix",
];

export default function LandingFooter() {
  return (
    <div className="py-[50px] px-[5%] text-[#737373] bg-black sm:py-[70px] sm:px-[45px]">
      <div className="w-[90%] max-w-[900px] min-w-[190px] mx-auto">
        <p className="mb-[30px] text-[1em]">
          Questions? Call{" "}
          <span className="hover:cursor-pointer hover:underline">
            007-803-321-2130
          </span>
        </p>
        <div className="text-[13px] w-full">
          {footerList.map((item) => (
            <p
              key={item}
              className="w-1/2 pr-3 mb-4 inline-block sm:w-1/3 md:w-1/4 "
            >
              <span className="hover:cursor-pointer hover:underline">{item}</span>
            </p>
          ))}
        </div>

        <p className="text-[13px]">Netflix Indonesia</p>
      </div>
    </div>
  );
}
