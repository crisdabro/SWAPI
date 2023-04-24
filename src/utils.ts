export const getIdFromUrl = (url: string) => {
  const urlParts = url.split("/");
  return Number(urlParts[urlParts.length - 2]);
};
