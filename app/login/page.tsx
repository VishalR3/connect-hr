"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useId } from "react";
import { useForm } from "react-hook-form";

export default function LoginPage() {
  const id = useId();
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const handleLogin = async (userData: any) => {
    const { data } = await authClient.signIn.email(
      {
        email: userData.email,
        password: userData.password,
      },
      {
        onError: (error) => {
          console.log("error", error);
        },
      }
    );

    if (data) {
      router.push("/");
    }
  };

  return (
    <div className="grid place-items-center h-4/5">
      <div>
        <div className="flex flex-col items-center gap-2">
          <div
            className="flex size-11 shrink-0 items-center justify-center rounded-full border"
            aria-hidden="true"
          >
            <svg
              className="stroke-zinc-800 dark:stroke-zinc-100"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 32 32"
              aria-hidden="true"
            >
              <circle cx="16" cy="16" r="12" fill="none" strokeWidth="8" />
            </svg>
          </div>
          <div className="mb-4">
            <div className="sm:text-center">Welcome back</div>
            <div className="sm:text-center">
              Enter your credentials to login to your account.
            </div>
          </div>
        </div>

        <form className="space-y-5">
          <div className="space-y-4">
            <div className="*:not-first:mt-2">
              <Label htmlFor={`${id}-email`}>Email</Label>
              <Input
                id={`${id}-email`}
                placeholder="hi@yourcompany.com"
                type="email"
                {...register("email", {
                  required: true,
                })}
              />
            </div>
            <div className="*:not-first:mt-2">
              <Label htmlFor={`${id}-password`}>Password</Label>
              <Input
                id={`${id}-password`}
                placeholder="Enter your password"
                type="password"
                {...register("password", {
                  required: true,
                })}
              />
            </div>
          </div>
          <div className="flex justify-between gap-2">
            <div className="flex items-center gap-2">
              <Checkbox id={`${id}-remember`} />
              <Label
                htmlFor={`${id}-remember`}
                className="text-muted-foreground font-normal"
              >
                Remember me
              </Label>
            </div>
            <a className="text-sm underline hover:no-underline" href="#">
              Forgot password?
            </a>
          </div>
          <Button
            type="button"
            className="w-full"
            onClick={handleSubmit(handleLogin)}
          >
            Sign in
          </Button>
        </form>
      </div>
    </div>
  );
}
