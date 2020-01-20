module.exports = () => {
  return async function errorHandler(ctx, next) {
    try {
      await next();
    } catch (err) {
      // 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志
      ctx.app.emit("error", err, ctx);

      const message = err.message || "服务器内部错误";
      const code = err.code || -1;

      // 错误响应对象
      ctx.body = {
        code,
        message
      };
    }
  };
};
