type resDataType = {
  status: string,
  data: recipeObjectType,
  message?: string
}

type recipeObjectType = {
  recipe: recipeType
}

type recipeType = {
  id: string,
  title: string,
  publisher: string,
  source_url: string,
  image_url: string,
  servings: number,
  cooking_time: number,
  ingredients: ingridientsType[]
}

type ingridientsType = {
  quantity: number,
  unit: string,
  description: string,
}

const recipeContainer = document.querySelector('.recipe') as HTMLBodyElement

function renderSpinner(parentEl: HTMLBodyElement): void {
  const markup = `
  <div class="spinner">
    <svg>
      <use href="src/img/icons.svg#icon-loader"></use>
    </svg>
  </div>`
  parentEl.innerHTML = ''
  parentEl.insertAdjacentHTML('afterbegin', markup)

}

const showRecipe = async function (): Promise<void> {
  try {
    const hashId = window.location.hash.slice(1)
    if (!hashId) return

    // 1. Load recipe
    renderSpinner(recipeContainer)

    const res: Response = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${hashId}?key=${import.meta.env.FORKIFY_API_KEY}`)

    const data: resDataType = await res.json()

    if (!res.ok) throw new Error(`${data.message} (${res.status})`)

    let recipe = data.data.recipe

    // 2. Rendering Recipe
    const markup = `
    <figure class="recipe__fig">
      <img src="${recipe.image_url}" alt="${recipe.title}" crossOrigin = "anonymous"  class="recipe__img" />
      <h1 class="recipe__title">
        <span>${recipe.title}</span>
      </h1>
    </figure>

    <div class="recipe__details">
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="src/img/icons.svg#icon-clock"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--minutes">${recipe.cooking_time}</span>
        <span class="recipe__info-text">minutes</span>
      </div>
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="src/img/icons.svg#icon-users"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
        <span class="recipe__info-text">servings</span>

        <div class="recipe__info-buttons">
          <button class="btn--tiny btn--increase-servings">
            <svg>
              <use href="src/img/icons.svg#icon-minus-circle"></use>
            </svg>
          </button>
          <button class="btn--tiny btn--increase-servings">
            <svg>
              <use href="src/img/icons.svg#icon-plus-circle"></use>
            </svg>
          </button>
        </div>
      </div>

      <div class="recipe__user-generated">
        <svg>
          <use href="src/img/icons.svg#icon-user"></use>
        </svg>
      </div>
      <button class="btn--round">
        <svg class="">
          <use href="src/img/icons.svg#icon-bookmark-fill"></use>
        </svg>
      </button>
    </div>

    <div class="recipe__ingredients">
      <h2 class="heading--2">Recipe ingredients</h2>
      <ul class="recipe__ingredient-list">
        ${recipe.ingredients.map(ing => {
      return `
        <li class="recipe__ingredient">
          <svg class="recipe__icon">
            <use href="src/img/icons.svg#icon-check"></use>
          </svg>
          <div class="recipe__quantity">${ing.quantity}</div>
          <div class="recipe__description">
            <span class="recipe__unit">${ing.unit}</span>
            ${ing.description}
          </div>
        </li>
        `}).join('')}

      </ul>
    </div>

    <div class="recipe__directions">
      <h2 class="heading--2">How to cook it</h2>
      <p class="recipe__directions-text">
        This recipe was carefully designed and tested by
        <span class="recipe__publisher">${recipe.publisher}</span>. Please check out
        directions at their website.
      </p>
      <a
        class="btn--small recipe__btn"
        href="${recipe.source_url}"
        target="_blank"
      >
        <span>Directions</span>
        <svg class="search__icon">
          <use href="src/img/icons.svg#icon-arrow-right"></use>
        </svg>
      </a>
    </div>`
    recipeContainer.innerHTML = ''
    recipeContainer.insertAdjacentHTML('afterbegin', markup)
  } catch (err) {
    throw (err)
  }
};

['hashchange', 'load'].map(element => window.addEventListener(element, showRecipe))

export { showRecipe, renderSpinner, recipeContainer }