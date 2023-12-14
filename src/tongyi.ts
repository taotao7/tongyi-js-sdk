import axios, { type AxiosInstance } from "axios";

interface TongYiOpt {
  SSE: boolean; // sse mode
  model: Model;
}

axios.interceptors.response.use((config) => {
  if (config.status === 200) {
    return config.data;
  }
});

type Model =
  | "qwen-turbo"
  | "qwen-plus"
  | "qwen-max"
  | "qwen-max-1201"
  | "qwen-max-longcontext";

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
}

export default TongYi;
