import { expect, describe, it, beforeAll } from "vitest"
import { renderSpinner, showRecipe, FORKIFY_LINK, recipeContainer } from './controller'

// TODO: make DOM element work in tests

describe('test', () => {
    beforeAll(() => {
        Object.defineProperty(global, 'document', {});
    })
    it("test some", async () => {
        const div = document.createElement('div');
        div.classList.add('recipe');
        document.body.appendChild(div);
        await expect(renderSpinner(recipeContainer)).toBeCalled()
    })
})