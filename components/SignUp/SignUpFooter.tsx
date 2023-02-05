const footerList = [
  "FAQ",
  "Help Center",
  "Netflix Shop",
  "Terms of Use",
  "Privacy",
  "Cookie Preferences",
  "Corporate Information ",
];

export default function SignUpFooter() {
  return (
    <footer className="text-[#737373] text-[1em] pb-5 bg-[#f3f3f3] border-t border-[#e6e6e6] fon-light">
      <div className="w-[90%] mx-auto pt-[30px]">
        <p className="mb-[30px]">
          Questions? Call{" "}
          <span className="hover:underline hover:cursor-pointer">
            007-803-321-2130
          </span>
        </p>
        <div className="text-[13px] max-w-[1000px]">
          {footerList.map((item) => (
            <p key={item} className="inline-block w-1/2 mb-4 pr-3 hover:cursor-pointer hover:underline sm:w-1/3 md:w-1/4">
              {item}
            </p>
          ))}
        </div>
      </div>
    </footer>
  );
}
