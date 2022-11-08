import TMDB_Settings from "./TMDB-settings.js";

export default function TMDB_Config() {
  const res = fetch(
    `https://api.themoviedb.org/3/configuration`,
    TMDB_Settings()
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (!data.success && data.success !== undefined)
        throw new Error(data.errors || data.status_message);
      if (data.total_results < 1) throw new Error("Data Not Found");

      return data;
    });
  return res;
}
