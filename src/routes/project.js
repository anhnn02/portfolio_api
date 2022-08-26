import { Router } from 'express';
import { get, create, list, remove, update, search, page } from '../controllers/project';
// import { requiredSignin, isAdmin, isAuth} from '../middlewares/checkAuth';
const router = Router();

router.get('/project', list);   
router.post('/project', create);
router.get('/project/:id', get);
router.delete('/project/:id', remove);
router.put('/project/:id', update);
router.get('/project', search )
router.get('/project', page )

// router.param("userId", userById)

export default router; 