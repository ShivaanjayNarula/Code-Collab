"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const loginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long.",
  }),
});

const emailSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});

const otpSchema = z.object({
  otp: z.string().length(6, { message: "OTP must be 6 digits." }),
});

const passwordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long." }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function LoginPage() {
  const [resetEmail, setResetEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [forgotPasswordStep, setForgotPasswordStep] = useState<
    "email" | "otp" | "newPassword"
  >("email");
  const router = useRouter();
  const { toast } = useToast();

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const emailForm = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: "" },
  });

  const otpForm = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: "" },
  });

  const passwordForm = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  async function onLoginSubmit(values: z.infer<typeof loginSchema>) {
    setIsLoading(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URI}/users/signin`,
        {
          email: values.email,
          password: values.password,
        }
      );

      console.log(response.data.userName);

      toast({
        title: "Login Successful",
        description: "You have been logged in successfully.",
      });
      router.push(`/collab/create/${response.data.userName}`);
    } catch (error) {
      console.log("Login failed:", error);
      toast({
        title: "Login Failed",
        description: "There was an error logging in. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const handleGoogleLogin = () => {
    router.push("/auth/signup");
  };

  const handleForgotPassword = () => {
    setIsForgotPasswordOpen(true);
  };

  const onEmailSubmit = async (values: z.infer<typeof emailSchema>) => {
    try {
      setResetEmail(values.email);
      console.log("Sending OTP to:", values.email);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URI}/users/sendotp`,
        {
          email: values.email,
        }
      );

      console.log("OTP sent:", response.data);

      toast({
        title: "OTP Sent",
        description: "Please check your email for the OTP.",
      });

      setForgotPasswordStep("otp");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Handle specific axios error responses
        const errorMessage =
          error.response?.data?.message || "Failed to send OTP";

        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });
      } else {
        // Handle unexpected errors
        toast({
          title: "Unexpected Error",
          description: "An unexpected error occurred",
          variant: "destructive",
        });
      }
    }
  };

  const onOTPSubmit = async (values: z.infer<typeof otpSchema>) => {
    try {
      setIsLoading(true);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URI}/users/verifyotp`,
        {
          email: resetEmail, // Using the stored email
          otp: values.otp,
        }
      );

      toast({
        title: "OTP Verified",
        description: "Please enter your new password.",
      });

      setForgotPasswordStep("newPassword");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message || "Failed to verify OTP";

        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Unexpected Error",
          description: "An unexpected error occurred",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onPasswordSubmit = async (values: z.infer<typeof passwordSchema>) => {
    try {
      setIsLoading(true);

      // Get the email from the previous step (you might want to store this in state or context)
      const email = emailForm.getValues("email");

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URI}/users/resetPassword`,
        {
          email: email,
          otp: otpForm.getValues("otp"), // Get the OTP from the previous step
          newPassword: values.password,
        }
      );

      toast({
        title: "Password Updated",
        description: "Your password has been successfully updated.",
      });

      // Reset forms and close dialog
      setIsForgotPasswordOpen(false);
      setForgotPasswordStep("email");
      loginForm.reset();
      emailForm.reset();
      otpForm.reset();
      passwordForm.reset();

      // Optional: Redirect to login or show login form
      router.push("/auth/login");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Handle specific axios error responses
        const errorMessage =
          error.response?.data?.message || "Failed to reset password";

        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });
      } else {
        // Handle unexpected errors
        toast({
          title: "Unexpected Error",
          description: "An unexpected error occurred",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center z-20">
      <div className="w-full max-w-md space-y-8 rounded-lg shadow-md p-8 border-gray-500 ">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Login to your account</h2>
          <p className="mt-2 text-sm">
            Enter your email and password to access your account
          </p>
        </div>

        <Form {...loginForm}>
          <form
            onSubmit={loginForm.handleSubmit(onLoginSubmit)}
            className="space-y-6"
          >
            <FormField
              control={loginForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={loginForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-between items-center">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </Button>
              <Button variant="link" onClick={handleForgotPassword}>
                Forgot Password?
              </Button>
            </div>
          </form>
        </Form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="px-2">Don&apos;t have Account</span>
          </div>
        </div>

        <Button
          onClick={handleGoogleLogin}
          variant="outline"
          className="w-full"
        >
          Sign Up With Your Email
        </Button>

        <Dialog
          open={isForgotPasswordOpen}
          onOpenChange={setIsForgotPasswordOpen}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Reset Password</DialogTitle>
              <DialogDescription>
                {forgotPasswordStep === "email" &&
                  "Enter your email to receive a one-time password."}
                {forgotPasswordStep === "otp" &&
                  "Enter the OTP sent to your email."}
                {forgotPasswordStep === "newPassword" &&
                  "Enter your new password."}
              </DialogDescription>
            </DialogHeader>

            {forgotPasswordStep === "email" && (
              <Form {...emailForm}>
                <form
                  onSubmit={emailForm.handleSubmit(onEmailSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={emailForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Send OTP</Button>
                </form>
              </Form>
            )}

            {forgotPasswordStep === "otp" && (
              <Form {...otpForm}>
                <form
                  onSubmit={otpForm.handleSubmit(onOTPSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={otpForm.control}
                    name="otp"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>One-Time Password</FormLabel>
                        <FormControl>
                          <InputOTP maxLength={6} {...field}>
                            <InputOTPGroup>
                              <InputOTPSlot index={0} />
                              <InputOTPSlot index={1} />
                              <InputOTPSlot index={2} />
                              <InputOTPSeparator />
                              <InputOTPSlot index={3} />
                              <InputOTPSlot index={4} />
                              <InputOTPSlot index={5} />
                            </InputOTPGroup>
                          </InputOTP>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Verify OTP</Button>
                </form>
              </Form>
            )}

            {forgotPasswordStep === "newPassword" && (
              <Form {...passwordForm}>
                <form
                  onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={passwordForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Enter new password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={passwordForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm New Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Confirm new password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Update Password</Button>
                </form>
              </Form>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
