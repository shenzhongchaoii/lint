#!/usr/bin/env node
import { Command } from 'commander';
import fs from 'fs-extra';
import glob from 'fast-glob';
import path from 'path';
import chalk from 'chalk';
import util from 'util';
import { exec } from 'child_process';

const log = (content) => {
  const message = typeof content === "string" ? chalk.white(content) : content.map((ele) => chalk[ele.color](ele.text)).join("");
  console.log(message);
};

const copyFiles = ({
  files,
  destDir
}) => {
  return Promise.all(
    files.map((file) => {
      const dest = path.resolve(destDir, `.${path.basename(file)}`);
      return fs.copyFile(file, dest);
    })
  );
};
const createConfigFile = async () => {
  const json = await fs.readFile("package.json", "utf-8");
  const { type } = JSON.parse(json);
  const source = path.resolve(
    process.argv[1],
    `../../dist/tpl/${!type || type === "commonjs" ? "cjs" : "es"}`
  );
  const files = await glob("**/*", {
    cwd: source,
    absolute: true,
    onlyFiles: true
  });
  return copyFiles({
    files,
    destDir: process.cwd()
  });
};
const logs$3 = [
  [
    {
      color: "blue",
      text: "@tttiga/lint: tttiga-lint install: "
    },
    {
      color: "blue",
      text: "\u2139 "
    },
    {
      color: "white",
      text: "Generating configuration files"
    }
  ],
  [
    {
      color: "blue",
      text: "@tttiga/lint: tttiga-lint install: "
    },
    {
      color: "green",
      text: "\u2714 "
    },
    {
      color: "white",
      text: "Generate successful for .eslintrc.js, .eslintignore, .prettierrc.js, .prettierignore, .stylelintrc.js, .stylelintignore, .lintstagedrc.js, .commitlintrc.js, .huskyrc.js, .husky/"
    }
  ]
];
const createConfigFiles = async () => {
  log(logs$3[0]);
  let result;
  try {
    await createConfigFile();
    log(logs$3[1]);
    result = {
      successful: 1,
      fail: 0,
      logs: [
        logs$3[0].map((ele) => ele.text).join(""),
        logs$3[1].map((ele) => ele.text).join("")
      ]
    };
  } catch {
    result = {
      successful: 0,
      fail: 1
    };
  }
  return result;
};

const logs$2 = [
  [
    {
      color: "blue",
      text: "@tttiga/lint: tttiga-lint install: "
    },
    {
      color: "blue",
      text: "\u2139 "
    },
    {
      color: "white",
      text: "Adding scripts to package.json"
    }
  ],
  [
    {
      color: "blue",
      text: "@tttiga/lint: tttiga-lint install: "
    },
    {
      color: "green",
      text: "\u2714 "
    },
    {
      color: "white",
      text: 'Add successful for scripts["prepare"], scripts["lint:eslint"], scripts["lint:prettier"], , scripts["lint:stylelint"], scripts["lint:lint-staged"], scripts["lint"]'
    }
  ]
];
const addScripts = async () => {
  log(logs$2[0]);
  let result;
  try {
    const json = await fs.readFile("package.json", "utf-8");
    const data = JSON.parse(json);
    data.scripts = data.scripts || {};
    data.scripts["prepare"] = "husky install";
    data.scripts["lint:eslint"] = "eslint . --ext .vue,.js,.jsx,.cjs,.mjs,.ts,.tsx,.cts,.mts --fix";
    data.scripts["lint:prettier"] = 'prettier --write "**/*.{js,json,tsx,css,less,scss,vue,html,md}"';
    data.scripts["lint:stylelint"] = 'stylelint --cache --fix "**/*.{vue,less,postcss,css,scss}" --cache --cache-location node_modules/.cache/stylelint/';
    data.scripts["lint:lint-staged"] = "lint-staged";
    data.scripts["lint"] = "npm run lint:eslint && npm run lint:prettier && npm run lint:stylelint";
    const modifiedJson = JSON.stringify(data, null, 2);
    await fs.writeFile("package.json", modifiedJson, "utf8");
    log(logs$2[1]);
    result = {
      successful: 1,
      fail: 0,
      logs: [
        logs$2[0].map((ele) => ele.text).join(""),
        logs$2[1].map((ele) => ele.text).join("")
      ]
    };
  } catch {
    result = {
      successful: 0,
      fail: 1
    };
  }
  return result;
};

