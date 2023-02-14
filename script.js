const APIURL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
  "https://api.themoviedb.org/3/search/movie?&api_key=41aa51858ac3c33f6cb6ef7fb9434dfc&query=";

const movieBox = document.querySelector(".movie-box");
let i = 2;

window.addEventListener("scroll", () => {
  // console.log(window.scrollY) //scrolled from top
  // console.log(window.innerHeight) //visible part of screen
  if (
    window.scrollY + window.innerHeight >=
    document.documentElement.scrollHeight - 150
  ) {
    // console.log(`${APIURL}${i}`)
    let str = `${APIURL}${i}`;
    // console.log(str);
    getMovies(str, 1);
    i++;
  }
});

const getMovies = async (api, show) => {
  const respones = await fetch(api);
  const data = await respones.json();
  const finalData = data.results.filter((item) => {
    return item.adult == false;
  });
  // console.log(finalData);
  showMovies(finalData, show);
  // console.log(data.results)
};

const showMovies = (data, show) => {
  if (show != 1) {
    movieBox.innerHTML = "";
  }
  data.forEach((item) => {
    // console.log(item)
    const box = document.createElement("div");
    box.classList.add("box");
    box.innerHTML = `
            <div class="box-img">
                <img src="${IMGPATH + item.poster_path}"
                        alt="" srcset="">
                </div>
                <div class="content">
                    <div class="title">
                        <h2>${item.title}</h2>
                        <h4><Samps>${item.vote_average}</Samp></h4>
                    </div>

                    <div class="overview">
                        <h3>Overview : </h3>
                        <p>${item.overview}</p>
                    </div>
                </div>
            `;
    movieBox.appendChild(box);
  });
};

document.querySelector("#serach").addEventListener("keyup", (e) => {
  if (e.target.value != "") {
    getMovies(SEARCHAPI + e.target.value);
    // console.log(e.target.value)
  } else {
    getMovies(APIURL, 0);
  }
});

getMovies(APIURL.concat("1"), 1);
