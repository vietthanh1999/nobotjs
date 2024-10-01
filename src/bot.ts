import axios, { AxiosRequestConfig } from 'axios'
import chalk from 'chalk'
import { HttpsProxyAgent } from 'https-proxy-agent'
import ora from 'ora'
import { HttpProxyAgent } from 'http-proxy-agent'

class Bot {
  private proxy?: string

  constructor(proxy?: string) {
    this.proxy = proxy
  }

  // Helper function for waiting
  private async wait(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  // Function to execute a task with optional proxy and delay
  async executeTask(
    taskName: string,
    config: AxiosRequestConfig,
    waitTimeMs: number = 0
  ) {
    const spinner = ora(`Starting task: ${chalk.blue(taskName)}`).start()

    try {
      if (this.proxy) {
        const agent = this.createProxyAgent(config.url)
        config.httpAgent = agent
        config.httpsAgent = agent
      }

      spinner.text = `Executing ${chalk.green(taskName)}`
      const response = await axios(config)
      spinner.succeed(`${chalk.green(taskName)} completed successfully`)

      if (waitTimeMs > 0) {
        await this.countdown(waitTimeMs)
      }

      return response.data
    } catch (error) {
      spinner.fail(`${chalk.red(taskName)} failed`)
      throw error
    }
  }

  // Countdown logger
  private async countdown(ms: number) {
    console.log(chalk.yellow(`Waiting for ${ms / 1000} seconds...`))
    const intervalMs = 1000
    for (let i = ms; i > 0; i -= intervalMs) {
      process.stdout.write(chalk.magenta(`\rCountdown: ${i / 1000}s`))
      await this.wait(intervalMs)
    }
    console.log(chalk.green('\nProceeding with next task...'))
  }

  logStatus(status: string) {
    console.log(chalk.cyan(`[STATUS] ${status}`))
  }

  logError(error: string) {
    console.error(chalk.red(`[ERROR] ${error}`))
  }

  logSuccess(message: string) {
    console.log(chalk.green(`[SUCCESS] ${message}`))
  }

  // Helper to create proxy agent based on protocol
  private createProxyAgent(url: string | undefined) {
    if (!this.proxy || !url) return undefined

    const isHttps = url.startsWith('https')
    return isHttps
      ? new HttpsProxyAgent(this.proxy)
      : new HttpProxyAgent(this.proxy)
  }
}

export default Bot
