module.exports = {
  "USER_NOT_EXIST": {
    status: 400,
    code: "400", // override code value
    message: "can`t find user info",
  }
  // "NOT_FOUND": {
  //   errorPageUrl: (ctx, error) => {
  //     return "/404.html";
  //   }
  // },
  // "404": (ctx, error) => {
  //   ctx.redirect("/404.html");
  //   return false; // you can return false, break default logic
  // }
};
