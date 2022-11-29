import { expect, describe, it, beforeEach } from "vitest"
import { renderSpinner } from "./controller"
import { JSDOM } from 'jsdom'

let dom: JSDOM
let body: any

describe('test', () => {
    beforeEach(async () => {
        dom = new JSDOM(`<!DOCTYPE html><body><div class='test'><p>Hello world</p></div></body>`, { url: "http://localhost:5173/", });
        body = dom.window.document
    })

    it("Spinner is rendered", () => {
        const recipeSelector = body.querySelector('.test')
        renderSpinner(recipeSelector)
        const recipeSpinner = recipeSelector?.querySelector('.spinner')

        expect(recipeSpinner).toBeTruthy()
    })
})