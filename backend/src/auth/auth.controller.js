import jwt from 'jsonwebtoken'

export function login(req, res){
    const {userId}=req.body

    if(!userId){
        return res.status(400).json({message:"UserId is required"})
    }

    const token=jwt.sign({id:userId}, process.env.JWT_SECRET, {expiresIn: '1h'})
    res.json({token})
}