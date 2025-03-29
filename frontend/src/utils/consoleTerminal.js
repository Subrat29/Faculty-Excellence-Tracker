import { env } from '../constant';

async function consoleTerminal(...args) {
  try {
    if (env === 'development') {
      console.log(...args);
    }
  } catch (error) {
    console.log('Error in consoleTerminal', error.message);
  }
}
export default consoleTerminal;
