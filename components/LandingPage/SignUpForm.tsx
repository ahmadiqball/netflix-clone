import { authState } from "@/atoms/modalAtoms";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRecoilState } from "recoil";

interface Inputs {
  email: string;
}

export default function SignUpForm() {
  const [auth, setAuth] = useRecoilState(authState);
  const [emailFill, setEmailFill] = useState(auth.email !== '')
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = ({ email }) => {
    router.push("/signup/regristation");
    setAuth({ email: email, password: "" });
  };

  const changeHandler = (event: FormEvent) => {
    event.preventDefault()
    const emailValue = getValues('email')

    if (emailValue === '') {
      setEmailFill(false)
    } else {
      setEmailFill(true)
    }
  }

  return (
    <form
      className="my-3 lg:flex lg:item-center lg:justify-center lg:my-0"
      onSubmit={handleSubmit(onSubmit)}
      onChange={changeHandler}
    >
      <div className="relative bg-white mb-3 sm:w-[500px] mx-auto lg:w-[450px] lg:mx-0 rounded lg:mb-0">
        <input
          type="email"
          id="email"
          className="peer pt-2.5 px-2.5 w-full border border-[#8c8c8c] text-lg sm:text-[1.25rem] text-black h-12 md:h-[60px] xl:h-[70px] rounded focus:outline-none"
          {...register("email", { required: true })}
        />
        <label
          htmlFor="email"
          className={`absolute text-[#8c8c8c] left-2.5 -translate-y-1/2 peer-focus:text-xs peer-focus:top-3 ${emailFill ? "text-xs top-3 md:top-4 md:text-xs" : "text-sm top-1/2"} transition-all ease-linear md:text-base md:peer-focus:top-4`}
        >
          Email address
        </label>
      </div>

      <button
        type="submit"
        className="my-1 mx-auto py-[0.35rem] text-base px-4 rounded bg-[#e50914] flex items-center justify-center gap-2 h-10 lg:mx-0 lg:text-[1.625rem] lg:h-[60px] xl:h-[70px] lg:my-0 lg:px-[26px]"
      >
        Get started <ChevronRightIcon className="h-3 lg:h-5" />
      </button>
    </form>
  );
}
