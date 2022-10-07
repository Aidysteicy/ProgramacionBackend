const authMiddleware  = (req, res, next) =>{ 
    if(req.isAuthenticated()){
        next()
    }else{
        return res.status(200).render('login')
    }}
module.exports = authMiddleware