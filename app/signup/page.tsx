"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function SignUpPage() {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const handleSignUp = async (userData: any) => {
    const { data } = await authClient.signUp.email(
      {
        email: userData.email,
        password: userData.password,
        name: userData.name,
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
            <div className="sm:text-center">Sign up Origin UI</div>
            <div className="sm:text-center">
              We just need a few details to get you started.
            </div>
          </div>
        </div>

        <form className="space-y-5">
          <div className="space-y-4">
            <div className="*:not-first:mt-2">
              <Label htmlFor={"name"}>Full name</Label>
              <Input
                id={"name"}
                placeholder="John Doe"
                type="text"
                {...register("name", { required: true })}
              />
            </div>
            <div className="*:not-first:mt-2">
              <Label htmlFor={`email`}>Email</Label>
              <Input
                id={`email`}
                placeholder="hi@yourcompany.com"
                type="email"
                {...register("email", { required: true })}
              />
            </div>
            <div className="*:not-first:mt-2">
              <Label htmlFor={`password`}>Password</Label>
              <Input
                id={`password`}
                placeholder="Enter your password"
                type="password"
                {...register("password", { required: true })}
              />
            </div>
          </div>
          <Button
            type="button"
            className="w-full"
            onClick={handleSubmit(handleSignUp)}
          >
            Sign up
          </Button>
        </form>

        <div className="before:bg-border after:bg-border flex items-center gap-3 before:h-px before:flex-1 after:h-px after:flex-1">
          <span className="text-muted-foreground text-xs">Or</span>
        </div>

        <p className="text-muted-foreground text-center text-xs">
          By signing up you agree to our{" "}
          <a className="underline hover:no-underline" href="#">
            Terms
          </a>
          .
        </p>
      </div>
    </div>
  );
}
