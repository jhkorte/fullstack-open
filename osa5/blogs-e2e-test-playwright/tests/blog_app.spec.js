const { test, expect } = require('@playwright/test')

describe('Blog app', () => {
  test('front page can be opened', async ({ page }) => {
    await page.goto('http://localhost:5173')

    //TODO
    const locator = page.getByText('The Bloglist')
    await expect(locator).toBeVisible()
  })

  test('user can log in', async ({ page }) => {
    await page.goto('http://localhost:5173')

    await page.getByRole('button', {name: 'Username'}).click()
  })

})
