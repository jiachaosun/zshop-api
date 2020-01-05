module.exports = () => {
  return async function errorHandler(ctx, next) {
    try {
      await next();
    } catch (err) {
      // 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志
      ctx.app.emit("error", err, ctx);
      const status = err.status || 500;
      const message = err.message || "服务器内部错误";

      // HTTP Code
      ctx.status = status;

      // 生产环境
      const isProd = ctx.app.config.env === "prod";

      // 错误响应对象
      ctx.body = {
        code: status,
        message: (status === 500 && isProd) ? "Internal Server Error" : message
      };
    }
  };
};
