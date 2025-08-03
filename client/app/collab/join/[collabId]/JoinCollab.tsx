"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { useRecoilState } from "recoil";
import { userState } from "@/app/states/userState";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Zod validation schema
const formSchema = z.object({
  userName: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" })
    .max(50, { message: "Username must not exceed 50 characters" }),
});

export default function JoinCollab({ collabId }: { collabId: string }) {
  const [collabLink] = useState(collabId);
  const [hasJoined, setJoined] = useState(false);

  const [currentUser, setCurrentUser] = useRecoilState(userState);
  const { toast } = useToast();

  // Initialize form with react-hook-form and zod
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const resp = await fetch(
        `${process.env.NEXT_PUBLIC_API_URI}/collab/joinRoom`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: values.userName,
            collabId: collabLink,
          }),
        }
      );

      const respJson = await resp.json();

      if (!resp.ok) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "This CollabID Does not Exist",
          action: <ToastAction altText="Try again">Dismiss</ToastAction>,
        });
      } else {
        // add the user state to recoil state
        setCurrentUser(values.userName);

        // set joined state
        setJoined(true);

        // show success toast of joining
        toast({
          title: "You Have Joined the Collab-Space.",
          description:
            "You can now go the Collab-Space by Clicking the Go to Collab-Space Button",
          action: <ToastAction altText="Try again">Dismiss</ToastAction>,
        });
      }
    } catch (e) {
      console.log(e);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Check your internet connectivity",
        action: <ToastAction altText="Try again">Dismiss</ToastAction>,
      });
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md rounded-lg shadow-md border-[1.5px] text-3xl">
        <Card>
          <CardHeader>
            <CardTitle>Join Collab-Space </CardTitle>
            <CardDescription>
              You are invited to join this CollabSpace
            </CardDescription>
          </CardHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <CardContent>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="url">Collab-Space Link</Label>
                    <Input
                      id="url"
                      type="text"
                      spellCheck={false}
                      autoCorrect="off"
                      value={`${collabLink}`}
                      readOnly
                    />

                    <FormField
                      control={form.control}
                      name="userName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Your Name (Visible to Other Members)
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Your Name"
                              {...field}
                              disabled={hasJoined}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between space-x-4">
                {" "}
                <Button
                  type="button"
                  variant="outline"
                  className="w-2/6"
                  onClick={() => form.reset()}
                >
                  Cancel
                </Button>
                {!hasJoined && (
                  <Button type="submit" className="w-4/6">
                    Join Now &gt;
                  </Button>
                )}
              </CardFooter>
            </form>
          </Form>

          {hasJoined && (
            <CardFooter>
              <Link href={`/collab/space/${collabLink}`} className="w-full">
                <Button className="w-full">Go to Collab-Space &gt;</Button>
              </Link>
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  );
}
