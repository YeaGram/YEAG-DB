import TMDB_Handler from "/src/TMDB/TMDB-handler.js";
import TMDB_Config from "/src/TMDB/TMDB-config.js";

const container = document.querySelector(".CardContainer");

const Discover = async (load, page) => {
  const section = document.createElement("section");
  section.setAttribute("class", "cardpage");
  section.innerHTML = loading();
  container.appendChild(section);
  try {
    const movies = await TMDB_Handler().getDiscover(`page=${page}`);
    section.innerHTML = "";
    RenderDiscover(movies.results, load, section);

    container.appendChild(section);
  } catch (error) {
    console.log(error);
  }
};
Discover();

const BtnMore = document.querySelector("#load-more");
let page = 1;
BtnMore.addEventListener("click", () => {
  page++;
  Discover(true, page);
});

const btnSearch = document.querySelector("#searchBTN");
const inputSearch = document.querySelector("#searchINPUT");

btnSearch.addEventListener("click", async () => {
  const section = document.querySelector(".cardpage");
  const noSection = document.createElement("section");

  section.innerHTML = "";
  section.innerHTML = loading();
  container.appendChild(section);
  BtnMore.remove();

  try {
    const movies = await TMDB_Handler().getSearchMovie(inputSearch.value);
    RenderDiscover(movies.results, null, section);

    container.innerHTML = "";
    section.innerHTML = "";

    container.appendChild(section);
    inputSearch.value = "";
  } catch (err) {
    if (err == "Error: query must be provided")
      section.innerHTML = Error("EMPTY SEARCH");
    if (err == "Error: Data Not Found") section.innerHTML = Error("NOT FOUND!");
    console.log(err);
  }
});

const Detail = (() => {
  document.addEventListener("click", async function (e) {
    const MovieId = e.target.dataset.movieid;
    const SeeDetails = e.target.textContent;
    if (SeeDetails === "see details" && MovieId)
      try {
        const Movie = await TMDB_Handler().getDetail(MovieId);
      } catch (error) {
        console.log(error);
      }
  });
})();

function details(url, id) {
  return `<div class="itemMore" ><a data-MovieID="${id}" href="${
    url ? url : "#"
  }">see details</a></div>`;
}
function Error(val) {
  return `
  <div class="error">  
  <div class="errorWrapper">
      <svg viewBox="0 0 319 383" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M164.821 12.2707C109.134 -16.0353 40.5766 6.31385 12.2707 62.001C-16.0353 117.688 6.31385 186.245 62.001 214.551C87.2571 227.389 115.12 229.698 140.715 223.312L143.74 232.591L134.244 251.273L176.87 382.03L220.456 367.822L177.83 237.064L159.148 227.568L156.123 218.289C180.564 208.363 201.714 190.077 214.551 164.821C242.857 109.134 220.508 40.5766 164.821 12.2707ZM150.133 41.1661C190.203 61.5338 206.023 110.061 185.655 150.131C165.287 190.201 116.76 206.02 76.6905 185.652C36.6206 165.285 20.8011 116.758 41.1688 76.6878C61.5365 36.6179 110.063 20.7984 150.133 41.1661Z" fill="black"/>
          <path d="M318.629 92.3195L273.864 218.939L222.45 203.562L253.145 72.734L318.629 92.3195ZM225.153 289.733C214.69 286.604 207.124 281.289 202.455 273.788C197.786 266.287 196.699 258.282 199.193 249.773C201.74 241.083 206.993 234.876 214.952 231.152C222.964 227.247 232.202 226.859 242.665 229.988C252.947 233.064 260.397 238.442 265.012 246.124C269.681 253.625 270.742 261.721 268.195 270.411C265.701 278.92 260.474 285.037 252.515 288.761C244.556 292.485 235.436 292.809 225.153 289.733Z" fill="black"/>
    </svg>   
    <p>${val}</p>
    <div>
  </div>`;
}
function loading() {
  return `<div class="loadingView">
                <figure>
                
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M512 256c0 141.4-114.6 256-256 256S0 397.4 0 256S114.6 0 256 0S512 114.6 512 256zM256 224c17.7 0 32 14.3 32 32s-14.3 32-32 32s-32-14.3-32-32s14.3-32 32-32zm-96 32c0 53 43 96 96 96s96-43 96-96s-43-96-96-96s-96 43-96 96zM96 240c0-35 17.5-71.1 45.2-98.8S205 96 240 96c8.8 0 16-7.2 16-16s-7.2-16-16-16c-45.4 0-89.2 22.3-121.5 54.5S64 194.6 64 240c0 8.8 7.2 16 16 16s16-7.2 16-16z"/></svg>                
                
                
                </figure>
          </div>`;
}
function RenderImages(images, path, type) {
  if (type === "poster")
    return `
    <picture>    
      <source media="(min-width:650px)" srcset="${images.secure_base_url}${images.poster_sizes[4]}${path.poster_path} 2x">
      <source srcset="${images.secure_base_url}${images.poster_sizes[3]}${path.poster_path} ">

      <img src="${images.secure_base_url}${images.poster_sizes[3]}${path.poster_path}" alt="${path.title}" loading="lazy"/>
    </picture>`;
}

async function RenderDiscover(data, more, target) {
  const config = await TMDB_Config();
  const images = config.images;

  data.map((item) => {
    target.innerHTML += ` 
        <div class="Card">
            <div class="CardWrapper">
                ${RenderImages(images, item, "poster")}
                <div class="details">
                    <h3>${item.title}</h3>
                    <div class="descriptionContainer">
                        <p>${item.overview}</p>
                    </div>
                    ${details(undefined, item.id)}
                </div>
                <span class="title">${item.title}</span>
            </div>
            <div class="additionalDetails">
              <p> <span class="additionalDetailsProperty">Release :</span> ${
                item.release_date
              }</p>
            </div>
        </div>`;
  });
}
