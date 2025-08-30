const { test, expect, describe, beforeEach } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173')
  })

  test('front page can be opened', async ({ page }) => {
    const locator = page.getByText('The Bloglist')
    await expect(locator).toBeVisible()
  })

  test('successful login is successful', async ({ page }) => {
    await page.goto('http://localhost:5173')

    await page.getByLabel('Username').fill('jakessu')
    await page.getByLabel('Password').fill('mieoonturust')
    await page.getByRole('button', { name: 'Login' }).click()

    await expect(page.getByText('Jaakko Hyvönen is logged in')).toBeVisible()
  })

})
