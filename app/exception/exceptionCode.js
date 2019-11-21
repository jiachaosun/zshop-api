"use strict";

const SYSTEM_ERROR = {
	code: 1116199999,
	msg: "内部服务器错误"
};
const PARAMETER_ERROR = {
	code: 1116210001,
	msg: "参数校验不通过"
};
const COMMON_PARAMETER_ERROR = {
	code: 1116210002,
	msg: "通用参数校验不通过"
};
const AUTH_ERROR = {
	code: 1116210003,
	msg: "用户鉴权失败"
};

const SESSION_VERIFY_FAILED = {
	code: 1116210004,
	msg: "身份验证校验失败"
};

module.exports = {
	SYSTEM_ERROR,
	PARAMETER_ERROR,
	COMMON_PARAMETER_ERROR,
	AUTH_ERROR,
	SESSION_VERIFY_FAILED
};
