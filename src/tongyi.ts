import axios, { type AxiosInstance } from "axios";
import { type Messages, type Model, type TongYiOpt } from "./index";

axios.interceptors.response.use((config) => {
  if (config.status === 200) {
    return config.data;
  }
});

class TongYi {
  private client: AxiosInstance;
  private model: Model;
  private history: Messages = [];

  constructor(
    apiKey: string,
    opt: TongYiOpt = { SSE: false, model: "qwen-turbo" }
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

  public sendMessage = async (
    msg: Messages,
    opt: { newMsg: boolean } = { newMsg: false }
  ) => {
    // clean history
    if (opt.newMsg) {
      this.history = [];
    }

    const res = await this.client({
      method: "post",
      data: {
        model: this.model,
        input: {
          messages: this.history.concat(msg),
        },
      },
    });

    this.history.push({
      role: "assistant",
      content: res.data.output.text,
    });
    return res;
  };
}

export default TongYi;
