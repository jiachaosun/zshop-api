"use strict";

module.exports = app => {
  require("./router/cartRouter")(app);
  require("./router/checkoutRouter")(app);
  require("./router/homeRouter")(app);
  require("./router/productRouter")(app);
  require("./router/userRouter")(app);
  require("./router/orderRouter")(app);
  require("./router/paymentRouter")(app);
  require("./router/categoryRouter")(app);
};
