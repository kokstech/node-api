setTimeout(() => {
    throw Error("oops");
}, 300);

process.on("uncaughtException", () => {});

process.on("unhandledRejection", () => {});
