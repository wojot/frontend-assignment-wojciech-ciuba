const baseURL = "http://localhost:6010/articles";

export const getArticles = async type => {
  const url = baseURL + "/" + type;

  const response = await fetch(url);
  return await response.json();
};
