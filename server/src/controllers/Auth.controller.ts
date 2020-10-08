import { Request, Response } from "express";
import { getConnection } from 'typeorm';
import bcrypt from 'bcrypt';

import config from '../config';

import { User } from '../models/User';

function isEmail(email: string) {
  const regexp = /^([a-zA-Z0-9]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/;
  return regexp.test(email);
}

function isPass(pass: string) {
  const regexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/
  return regexp.test(pass);
}

const signUp = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userRepository = getConnection().getRepository(User);

    const { email, pass } = req.body;

    if(!(isEmail(email) && isPass(pass))) {
      return res.status(400).json({ msg: 'Invalid email or password', auth: false });
    }

    const candidate = await userRepository.findOne({ where: { email: email }});

    if(candidate) {
      return res.status(400).json({ msg: 'This user has been creating', auth: false });
    }

    const user = new User();

    user.email = email;
    user.password = await bcrypt.hash(pass, 12);

    await userRepository.save(user);

    const userID = (await userRepository.findOne(user))?.id;
    res.cookie('userID', userID, config.cookie);
    return res.status(201).json({ msg: 'Account created', auth: true });
  } catch (error) {
    return res.status(503).json({ msg: 'Server error', auth: false });
  }
};

const signIn = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userRepository = getConnection().getRepository(User);

    const { email, pass } = req.body;

    if(!(isEmail(email) && isPass(pass))) {
      return res.status(400).json({ msg: 'Invalid email or password', auth: false });
    }

    const user = await userRepository.findOne({ where: { email: email }});

    if(user){
      if(await bcrypt.compare(pass, user?.password)) {
        const userID = (await userRepository.findOne(user))?.id;
        res.cookie('userID', userID, config.cookie);
        return res.status(200).json({ msg: 'U are logged in', auth: true });
      }
    }
    return res.status(400).json({ msg: 'User is not found', auth: false });
  } catch (error) {
    return res.status(503).json({ msg: 'Server error', auth: false });
  }
};

const logout = async (_: Request, res: Response): Promise<Response> => {
  res.clearCookie('userID');
  return res.status(200).json({ msg: 'U are signed out', auth: false });
};

const hassigned = async (req: Request, res: Response): Promise<Response> => {
  if(req.cookies.userID) {
    const userID = req.cookies.userID;
    res.clearCookie('userID');
    res.cookie('userID', userID, config.cookie);
    return res.status(200).json({ msg: 'U are signned', auth: true });
  } else {
    return res.status(401).json({ msg: 'U are not login', auth: false });
  }
};

export default {
  signUp,
  signIn,
  logout,
  hassigned
};