import { env } from "../contants.js";

async function consoleTerminal(...args) {
  try {
    if (env === "development") {
      console.log(...args);
    }
    // else {
    //   const logMessage = args.join(" ");

    //   // Log insert to db
    //   // let result = await  sendLogs(logMessage);
    // }
  } catch (error) {
    console.log("Error in consoleTerminal", error.message);
  }
}
export default consoleTerminal;
