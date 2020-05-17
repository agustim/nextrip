'use strict'

var headersDefault = {
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Allow-Methods': 'OPTIONS,POST',
  'Access-Control-Allow-Origin': '*',
}

module.exports.errorName = async (code, message) => {
  console.log("ERROR: ", message)
  return {
    statusCode: code,
    headers: headersDefault,
    body: JSON.stringify({
      error: message,
    }),
  }
};

module.exports.responseOk = async (code, obj) => {
  var bodyReturn = JSON.stringify(obj)
  console.log("Ok: ", bodyReturn)
  return {
    statusCode: code,
    headers: headersDefault,
    body: bodyReturn,
  }
};