util.promisify(exec);
const logs$1 = [
  [
    {
      color: "blue",
      text: "@tttiga/lint: tttiga-lint install: "
    },
    {
      color: "blue",
      text: "\u2139 "
    },
    {
      color: "white",
      text: "Generating husky's configuration files"
    }
  ],
  [
    {
      color: "blue",
      text: "@tttiga/lint: tttiga-lint install: "
    },
    {
      color: "green",
      text: "\u2714 "
    },
    {
      color: "white",
      text: "Generate successful for husky's configuration files"
    }
  ]
];
const files = [
  "pre-commit",
  "prepare-commit-msg",
  "commit-msg",
  "post-commit",
  "applypatch-msg",
  "pre-applypatch",
  "post-applypatch",
  "pre-rebase",
  "post-rewrite",
  "post-checkout",
  "post-merge",
  "pre-push",
  "pre-auto-gc"
];
const createFiles = async (dir = ".husky") => {
  if (process.env.HUSKY === "0")
    return "HUSKY=0 skip install";
  if (dir.includes(".."))
    return ".. not allowed";
  fs.mkdirSync(path.join(dir, "_"), { recursive: true });
  files.forEach(
    (file) => fs.writeFileSync(
      path.join(dir, "_", file),
      `#!/usr/bin/env sh
. "\${0%/*}/h"`,
      { mode: 493 }
    )
  );
  fs.writeFileSync(path.join(dir, "_", ".gitignore"), "*");
  fs.writeFileSync(path.join(dir, "_", "husky.sh"), "");
  fs.writeFileSync(
    path.join(dir, "commit-msg"),
    `#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx --no -- commitlint --edit $1`,
    { mode: 493 }
  );
  fs.writeFileSync(
    path.join(dir, "pre-commit"),
    `#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npm run lint:lint-staged`,
    { mode: 493 }
  );
  await fs.copyFile(
    path.resolve(process.argv[1], "../../dist/tpl/husky/h"),
    path.join(dir, "_", "h")
  );
  return "";
};
const createHuskyFiles = async () => {
  log(logs$1[0]);
  await createFiles();
  log(logs$1[1]);
  return {
    successful: 1,
    fail: 0,
    logs: [
      logs$1[0].map((ele) => ele.text).join(""),
      logs$1[1].map((ele) => ele.text).join("")
    ]
  };
};

const checkStat = (path) => {
  return new Promise((resolve) => {
    fs.stat(path, (error, stats) => {
      if (error) {
        resolve(false);
      } else {
        resolve(stats);
      }
    });
  });
};
const checkCacheLog = async () => {
  const dirStat = await checkStat(".tttiga-lint/cache.log");
  if (dirStat) {
    const data = await fs.readFile(".tttiga-lint/cache.log", "utf-8");
    if (data.length > 0) {
      return false;
    }
    return;
  }
  return true;
};
const createCacheLog = async (taskRecordData, cacheLogStat) => {
  if (cacheLogStat) {
    await fs.mkdir(".tttiga-lint");
  }
  let logText = taskRecordData.logs.join("\n");
  await fs.writeFile(".tttiga-lint/cache.log", logText);
  const taskStr = `${taskRecordData.tasks.successful + 1} successful, ${taskRecordData.tasks.fail} fail 4 total`;
  const timeStr = `${Math.round((Date.now() - taskRecordData.startTime) * 1e3) / 1e3}s`;
  const logs = [
    [
      {
        color: "blue",
        text: "@tttiga/lint: tttiga-lint install: "
      },
      {
        color: "white",
        text: "\u03A3 Generate successful for .tttiga-lint/cache.log successful"
      }
    ],
    `Tasks:    ${taskStr}`,
    "Cached:    1 cached, 1 total",
    `Time:    ${timeStr}`
  ];
  log(logs[0]);
  logText += `
${logs[0].map((ele) => ele.text).join("")}

${logs[1]}
${logs[2]}
${logs[3]}
  `;
  await fs.writeFile(".tttiga-lint/cache.log", logText, "utf8");
  log(logs[1]);
  log(logs[2]);
  log(logs[3]);
};

const taskRecord = () => {
  const data = {
    startTime: Date.now(),
    tasks: {
      successful: 0,
      fail: 0
    },
    logs: [
      "\xB7 Running tttiga-lint install",
      `@tttiga/lint: tttiga-lint install: > @tttiga/lint@0.0.1 tttiga-lint install ${process.cwd()}`
    ]
  };
  return {
    data,
    record: ({
      successful = 0,
      fail = 0,
      logs: logs2 = []
    }) => {
      data.tasks.successful += successful;
      data.tasks.fail += fail;
      data.logs = data.logs.concat(logs2);
    }
  };
};
const logs = [
  "\xB7 Running tttiga-lint install",
  [
    {
      color: "blue",
      text: "@tttiga/lint: tttiga-lint install: "
    },
    {
      color: "white",
      text: `> @tttiga/lint@0.0.1 tttiga-lint install ${process.cwd()}`
    }
  ]
];
const generate = async () => {
  log(logs[0]);
  log(logs[1]);
  const cacheLogStat = await checkCacheLog();
  if (cacheLogStat !== false) {
    const { data, record } = taskRecord();
    record(await createConfigFiles());
    record(await addScripts());
    record(await createHuskyFiles());
    createCacheLog(data, cacheLogStat);
  } else {
    log([
      {
        color: "blue",
        text: "@tttiga/lint: tttiga-lint install: "
      },
      {
        color: "red",
        text: "Break: Cache log file exists: "
      },
      {
        color: "blue",
        text: `${path.join(process.cwd(), "tttiga-lint/cache.log")}`
      }
    ]);
  }
};

const version = "0.0.1";

const program = new Command();
program.version(version , "-v, --version").command("install").description(
  "\u751F\u6210eslint\u3001prettier\u3001stylelint\u3001lint-staged\u3001husky\u3001commitlint \u914D\u7F6E\u6587\u4EF6\u3001\u6DFB\u52A0 lint scripts \u547D\u4EE4\u7B49"
).action(() => {
  generate();
});
program.parse();
