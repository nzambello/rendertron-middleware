#!/usr/bin/env node
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const express = require("express");
const rendertron = require("rendertron-middleware");

const argv = yargs(hideBin(process.argv)).argv;

const botUserAgents = [
  'Baiduspider',
  'bingbot',
  'Embedly',
  'facebookexternalhit',
  'LinkedInBot',
  'outbrain',
  'pinterest',
  'quora link preview',
  'rogerbot',
  'showyoubot',
  'Slackbot',
  'TelegramBot',
  'Twitterbot',
  'vkShare',
  'W3C_Validator',
  'WhatsApp',
  'GoogleBot'
];

const staticFileExtensions = [
  'ai',
  'avi',
  'css',
  'dat',
  'dmg',
  'doc',
  'doc',
  'exe',
  'flv',
  'gif',
  'ico',
  'iso',
  'jpeg',
  'jpg',
  'js',
  'less',
  'm4a',
  'm4v',
  'mov',
  'mp3',
  'mp4',
  'mpeg',
  'mpg',
  'pdf',
  'png',
  'ppt',
  'psd',
  'rar',
  'rss',
  'svg',
  'swf',
  'tif',
  'torrent',
  'ttf',
  'txt',
  'wav',
  'wmv',
  'woff',
  'xls',
  'xml',
  'zip',
  'gz',
];


yargs(hideBin(process.argv))
  .command(
    "$0",
    "start the server",
    () => {},
    argv => {
      if (argv.verbose) console.info(`start server on http://localhost:${argv.port}`);

      const app = express();

      app.use(
        rendertron.makeMiddleware({
          proxyUrl: argv.rendertronUrl,
          excludeUrlPattern: new RegExp(`\\.(${staticFileExtensions.join('|')})$`, 'i'),
          userAgentPattern: new RegExp(botUserAgents.join('|'), 'i'),
        })
      );

      app.use(express.static("files"));
      app.listen(argv.port);
    }
  )
  .option("verbose", {
    alias: "v",
    type: "boolean",
    default: true,
    description: "Run with verbose logging"
  })
  .option("port", {
    alias: "p",
    type: "number",
    demandOption: true,
    description: "Port to bind on"
  })
  .option("rendertronUrl", {
    alias: "rendertron",
    type: "string",
    demandOption: true,
    description: "Rendertron proxy URL"
  })
  .help()
  .argv;
