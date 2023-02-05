import useAuth from "@/hooks/useAuth";
import { MagnifyingGlassIcon, BellIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const navLink = [
  { nav: "Home", route: "/" },
  { nav: "Tv Shows", route: "" },
  { nav: "Movie", route: "" },
  { nav: "New & Popular", route: "" },
  { nav: "My List", route: "/my-list" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`${isScrolled ? "bg-[#141414]" : null}`}>
      <div className="flex items-center space-x-2 md:space-x-10">
        <Image
          src="https://shrtco.de/I8XtQq"
          width={100}
          height={100}
          className="cursor-pointer object-contain h-5 w-[75px] sm:h-[45px] sm:w-[167px]"
          alt="netflix"
        />

        <ul className="hidden space-x-4 md:flex">
          {navLink.map((item) => (
            <li
              onClick={() => {
                router.push(item.route);
              }}
              key={item.nav}
              className="cursor-pointer text-sm font-light text-[#e5e5e5] transition duration-[.4s] hover:text-[#b3b3b3]"
            >
              {item.nav}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center space-x-4">
        <MagnifyingGlassIcon className="w-6 h-6 hidden md:inline" />
        <BellIcon className="h-6 w-6" />
        <Link href="/account">
          <Image
            src="https://rb.gy/g1pwyx"
            alt="profile"
            className="cursor-pointer rounded h-6 w-6"
            width={100}
            height={100}
          />
        </Link>
      </div>
    </header>
  );
}
