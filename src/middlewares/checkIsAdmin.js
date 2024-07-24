export const checkIsAdmin = async (req, res, next) => {
    try {   
        if(req.user.role === "admin"){
            return next()
        }
        console.log("admin");
    } catch (error) {
        return res.status(401).json({
            message: "Unthorized"
        })
    }
};
