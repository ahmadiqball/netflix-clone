import Image from "next/image"
import Link from "next/link"

interface Props {
    route: string
    label: string
}

export default function SignUpHeader({ route, label }: Props) {
    return(
        <header className="relative flex justify-between items-center border-b border-[#e6e6e6] bg-white h-[45px] sm:h-[75px] md:h-[90px]">
          <Image
            src="https://shrtco.de/I8XtQq"
            className="cursor-pointer h-5 w-[75px] ml-[3%] sm:h-[45px] sm:w-[167px]"
            width={150}
            height={150}
            alt="netflix"
          />

          <Link
            href={route}
            className="text-[#333333] mx-2.5 text-sm font-medium sm:text-base sm:mx-[3%] md:text-[19px]"
          >
            {label}
          </Link>
        </header>
    )
}