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

const favoriteData = CatchAsync(async (req, res) => {
  const result = await AccountServices.favoriteData();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Got Favorites data Successfully",
    data: result,
  });
});

const filterByDate = CatchAsync(async (req, res) => {
  const { date } = req.query;
  const result = await AccountServices.filterByDate(date);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Filter By Date Successfully",
    data: result,
  });
});

export const AccountControllers = {
  acountStatus,
  recentAddedData,
  favoriteData,
  filterByDate,
};
