"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { FieldAuth } from "@/ui/field/FieldAuth";
import { Button } from "@/ui/button/Button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { chatsApi } from "@/lib/chatsApi";
import type { IUser, RegisterParams } from "@/$api";
import { useContextChat } from "../../../hooks";

interface IAuthForm {
  password: string;
  email: string;
  fullName?: string;
}

interface AuthProps {
  type: "Register" | "Login";
}

function Auth({ type }: AuthProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAuthForm>({
    mode: "onBlur",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useContextChat()

  const onSubmit = async (data: IAuthForm) => {
    setIsLoading(true);

    try {
      let user: IUser;
      if (type === "Login") {
        const { data: response } = await chatsApi.loginUser(data);
        user = response;
      } else {
        const { data: response } = await chatsApi.registerUser(
          data as RegisterParams
        );
        user = response;
      }

      // if (user.error) {
      //   toast(user.error);
      //   console.log(user.error);
      //   return;
      // }
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      router.push("/");
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
  };

  return (
    <div className="flex w-screen h-screen">
      <div className="m-auto block w-96 p-2">
        <h2 className="text-center mb-6">{type}</h2>
        <form onSubmit={handleSubmit(onSubmit)} action="">
          <FieldAuth
            error={errors.email}
            nameInput={"email"}
            placeholder={"E-mail"}
            {...register("email", {
              required: "required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Not valid email!",
              },
            })}
          />
          <FieldAuth
            error={errors.password}
            nameInput={"password"}
            placeholder={"Password"}
            {...register("password", {
              required: "required",
              minLength: {
                value: 5,
                message: "Min length 5 symbols!",
              },
            })}
          />
          {type === "Register" && (
            <FieldAuth
              error={errors.fullName}
              nameInput={"fullName"}
              placeholder={"Full Name"}
              {...register("fullName", {
                required: "required",
                minLength: {
                  value: 3,
                  message: "Min length 3 symbols!",
                },
              })}
            />
          )}
          <div className="text-center">
            <Button isLoading={isLoading} disabled={isLoading}>
              Sign In
            </Button>
          </div>
        </form>
        {type === "Register" ? (
          <Link href={"/login"}>
            <p className="pl-2">Login?</p>
          </Link>
        ) : (
          <Link href={"/register"}>
            <p className="pl-2">Registration?</p>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Auth;
