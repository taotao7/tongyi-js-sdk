import { beforeAll, expect, test } from "vitest";
import TongYi from "../src";

let client: TongYi;

beforeAll(() => {
  client = new TongYi(process.env.TONGYI_API_KEY);
});

test("propmt test", async () => {
  const res = await client.sendPrompt("今天星期几");
  console.log(res.data);
});
