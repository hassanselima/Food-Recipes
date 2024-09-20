const cards = document.getElementById("cards");
const recipeName = document.getElementById("recipeName");
const sidebar = document.querySelector(".sidebar");
const icon = document.querySelector(".icon");
const recipesList = document.querySelectorAll(".recipe");
let recipes = [];

icon.addEventListener("click", function () {
  sidebar.classList.toggle("open");
});
document.addEventListener("DOMContentLoaded", () => getRecipes("pizza"));

async function getRecipes(cat) {
  let response = await fetch(
    `https://forkify-api.herokuapp.com/api/search?q=${cat}`
  );
  if (response.ok) {
    let dataJson = await response.json();
    recipes = dataJson.recipes;
    recipeName.innerHTML = cat.toUpperCase();
    displayRecipes();
    const titles = document.querySelectorAll(".title");
    handleTitle(titles);
  }
}

function handleTitle(titles) {
  titles.forEach((ele) => {
    ele.addEventListener("mouseover", (e) => {
      ele.style.height = `${e.target.scrollHeight}px`;
    });
    ele.addEventListener("mouseleave", (e) => {
      ele.style.height = `25px`;
    });
  });
}

recipesList.forEach((ele) => {
  ele.addEventListener("click", () => {
    recipesList.forEach((item) => item.classList.remove("active"));
    ele.classList.add("active");
    let recipeName = ele.getAttribute("data-name");
    console.log(recipeName);
    getRecipes(recipeName);
  });
});

function displayRecipes() {
  let cartona = ``;
  for (let i = 0; i < recipes.length; i++) {
    cartona += `<div class="card border-0 p-3 bg-transparent col">
          <div class="shadow rounded-2">
            <a
              href="${recipes[i].source_url}"
              target="_blank"
            >
              <div class="img">
                <img
                  src="${recipes[i].image_url}"
                  class="card-img-top"
                  alt="recipe image"
                />
                <div class="overlay rounded-2">
                  <p class="publisher">${recipes[i].publisher}</p>
                </div>
              </div>
            </a>
            <div class="card-body bg-white text-center rounded-bottom-2">
              <h5 class="card-title title fs-5">${recipes[i].title}</h5>
              <p class="card-text fs-5"><strong>Rank: </strong>${recipes[i].social_rank}</p>
            </div>
          </div>
        </div>`;
  }
  cards.innerHTML = cartona;
}
