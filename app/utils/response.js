const success = data => {
  const res = {
    code: 0,
    msg: "OK",
    data
  };
  return res;
};

const failure = error => {
  const res = {
    code: error.code,
    msg: error.msg,
    data: error.data
  };
  return res;
};


module.exports = { success, failure };
