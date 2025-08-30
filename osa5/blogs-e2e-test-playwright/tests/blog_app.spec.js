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
    await page.getByLabel('Username').fill('jakessu')
    await page.getByLabel('Password').fill('mieoonturust')
    await page.getByRole('button', { name: 'Login' }).click()

    await expect(page.getByText('Jaakko Hyvönen is logged in')).toBeVisible()
  })

  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      await page.getByLabel('Username').fill('jakessu')
      await page.getByLabel('Password').fill('mieoonturust')
      await page.getByRole('button', { name: 'Login' }).click()
    })

    test('a new blog can be added', async ({ page }) => {
      await page.getByRole('button', { name: 'Add a new blog' }).click()
      await page.getByLabel('Title').fill('Blog added from test')
      await page.getByLabel('Author').fill('Tester')
      await page.getByLabel('URL').fill('test.com')
      await page.getByRole('button', { name: 'Submit' }).click()

      await expect(page.getByText('Blog added from test - Tester -')).toBeVisible()
    })
  })

})
