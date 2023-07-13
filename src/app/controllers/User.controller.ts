
import User from "../models/User.model";
import UserService from "../services/User.service";
import { Encrypt } from "../utils/encrypt";

export default class UserController {
    constructor() {}

    async getUsers(req: any, res: any, next: any) {
        try {
            const result = await new UserService().getUsers();

            let users = new Array();
            for (const user of result) {
                const token = await Encrypt.generateToken(user.id ?? 0);
                
                users.push({
                    user: {
                        name: user.name,
                        email: user.email,
                        terms: user.terms,
                        google_id: user.google_id,
                        picture: user.picture,
                        birth: user.birth_date 
                    },
                    token: token
                })
            }

            return res.status(200).json({
                error: false,
                message: "",
                dataResult: users  
            });

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
            return res.status(400).json({
                error: true,
                message: err,
                dataResult: null
            });
        }
    }

    async loginUser(req: any, res: any, _next: any) {
        const { email, password } = req.body;

        try {
            if(!(email || password)) {
                return res.status(400).json({
                    error: true,
                    message: "Email/senha obrigatório",
                    dataResult: null
                });
            }

            const userExists = await new UserService().getUserByEmail(email);
            if(!userExists){
                return res.status(400).json({
                    error: true,
                    message: "Email não encontrado.",
                    dataResult: null
                });
            }
            
            const authenticaded = await Encrypt.comparePassword(password, userExists.password ?? "");
            if (!authenticaded) {
                return res.status(400).json({
                    error: true,
                    message: "Email/senha inválido",
                    dataResult: null
                });
            }
            
            const token = await Encrypt.generateToken(userExists.id ?? 0);
            return res.status(200).json({
                error: false,
                message: "",
                dataResult: {
                    user: {
                        name: userExists.name,
                        email: userExists.email                    
                    },
                    token: token
                }               
            });
        } catch (err) {
            return res.status(400).json({
                error: true,
                message: err,
                dataResult: null
            });
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
            return res.status(200).json({
                error: false,
                message: "",
                dataResult: result
            });
        } catch (err) {
            return res.status(400).json({
                error: true,
                message: err,
                dataResult: null
            });
        }
    }
}