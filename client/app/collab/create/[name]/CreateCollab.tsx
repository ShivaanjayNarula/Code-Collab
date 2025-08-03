"use client";
import * as React from "react";
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
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useRecoilState } from "recoil";
import { userState } from "@/app/states/userState";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// Zod validation schema
const formSchema = z.object({
  userName: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(50, {
      message: "Username must not exceed 50 characters.",
    }),
});

function CreateCollab({ params }: { params: { name: string } }) {
  const [isSubmitting, setSubmitting] = React.useState(false);
  const [isCreated, setCreated] = React.useState(false);
  const [url, setUrl] = React.useState("");
  const [copyBtn, setCopyBtn] = React.useState("Copy Link");
  const [collabId, setCollabId] = React.useState("");
  const router = useRouter();

  const [currentUser, setCurrentUser] = useRecoilState(userState);
  const { toast } = useToast();

  // Initialize form with react-hook-form and zod
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: "",
    },
  });

  // Extract the name parameter from the URL and set it as the default value
  useEffect(() => {
    const name = params.name as string;
    if (name) {
      form.setValue("userName", name.replace("%20", " "));
    }
  }, [params.name, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setSubmitting(true);

    try {
      const result = await fetch(
        `${process.env.NEXT_PUBLIC_API_URI}/collab/createRoom`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: values.userName,
          }),
        }
      );

      if (result.ok) {
        const respJson = await result.json();

        // set the recoil userState
        setCurrentUser(values.userName);

        setCollabId(respJson.collabId);
        setUrl(`http://localhost:3000/collab/join/${respJson.collabId}`);
        setCreated(true);
      } else {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
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
    setSubmitting(false);
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md rounded-lg shadow-md border-[1.5px] text-3xl">
        <Card className="">
          {!isCreated && (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} onAbort={() => {}}>
                <CardHeader>
                  <CardTitle>Create Collab-Space</CardTitle>
                  <CardDescription>
                    Create a new CollabSpace with Editor in one-click.
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <FormField
                    control={form.control}
                    name="userName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Host Name (Visible to Members)</FormLabel>
                        <FormControl>
                          <Input placeholder="Your Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      router.push("/");
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    Create Space
                  </Button>
                </CardFooter>
              </form>
            </Form>
          )}

          {isCreated && (
            <div>
              <CardHeader>
                <CardTitle>Collab-Space Created 🚀</CardTitle>
                <CardDescription>
                  Share This Link With Your Members. Then Go To The Space By
                  Clicking Button
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="url">Collab-Space Link</Label>
                    <Input
                      id="url"
                      type="text"
                      readOnly={true}
                      spellCheck={false}
                      autoCorrect="off"
                      value={url}
                    />
                    <Button
                      onClick={() => {
                        navigator.clipboard.writeText(url);
                        setCopyBtn("Link Copied");
                      }}
                      variant="outline"
                    >
                      {copyBtn}
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => {
                    setCreated(false);
                    form.reset();
                  }}
                >
                  Create Another Space
                </Button>
                <Link href={`/collab/space/${collabId}`}>
                  <Button>Go To Collab-Space &gt;</Button>
                </Link>
              </CardFooter>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

export default CreateCollab;
