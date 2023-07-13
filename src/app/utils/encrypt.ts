import * as bcrypt from 'bcrypt';
import { auth } from "../../config/auth";
import { promisify } from 'util';

const jwt = require('jsonwebtoken');

export const Encrypt = {        
    cryptPassword: (password: string) => {
       return bcrypt.genSalt(10).then((salt => bcrypt.hash(password, salt))).then(hash => hash);
    },
    
    comparePassword: (password: string, hashPassword: string) => {
        return bcrypt.compare(password, hashPassword).then(resp => resp);  
    },
    
    generateToken: (userId: number) => {
        return jwt.sign({ id: userId}, auth.secret, { expiresIn: auth.expireIn })
    },

    decodeToken: (token: string) => {
        return promisify(jwt.verify)(token, auth.secret)
    },
}