import { beforeAll, expect, test } from "vitest";
import TongYi from "../src";

let client: TongYi;

beforeAll(() => {
  client = new TongYi(process.env.DASHSCOPE_API_KEY as string);
});

test("propmt test", async () => {
  const res = await client.sendPrompt("今天星期几");
});

test("message test", async () => {
  const res = await client.sendMessage([
    {
      role: "system",
      content: "you are a helpful assistant",
    },
    {
      role: "user",
      content: "你好吗",
    },
    {
      role: "assistant",
      content: "我很好，谢谢你",
    },
    {
      role: "user",
      content: "你叫什么名字",
    },
  ]);
});
