import TongYi from "./tongyi";

export interface TongYiOpt {
  SSE: boolean; // sse mode
  model: Model;
}

export type Model =
  | "qwen-turbo"
  | "qwen-plus"
  | "qwen-max"
  | "qwen-max-1201"
  | "qwen-max-longcontext";

export type TalkHistory = {
  input: Messages;
};

export type Messages = {
  content: string;
  role: Role;
}[];

export type Role = "system" | "user" | "assistant";

export default TongYi;
