import { Request, Response, Router } from 'express';
import { getConnection } from 'typeorm';

import { User } from '../models/user';

const router = Router();

router.post('/registration', async (req: Request, res: Response) => {
  try {
    const userRepository = getConnection().getRepository(User);
    
    const { email, password } = req.body;
    
    const candidate = await userRepository.findOne({ where: { email: email }});
    
    if(candidate) {
      return res.status(400).json({ msg: 'This user has been creating'});
    }
    
    const user = new User();
    
    user.email = email;
    user.password = password;
    
    await userRepository.save(user);
    
    req!.session!.userID = user.id;
    res.status(201).json({ msg: 'User was created'});
    return res.redirect('');
  } catch (error) {
    return res.status(403);
  }
});

router.post('/login', async (req: Request, res: Response) => {
  try {
    const userRepository = getConnection().getRepository(User);

    const { email, password } = req.body;

    const user = await userRepository.findOne({ where: { email: email, password: password }});

    console.log(user);

    if(user) {
      req!.session!.userID = user.id;
      res.status(201).json({ msg: 'Login'});
      return res.redirect('');
    }
  } catch (error) {
    return res.status(403);
  }
})

export default router;