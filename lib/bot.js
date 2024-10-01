"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const chalk_1 = require("chalk");
const https_proxy_agent_1 = require("https-proxy-agent");
const ora_1 = require("ora");
const http_proxy_agent_1 = require("http-proxy-agent");
class Bot {
    constructor(proxy) {
        this.proxy = proxy;
    }
    // Helper function for waiting
    wait(ms) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => setTimeout(resolve, ms));
        });
    }
    // Function to execute a task with optional proxy and delay
    executeTask(taskName, config, waitTimeMs = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            const spinner = (0, ora_1.default)(`Starting task: ${chalk_1.default.blue(taskName)}`).start();
            try {
                if (this.proxy) {
                    const agent = this.createProxyAgent(config.url);
                    config.httpAgent = agent;
                    config.httpsAgent = agent;
                }
                spinner.text = `Executing ${chalk_1.default.green(taskName)}`;
                const response = yield (0, axios_1.default)(config);
                spinner.succeed(`${chalk_1.default.green(taskName)} completed successfully`);
                if (waitTimeMs > 0) {
                    yield this.countdown(waitTimeMs);
                }
                return response.data;
            }
            catch (error) {
                spinner.fail(`${chalk_1.default.red(taskName)} failed`);
                throw error;
            }
        });
    }
    // Countdown logger
    countdown(ms) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(chalk_1.default.yellow(`Waiting for ${ms / 1000} seconds...`));
            const intervalMs = 1000;
            for (let i = ms; i > 0; i -= intervalMs) {
                process.stdout.write(chalk_1.default.magenta(`\rCountdown: ${i / 1000}s`));
                yield this.wait(intervalMs);
            }
            console.log(chalk_1.default.green('\nProceeding with next task...'));
        });
    }
    logStatus(status) {
        console.log(chalk_1.default.cyan(`[STATUS] ${status}`));
    }
    logError(error) {
        console.error(chalk_1.default.red(`[ERROR] ${error}`));
    }
    logSuccess(message) {
        console.log(chalk_1.default.green(`[SUCCESS] ${message}`));
    }
    // Helper to create proxy agent based on protocol
    createProxyAgent(url) {
        if (!this.proxy || !url)
            return undefined;
        const isHttps = url.startsWith('https');
        return isHttps
            ? new https_proxy_agent_1.HttpsProxyAgent(this.proxy)
            : new http_proxy_agent_1.HttpProxyAgent(this.proxy);
    }
}
exports.default = Bot;
