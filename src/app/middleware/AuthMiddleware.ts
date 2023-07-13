import { Encrypt } from "../utils/encrypt";

export const AuthMiddleware = async (_req:any, res:any, next:any) => {
    const auth = _req.headers.authorization;

    if(!auth){
        return res.status(401).json({
            error: true,
            message: "Requisição sem token de autenticação",
            dataResult: null
        })
    }

    const [,token] = auth.split(" ");

    try {
        const decoded = await Encrypt.decodeToken(token);
        
        if(!decoded){
            return res.status(401).json({
                error: true,
                message: "Token de autenticação expirado",
                dataResult: null
            })
        }

        _req.user_id = decoded;
        next();
    } catch{
        return res.status(401).json({
            error: true,
            message: "Token de autenticação inválido",
            dataResult: null
        })
    }    
}