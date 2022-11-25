async function homeControl (req,res){
    try {
        const username = req.user
        logger.info(`usuario ${username} autenticado`)
        res.status(200).render('main',{user: username})
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

async function loginControl (req, res){
    try {
        res.status(200).redirect('/home')
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

async function logoutControl (req, res, next){
    const username = req.user
    req.logout((err)=>{
         if(err) { 
             logger.error(err)
             return next(err)
         }  
         res.render('logout', {user: username}) 
    })
}

async function failControl (req,res){
    let error_message = req.flash('error')[0]
    logger.warn(error_message)
    res.status(200).render('fail', {error_message})
}

module.exports = { homeControl, loginControl, logoutControl, failControl}

