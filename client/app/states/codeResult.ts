import { atom } from "recoil";

export const CodeResult = atom<string>({
  key: "code-result",
  default: "sample output",
});

export const codeResultStatus = atom<boolean>({
  key: "code-result-status",
  default: false,
});
