import CatchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AccountServices } from "./account.service";

const acountStatus = CatchAsync(async (req, res) => {
  const { accountId } = req.user;
  const result = await AccountServices.acountStatus(accountId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Got Account status Successfully",
    data: result,
  });
});

const recentAddedData = CatchAsync(async (req, res) => {

  const result = await AccountServices.recentAddedData();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Got Recent added data Successfully",
    data: result,
  });
});

export const AccountControllers = {
  acountStatus,
  recentAddedData
};
