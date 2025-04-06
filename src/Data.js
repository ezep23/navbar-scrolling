import data from "../data/data.json" with { type: "json" };

export const loadData = () => {
  const db = JSON.parse(localStorage.getItem("data"));

  if (!db) {
    localStorage.setItem("data", JSON.stringify(data));
  }
};