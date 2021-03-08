#!/usr/bin/env node
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const express = require("express");
const rendertron = require("rendertron-middleware");

const argv = yargs(hideBin(process.argv)).argv;

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
          proxyUrl: argv.rendertronUrl
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
  }).argv;
