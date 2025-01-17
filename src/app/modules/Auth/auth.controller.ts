import CatchAsync from "../../utils/catchAsync";
import { AuthServices } from "./auth.service";


const createAccount = CatchAsync(async(req, res)=>{
    const result = await AuthServices.createAccountIntoDB(req.body);

    res.status(200).json({
        success: true,
        message: 'Account created successfully',
        data: result
    })
})

const LoginAccount = CatchAsync(async (req, res) => {
    const result = await AuthServices.loginAccount(req.body);
  
    res.status(200).json({
      success: true,
      message: "User Logged in Successfully",
      data: result,
    });
  });

export const AuthControllers = {
    createAccount,
    LoginAccount
}