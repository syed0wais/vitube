const asyncHandler = (requestHandler) => {
    (req,res,next) => {
        Promise.resolve(requestHandler(req,res,next)).
        catch((err)=>next(err))
    }
}

export default asyncHandler

// const asyncHandler = (fn) => async (req,res,next) => {               //basic try catch mehthod
//     try{
//         await fn(req,res,next);
//     }
//     catch(error){
//         res.status(err.code ||  500).json({
//             sucess: false,
//             message: err.message
//         })
//     }
// }
