/* eslint-disable @typescript-eslint/no-explicit-any */

const calculateStorageUsage = async (
  model: any,
  userId: string
): Promise<number> => {
  const data = await model.find({ userId });
  const jsonData = JSON.stringify(data);
  const sizeInBytes = Buffer.byteLength(jsonData, "utf8");
  return sizeInBytes / 1e9;
};

export default calculateStorageUsage;
