import { useRecoilState } from "recoil";
import { CodeResult, codeResultStatus } from "@/app/states/codeResult";
import { codeLang } from "@/app/states/codeLang";
import { CodeContent } from "@/app/states/codeContent";
import { langVersions } from "./SideBar";

const useCodeRun = () => {
  const [output, setOutput] = useRecoilState(CodeResult);
  const [isRunning, setRunning] = useRecoilState(codeResultStatus);
  const [lang] = useRecoilState(codeLang);
  const [codeText] = useRecoilState(CodeContent);

  const handleCodeRun = async () => {
    try {
      setRunning(true);

      const reqBody = {
        language: lang.val,
        version: langVersions[lang.val as keyof typeof langVersions],
        files: [
          {
            name: `sample_code.${lang.val}`,
            content: codeText,
          },
        ],
        stdin: "",
        args: ["1", "2", "3"],
        compile_timeout: 10000,
        run_timeout: 3000,
        compile_memory_limit: -1,
        run_memory_limit: -1,
      };

      const resp = await fetch("https://emkc.org/api/v2/piston/execute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqBody),
      });

      const respJson = await resp.json();

      if (respJson.run.code == 0) {
        setOutput(respJson.run.stdout);
      } else if (respJson.run.code != 0) {
        setOutput(respJson.run.stderr.substring(0, 300));
      } else if (respJson.run.signal == "SIGKILL") {
        setOutput(`Time Limit Exceeded: SIGKILL \n ${respJson.run.stdout}`);
      }
    } catch (e) {
      console.log(e);
      setOutput("An error occurred while running the code");
    } finally {
      setRunning(false);
    }
  };

  return { handleCodeRun, output, isRunning };
};

export default useCodeRun;