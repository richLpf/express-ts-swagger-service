/* eslint-disable */
const jwt = require('jsonwebtoken')
/**
 * @method isEmpty
 * @param {String | Number | Object} value
 * @returns {Boolean} true & false
 * @description this value is Empty Check
 */
export const isEmpty = (value: string | number | object): boolean => {
  if (value === null) {
    return true;
  } else if (typeof value !== 'number' && value === '') {
    return true;
  } else if (typeof value === 'undefined' || value === undefined) {
    return true;
  } else if (value !== null && typeof value === 'object' && !Object.keys(value).length) {
    return true;
  } else {
    return false;
  }
};

export const pageSize = {
  offset: 0,
  limit: 10
}

export const TokenSecretKey = "okr_backend_token"
export const TokenExpired = '8h'
export const RefreshTokenExpired = '3 days'
export const RetCodeMap = {
  Success: 0,
  NotLogIn: 10000
}

export const generateSignToken = (
  option:any, 
  secretKey: string, 
  expiresIn?: string | number | undefined
) => {
  return jwt.sign(
    option, 
    secretKey,
    {
      expiresIn: expiresIn || TokenExpired
    }
  )
}

export const checkSignToken = async (jwtToken: string, secretKey: string) => {
  return new Promise((resolve, reject) => {
    jwt.verify(
      jwtToken, 
      secretKey, 
      function(err:Error, value:any) {
        if(err){
          reject(err.message)
        }else{
          resolve(value)
        }
      }
    )
  })
}