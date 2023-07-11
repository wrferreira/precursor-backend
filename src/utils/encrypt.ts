import * as bcrypt from 'bcrypt';

export const Encrypt = {   
    
    cryptPassword: (password: string) => {
       return bcrypt.genSalt(10).then((salt => bcrypt.hash(password, salt))).then(hash => hash);
    },
    
    comparePassword: (password: string, hashPassword: string) => {
        return bcrypt.compare(password, hashPassword).then(resp => resp);  
    }
          
}