import UserService from "../services/User.service";
import User from '../models/User.model';

export default class UserController {
    constructor() {}

    async getUsers(req: any, res: any, next: any) {
        try {
            const result = await new UserService().getUsers();
            return res.status(200).send(result);
        } catch (err) {
            return res.status(400).send(err);
        }
    }

    async getUserGoogle(req: any, res: any, next: any) {
        const user: User = {
            name: `${req.body.firstName} ${req.body.lastName}`,
            email: req.body.email,
            password: req.body.id,
            terms: 'false',
            google_id: req.body.id,
            picture: req.body.photoUrl,
        }
        
        try {
            const result = await new UserService().getUserGoogle(user);
            return res.status(200).send(result);
        } catch (err) {
            return res.status(400).send(err);
        }
    }

    async loginUser(req: any, res: any, next: any) {
        const user: User = {
            email: req.body.email,
            password: req.body.password,
        }

        try {
            const result = await new UserService().login(user);
            return res.status(200).send(result);
        } catch (err) {
            return res.status(400).send(err);
        }
    }

    async registerUser(req: any, res: any, next: any) {
        const user: User = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            terms: `${req.body.terms}`,
            google_id: null,
            picture: '',
        }

        try {
            const result = await new UserService().register(user);
            return res.status(200).send(result);
        } catch (err) {
            return res.status(400).send(err);
        }
    }
}