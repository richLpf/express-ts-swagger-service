import { NextFunction, Request, Response } from 'express';
import { User } from '../interfaces/user.interface';
import UserService from '../services/user.service';
import { 
  generateSignToken, 
  TokenSecretKey, 
  TokenExpired, 
  RefreshTokenExpired, 
  checkSignToken,
  RetCodeMap
} from '../utils/util'

import md5 from 'md5';

class UsersController {
  public UserService = new UserService();

  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {

      const { Action, ...query } = req.body as any;
      const { username, password } = query

      console.log("登录信息：", username);

      const findData: User | null = await this.UserService.findUserByUsername(username);
      console.log("findData2222", findData, findData?.password, md5(query.password))
      if (findData && findData.password === md5(query.password)) {
        // 生成两个token
        console.log("findData3333")
        const jwtToken = generateSignToken({id: findData.id, username, password}, TokenSecretKey, TokenExpired)
        const refreshToken = generateSignToken({id: findData.id, username, password}, TokenSecretKey, RefreshTokenExpired)
        res.status(200).json({ 
          RetCode: 0, 
          Message: `登陆成功，用户名为${findData.username}`, 
          Data: {
            jwtToken,
            refreshToken,
            username: findData.username
          } 
        });
        return;
      }

      res.status(200).json({ RetCode: 1, Message: "用户名或密码错误！" });
    } catch (error) {
      next(error);
    }
  };

  public register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { Action, ...Data }: any = req.body;

      console.log('注册用户信息：');
      console.log(Data);

      if (!Data || !Data.username || !Data.password) {
        res.status(200).json({ RetCode: 1, Message: `注册用户信息错误！` });
        return;
      }

      Data.password = md5(Data.password);
      const createData: User = await this.UserService.createUser(Data);

      res.status(200).json({ RetCode: 0, Data: createData, Message: '注册新用户成功!' });
    } catch (error) {
      console.log(error)
      next(error);
    }
  };

  public getUserInfo = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // 权限拦截
      const jwtToken = req.header('jwtToken') as string;
      if (!jwtToken) {
        res.status(200).json({ RetCode: RetCodeMap.NotLogIn, Message: '未登录的用户！' });
        return;
      }
      try {
        // 这里只需要判断jwtToken是否过期，过期就判断没有登录
        const userInfo:any = await checkSignToken(jwtToken, TokenSecretKey)
        const findData: User | null = await this.UserService.findUserById(userInfo.id);
        const { id, username } = findData
        res.status(200).json({ 
          RetCode: 0, 
          Message: '', 
          Data: {
            id, 
            username,
            jwtToken: "",
            refreshToken: ""
          } 
        });
      }catch(err){
        if(err === "invalid token"){
          res.status(200).json({ RetCode: RetCodeMap.NotLogIn, Message: '校验失败！' });
          return;
        }else if (err === "jwt expired"){
          const refreshToken = req.header('refreshToken') as string;
          checkSignToken(refreshToken, TokenSecretKey).then(response => {
            const { id, username } = response as any;
            const jwtToken = generateSignToken({id, username}, TokenSecretKey, TokenExpired)
            const newRefreshToken = generateSignToken({id, username}, TokenSecretKey, RefreshTokenExpired)
            res.status(200).json({ 
              RetCode: 0, 
              Message: '', 
              Data: {
                id, 
                username,
                jwtToken: jwtToken,
                refreshToken: newRefreshToken
              }
            });
            return
          }).catch(err => {
            console.log("userinfo err", err)
            res.status(200).json({ RetCode: RetCodeMap.NotLogIn, Message: '登录凭证失效！' });
            return
          })
        }else{
          res.status(200).json({ RetCode: RetCodeMap.NotLogIn, Message: '登录凭证失效！' });
          return;
        }
      }
    } catch (error) {
      next(error);
    }
  };
}

export default UsersController;
