import UserService from "../services/User.service";

export default class UserController {
    constructor() {}

    async getUsers(req: any, res: any, next: any) {
        try {
            const result = await new UserService().getUsers();
            res.status(200).send(result);
        } catch (err) {
            return res.status(400).send(err);
        }
    }
}