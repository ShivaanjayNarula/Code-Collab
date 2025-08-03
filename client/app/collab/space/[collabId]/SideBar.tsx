"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Code2,
  Play,
  UserRoundCog,
  LogOut,
  PanelRight,
  Save,
  Download,
  User2,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

import { useRecoilState } from "recoil";
import { codeLang } from "@/app/states/codeLang";
import { CodeResult, codeResultStatus } from "@/app/states/codeResult";
import { CodeContent } from "@/app/states/codeContent";
import useCodeRun from "./codeRun";
import { useToast } from "@/hooks/use-toast";

import { SidePanel } from "@/components/sidepanel";

export const langArray = [
  { name: "javaScript", val: "js", icon: "🟨" },
  { name: "python", val: "py", icon: "🐍" },
  { name: "c", val: "c", icon: "🔧" },
  { name: "rust", val: "rs", icon: "🦀" },
  { name: "java", val: "java", icon: "☕" },
];

export const langVersions = {
  js: "18.15.0",
  py: "3.10.0",
  c: "10.2.0",
  rs: "1.68.2",
  java: "15.0.2",
};

export default function SideBar({
  members,
  langChange,
  className = "",
}: {
  members: string[];
  langChange: () => void;
  className?: string;
}) {
  const [lang, setLang] = useRecoilState(codeLang);
  const { handleCodeRun } = useCodeRun();
  const [isRunning, setRunning] = useRecoilState(codeResultStatus);
  const [codeText] = useRecoilState(CodeContent);
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const { toast } = useToast();

  const handleSave = () => {
    // Implement save functionality here
    console.log("Save button clicked");
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([codeText], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `sample_code.${lang.val}`;
    document.body.appendChild(element);
    element.click();
    toast({
      title: "Download Started",
    });
  };

  const renderToggleButton = (handleToggle: () => void) => (
    <TooltipProvider>
      <div className="flex w-full">
        <div className="w-4/5 flex justify-start">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={handleToggle}>
                <PanelRight className="w-5 h-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {isPanelOpen ? "Close Sidebar" : "Open Sidebar"}
            </TooltipContent>
          </Tooltip>
        </div>
        <div className="w-1/5">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleCodeRun}
                disabled={isRunning}
              >
                <Play className="w-5 h-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {isRunning ? "Running..." : "Run Code"}
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );

  return (
    <>
      <SidePanel
        panelOpen={isPanelOpen}
        handlePanelOpen={() => setIsPanelOpen(!isPanelOpen)}
        renderButton={renderToggleButton}
        className={`w-72 max-w-sm shadow-lg border-l ${className}`}
      >
        {isPanelOpen && (
          <div className="flex flex-col h-full">
            <div className="mb-6 flex items-center justify-between px-4">
              <TooltipProvider>
                <Tooltip>
                  {/* <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <UserRoundCog className="w-5 h-5" />
                    </Button>
                  </TooltipTrigger> */}
                  <TooltipContent>Workspace Settings</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <div className="mb-6 space-y-2 px-4">
              <div className="flex items-center space-x-2">
                <Code2 className="w-6 h-6 text-primary" />
                <h2 className="text-lg font-semibold">Selection</h2>
              </div>
              <Select
                value={lang.name}
                onValueChange={(selectedLang) => {
                  const selectedLangObj = langArray.find(
                    (l) => l.name === selectedLang
                  );
                  if (selectedLangObj) {
                    langChange();
                    setLang(selectedLangObj);
                  }
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Language">
                    <div className="flex items-center">
                      <span className="mr-2">
                        {langArray.find((l) => l.name === lang.name)?.icon ||
                          "🟨"}
                      </span>
                      {lang.name}
                    </div>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {langArray.map((elem) => (
                    <SelectItem key={elem.val} value={elem.name}>
                      <div className="flex items-center">
                        <span className="mr-2">{elem.icon}</span>
                        {elem.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Separator className="my-2" />

            <div className="flex-grow overflow-auto px-4 space-y-4">
              <div className="flex items-center space-x-2 my-2">
                <User2 className="w-6 h-6 text-primary" />
                <h2 className="text-base text-muted-foreground">
                  Active Members ({members.length})
                </h2>
              </div>

              <div className="space-y-4">
                {members.map((member) => (
                  <div key={member} className="flex items-center space-x-2">
                    <Avatar className="w-8 h-8">
                      <AvatarImage
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                          member
                        )}&background=random`}
                      />
                      <AvatarFallback>{member[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{member}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-auto p-4 space-y-2">
              <Button variant="ghost" className="w-full" onClick={handleSave}>
                <Save className="mr-2 w-4 h-4" />
                Save
              </Button>
              <Button
                variant="ghost"
                className="w-full"
                onClick={handleDownload}
              >
                <Download className="mr-2 w-4 h-4" />
                Download
              </Button>
              <Link href="/" className="w-full block mt-4">
                <Button variant="destructive" className="w-full">
                  <LogOut className="mr-2 w-4 h-4" />
                  Leave CollabSpace
                </Button>
              </Link>
            </div>
          </div>
        )}
      </SidePanel>
    </>
  );
}
