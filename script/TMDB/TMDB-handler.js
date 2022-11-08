import TMDB_Settings from "./TMDB-settings.js"; //Discover

export default function TMDB_Handler() {
  const loading = () => {
    console.log("loading");
  };
  function getDiscover(...params) {
    const res = fetch(
      `https://api.themoviedb.org/3/discover/movie?${params ? params : ""}`,
      TMDB_Settings()
    )
      .finally(loading)
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

  function getDetail(movie_id, ...params) {
    const res = fetch(
      `https://api.themoviedb.org/3/movie/${movie_id}`,
      TMDB_Settings()
    )
      .finally(loading)
      .then((res) => {
        console.log("Data Diperoleh siap diolah!");
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

  function getSearchMovie(movie_query, ...params) {
    const res = fetch(
      `https://api.themoviedb.org/3/search/movie?query=${movie_query}`,
      TMDB_Settings()
    )
      .finally("load search")
      .then((res) => {
        console.log("done search");
        return res.json();
      })
      .then((data) => {
        if (!data.success && data.success !== undefined)
          throw new Error(data.errors, data.status_message);
        if (data.total_results < 1) throw new Error("Data Not Found");
        return data;
      });
    return res;
  }

  return {
    getDiscover,
    getDetail,
    getSearchMovie,
  };
}
