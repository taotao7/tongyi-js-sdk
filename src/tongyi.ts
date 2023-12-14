import axios, { type AxiosInstance } from "axios";

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

type Messages = {
  content: string;
  role: Role;
}[];

type Role = "system" | "user" | "assistant";

axios.interceptors.response.use((config) => {
  if (config.status === 200) {
    return config.data;
  }
});

class TongYi {
  private client: AxiosInstance;
  private model: Model;

  constructor(
    apiKey: string,
    opt: TongYiOpt = { SSE: false, model: "qwen-turbo" },
  ) {
    this.model = opt.model;
    this.client = axios.create({
      baseURL:
        "https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        Accept: opt.SSE ? "text/event-stream" : "*/*",
      },
    });
  }

  public changeModel = (model: Model) => {
    this.model = model;
  };

  public sendPrompt = (prompt: string) => {
    return this.client({
      method: "post",
      data: {
        model: this.model,
        input: {
          prompt: prompt,
        },
      },
    });
  };

  public sendMessage = (msg: Messages) => {
    return this.client({
      mothod: "post",
      data: {
        model: this.model,
        input: {
          messages: msg,
        },
      },
    });
  };
}

export default TongYi;
