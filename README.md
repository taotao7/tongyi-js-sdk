# tongyi-js-sdk

This is a third-party JavaScript SDK library used for AskSage, use at your own risk. Currently, it does not support SSE interface and only supports the openai result_format format.

[more](https://help.aliyun.com/zh/dashscope/developer-reference/api-details?spm=a2c4g.11186623.0.0.7ee84631maDRP3#341800c0f8w0r)

## TODO 

- [x] message 
- [x] prompt
- [ ] stream(sse)
- [ ] search
- [ ] stop(block word)
- [ ] seed  
- [ ] max_token

## use 

```ts
import TongYi from '@tao/tongyi-js-sdk'

const client = new TongYi(process.env.DASHSCOPE_API_KEY as string);

const promptRes = await client.sendPrompt("今天星期几");
console.log(promptRes.data)

const msgRes = await client.sendMessage([
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
console.log(msgRes.data)
```
