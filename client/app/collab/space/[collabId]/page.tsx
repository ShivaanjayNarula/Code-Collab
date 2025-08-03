"use client";
import { userState } from "@/app/states/userState";
import { useRecoilState } from "recoil";
import CodeEditor from "./Editor";
import SideBar from "./SideBar";
import { useEffect, useState } from "react";
import io from "socket.io-client";

import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { CodeContent } from "@/app/states/codeContent";
import { codeLang } from "@/app/states/codeLang";
import { CodeResult } from "@/app/states/codeResult";
import OutputTerminal from "./Output";

export default function Page({ params }: { params: { collabId: string } }) {
  const [currentUser, setCurrentUser] = useRecoilState(userState);
  const [socket, setSocket] = useState<any>(null);
  const [activeUsers, setActiveUsers] = useState<any>([]);
  const [codeText, setCodeText] = useRecoilState(CodeContent);
  const [isLocalLangChange, setIsLocalLangChange] = useState(false);
  const [output, setOutput] = useRecoilState(CodeResult);
  const [lang, setLang] = useRecoilState(codeLang);

  useEffect(() => {
    if (socket && isLocalLangChange) {
      socket.emit("lang-change", lang, currentUser);
      setIsLocalLangChange(false);
    }
  }, [lang]);

  async function getActiveUsers() {
    try {
      const resp = await fetch(
        `${process.env.NEXT_PUBLIC_API_URI}/collab/getActiveUsers?id=${params.collabId}`,
        {}
      );
      const respJson = await resp.json();

      setActiveUsers(respJson);
    } catch (e) {
      console.log(e);
    }
  }

  function emitCodeChange(e: any) {
    socket.emit("send-code-change", { code: e, user: currentUser });
  }

  const handleLangChange = () => {
    setIsLocalLangChange(true);
  };

  const { toast } = useToast();

  useEffect(() => {
    const newSocket = io(`${process.env.NEXT_PUBLIC_WS_URI}/`);
    setSocket(newSocket);

    newSocket.emit("join-room", {
      collabId: params.collabId,
      user: currentUser,
    });

    setTimeout(getActiveUsers, 3000);

    newSocket.on("user-joined", (message) => {
      toast({
        title: `${message} Joined Collab-Space`,
        description: `${message} has joined the Collab-Space Now`,
        action: <ToastAction altText="Try again">Dismiss</ToastAction>,
      });

      setTimeout(getActiveUsers, 2000);
    });

    newSocket.on("receive-code-change", (message) => {
      setCodeText(message.code);
    });

    newSocket.on("receive-left-room", (userLeft) => {
      toast({
        title: `${userLeft} Left Collab-Space`,
        description: `${userLeft} has left the Collab-Space now`,
        action: <ToastAction altText="Try again">Dismiss</ToastAction>,
      });

      setTimeout(getActiveUsers);
    });

    newSocket.on("lang-change", (changedLang, changedByUser: string) => {
      if (changedLang.name !== lang.name) {
        setLang(changedLang);

        toast({
          title: `${changedByUser} has changed language to ${changedLang.name}`,
          action: <ToastAction altText="Try again">Dismiss</ToastAction>,
        });
      }
    });

    return () => {
      newSocket.emit("send-left-room", currentUser);
      newSocket.disconnect();
    };
  }, []);

  return (
    <>
      <div className="w-screen h-screen">
        <div className="flex-grow flex relative m-2">
          <div className="w-1/5 h-full z-50 flex flex-col justify-between">
            <SideBar
              members={activeUsers}
              langChange={handleLangChange}
              className="h-3/5"
            />
            <div className="m-2 w-1/6 absolute bottom-0">
              <OutputTerminal output={output} />
            </div>
          </div>
          <div className="w-4/5 h-full">
            <CodeEditor
              value={codeText}
              lang={lang.name}
              onChange={(e: any) => {
                setCodeText(e);
                emitCodeChange(e);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
