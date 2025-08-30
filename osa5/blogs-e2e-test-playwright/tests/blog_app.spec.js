const { test, expect, describe, beforeEach } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Jaakko Hyvönen',
        username: 'jakessu',
        password: 'mieoonturust'
      }
    })
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Mikko Mikkonen',
        username: 'theotheruser',
        password: 'mieoonturust'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('front page can be opened', async ({ page }) => {
    const locator = page.getByText('The Bloglist')
    await expect(locator).toBeVisible()
  })

  test('login form is shown', async ({ page }) => {
    await expect(page.getByLabel('Username')).toBeVisible()
    await expect(page.getByLabel('Password')).toBeVisible()
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible()
  })

  describe('Logging in', () => {
    test('successful login is successful', async ({ page }) => {
      await page.getByLabel('Username').fill('jakessu')
      await page.getByLabel('Password').fill('mieoonturust')
      await page.getByRole('button', { name: 'Login' }).click()

      await expect(page.getByText('Jaakko Hyvönen is logged in')).toBeVisible()
    })

    test('bad login is unsuccessful', async ({ page }) => {
      await page.getByLabel('Username').fill('jakessu123')
      await page.getByLabel('Password').fill('wrongpassword')
      await page.getByRole('button', { name: 'Login' }).click()

      await expect(page.getByText('no user found with these credentials')).toBeVisible()
    })
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

    test('blog can be liked when logged in', async ({ page }) => {
      // Adding a blog first
      await page.getByRole('button', { name: 'Add a new blog' }).click()
      await page.getByLabel('Title').fill('Blog added from test')
      await page.getByLabel('Author').fill('Tester')
      await page.getByLabel('URL').fill('test.com')
      await page.getByRole('button', { name: 'Submit' }).click()

      // Testing like function
      await expect(page.getByText('Blog added from test - Tester -')).toBeVisible()
      await page.getByRole('button', { name: 'Show more' }).click()
      await page.getByRole('button', { name: 'Like!' }).click()
      await page.getByText('Likes: 1').waitFor()
      await page.getByRole('button', { name: 'Like!' }).click()
      await page.getByText('Likes: 2').waitFor()
    })

    test('blog can be deleted by its creator', async ({ page }) => {
      // Adding a blog first
      await page.getByRole('button', { name: 'Add a new blog' }).click()
      await page.getByLabel('Title').fill('Blog added from test')
      await page.getByLabel('Author').fill('Tester')
      await page.getByLabel('URL').fill('test.com')
      await page.getByRole('button', { name: 'Submit' }).click()

      // Deleting the blog
      await expect(page.getByText('Blog added from test - Tester -')).toBeVisible()
      await page.getByRole('button', { name: 'Show more' }).click()

      page.once('dialog', async (dialog) => {
        expect(dialog.type()).toBe('confirm')
        expect(dialog.message()).toContain('Delete "Blog added from test" by Tester?')
        await dialog.accept()
      })

      await page.getByRole('button', { name: 'Delete' }).click()

      await expect(page.getByText('Blog added from test - Tester -')).toBeHidden()
    })

    test('only the user that added the blog sees the delete button', async ({ page }) => {
      // Currently logged in as jakessu
      // Jakessu adds a blog
      await page.getByRole('button', { name: 'Add a new blog' }).click()
      await page.getByLabel('Title').fill('Blog added by jakessu')
      await page.getByLabel('Author').fill('jakessu')
      await page.getByLabel('URL').fill('test.com')
      await page.getByRole('button', { name: 'Submit' }).click()

      // Jakessu sees the delete button
      await expect(page.getByText('Blog added by jakessu - jakessu -')).toBeVisible()
      await page.getByRole('button', { name: 'Show more' }).click()
      await expect(page.getByRole('button', { name: 'Delete' })).toBeVisible()

      // Jakesssu logging out
      await page.getByRole('button', { name: 'Log out' }).click()

      // Other user logs in
      await page.getByLabel('Username').fill('theotheruser')
      await page.getByLabel('Password').fill('mieoonturust')
      await page.getByRole('button', { name: 'Login' }).click()
      await expect(page.getByText('Mikko Mikkonen is logged in')).toBeVisible()

      // Other user doesnt see the delete button
      await expect(page.getByText('Blog added by jakessu - jakessu -')).toBeVisible()
      await page.getByRole('button', { name: 'Show more' }).click()
      await expect(page.getByRole('button', { name: 'Delete' })).toBeHidden()
    })

    test('blogs are sorted in order of likes', async ({ page }) => {
      // Add two blogs
      await page.getByRole('button', { name: 'Add a new blog' }).click()
      await page.getByLabel('Title').fill('First blog')
      await page.getByLabel('Author').fill('jakessu')
      await page.getByLabel('URL').fill('test.com')
      await page.getByRole('button', { name: 'Submit' }).click()

      await page.getByText('First blog - jakessu -').waitFor()

      await page.getByRole('button', { name: 'Add a new blog' }).click()
      await page.getByLabel('Title').fill('Second blog')
      await page.getByLabel('Author').fill('jakessu')
      await page.getByLabel('URL').fill('test.com')
      await page.getByRole('button', { name: 'Submit' }).click()

      await page.getByText('Second blog - jakessu -').waitFor()
      // Two blogs have now been added

      // Check that the blogs exist
      await expect(page.getByText('First blog - jakessu -')).toBeVisible()
      await expect(page.getByText('Second blog - jakessu -')).toBeVisible()

      // Check that the first blog is 'First blog' and second blog is 'Second blog'
      let allBlogs = await page.locator('.blog').allTextContents()
      expect(allBlogs[0]).toContain('First blog')
      expect(allBlogs[1]).toContain('Second blog')
      console.log('allblogs, first time:', allBlogs)

      // Like the first blog once
      await page.locator('text=First blog - jakessu -').locator('button:has-text("Show more")').click()
      await page.locator('text=Title: First blog').locator('button:has-text("Like!")').click()
      await page.getByText('Likes: 1').waitFor()

      // Like the second blog three times
      await page.locator('text=Second blog - jakessu -').locator('button:has-text("Show more")').click()
      await page.locator('text=Title: Second blog').locator('button:has-text("Like!")').click()
      await page.locator('text=Title: Second blog').locator('text=Likes: 1').waitFor()
      await page.locator('text=Title: Second blog').locator('button:has-text("Like!")').click()
      await page.locator('text=Title: Second blog').locator('text=Likes: 2').waitFor()
      await page.locator('text=Title: Second blog').locator('button:has-text("Like!")').click()
      await page.locator('text=Title: Second blog').locator('text=Likes: 3').waitFor()

      // After the second blog has more likes, check that the first blog is 'Second blog' and second blog is 'First blog'
      allBlogs = await page.locator('.blog').allTextContents()
      expect(allBlogs[0]).toContain('Second blog')
      expect(allBlogs[1]).toContain('First blog')
      console.log('allblogs, second time:', allBlogs)
      // If this passes, it means that the order of the blogs is based on the amount of likes, thus the sorting by likes is owrking

    })

  })

})
