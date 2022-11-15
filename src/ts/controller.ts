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
  sourceUrl: string,
  image: string,
  servings: number,
  cookingTime: number,
  ingredients: object[]
}

const FORKIFY_LINK = `https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886?key=${import.meta.env.FORKIFY_API_KEY}`

const showRecipe = async function (link: string): Promise<recipeType> {
  try {
    const res: Response = await fetch(link)

    const data: resDataType = await res.json()
    if (!res.ok) throw new Error(`${data.message} (${res.status})`)

    let recipe = data.data.recipe
    console.log(recipe)
    return recipe
  } catch (err) {
    throw (err)
  }
}

showRecipe(FORKIFY_LINK)

export { FORKIFY_LINK, showRecipe }