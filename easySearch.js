const { OpenAI } = require("langchain/llms/openai");
const { Serper } = require("langchain/tools");
const { Calculator } = require("langchain/tools/calculator");
const { initializeAgentExecutorWithOptions } = require("langchain/agents");
const dotenv = require("dotenv");

// 加载环境变量
dotenv.config();

const model = new OpenAI(
  {
    openAIApiKey: process.env.OpenAI_API_KEY,
    temperature: 0,
  },
  { basePath: process.env.OpenAI_BASE_URL }
);

const tools = [
  new Serper(process.env.SERPER_KEY, {
    gl: "cn",
    hl: "zh-cn",
  }),
  new Calculator(),
];

const main = async () => {
  const executor = await initializeAgentExecutorWithOptions(tools, model, {
    agentType: "zero-shot-react-description",
    verbose: true,
  });
  const input = `搜索2044年莫言的年龄的六次方？`;
  const result = await executor.call({ input });
  console.log(result);
};

main();
