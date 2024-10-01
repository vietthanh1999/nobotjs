# Bot Task Executor Library

This library provides a simple framework for executing tasks that make HTTP requests with optional support for proxies, task logging, and delay functionality. The library uses `axios` for HTTP requests and `chalk` for colored console output, along with `ora` for spinner animations.

## Features
- Execute HTTP tasks with customizable configurations.
- Optional proxy support for both HTTP and HTTPS.
- Logging for task status, errors, and success.
- Add delay between tasks with a countdown timer.
- Easily integrate with external services through `axios`.

## Installation

```bash
npm install axios chalk ora https-proxy-agent http-proxy-agent
```

## Import the library

```bash
import Bot from './Bot'
```

## Creating a Bot instance

You can instantiate a Bot object with or without a proxy. The proxy should be passed as a string in the format of http://proxy-server:port.

const bot = new Bot('http://my-proxy-server:port') // With proxy
// or
const bot = new Bot() // Without proxy

## Executing a task

You can use the executeTask method to perform a task. It takes the following parameters:

	•	taskName: A string representing the name of the task.
	•	config: An AxiosRequestConfig object for configuring the HTTP request.
	•	waitTimeMs: (Optional) A delay in milliseconds to wait after completing the task.

```bash
const config = {
  method: 'GET',
  url: 'https://api.example.com/data',
  headers: { 'Authorization': 'Bearer your_token' }
}

bot.executeTask('Fetch Data', config, 5000)
  .then((data) => {
    console.log('Task Result:', data)
  })
  .catch((error) => {
    console.error('Error:', error)
  })
```

## Logging

The Bot class provides three methods for logging:

	•	logStatus(status: string): Logs a general status message.
	•	logError(error: string): Logs an error message.
	•	logSuccess(message: string): Logs a success message.

Example:
```bash
    bot.logStatus('Starting process...')
    bot.logError('Something went wrong!')
    bot.logSuccess('Task completed!')
```

## Proxy Support

The library automatically handles the proxy setup depending on the request URL’s protocol (HTTP or HTTPS). You can specify the proxy URL when initializing the Bot class. If no proxy is provided, requests will be sent directly.

```bash
const botWithProxy = new Bot('http://my-proxy-server:8080')
const botWithoutProxy = new Bot()
```

API Reference

Bot.executeTask(taskName: string, config: AxiosRequestConfig, waitTimeMs?: number): Promise<any>

Executes an HTTP task with optional proxy support and delay. It returns the result of the axios request.

	•	taskName: The name of the task (used for logging purposes).
	•	config: The configuration object for the HTTP request, which conforms to AxiosRequestConfig.
	•	waitTimeMs: (Optional) Delay in milliseconds to wait after completing the task. Defaults to 0 if not provided.

Bot.logStatus(status: string)

Logs a general status message.

Bot.logError(error: string)

Logs an error message.

Bot.logSuccess(message: string)

Logs a success message.

Example:

```bash
const bot = new Bot()

const taskConfig = {
  method: 'POST',
  url: 'https://api.example.com/upload',
  data: { key: 'value' }
}

bot.executeTask('Upload Data', taskConfig, 3000)
  .then((response) => {
    bot.logSuccess('Data uploaded successfully')
    console.log(response)
  })
  .catch((error) => {
    bot.logError('Failed to upload data')
    console.error(error)
  })
```