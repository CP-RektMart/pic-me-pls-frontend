import { Given, Then, When } from '@cucumber/cucumber'
import { Browser, Page, chromium, expect } from '@playwright/test'

let browser: Browser
let page: Page

Given('I am on the homepage for filter', async () => {
  browser = await chromium.launch()
  page = await browser.newPage()
  await page.goto('http://localhost:3000/')
})

When('I select {string} from the category filter', async (category: string) => {
  await page.getByTestId('filter-button').click()
  await page.getByTestId('category-filter').click()
  await page.getByRole('option', { name: category }).click()
})

When('I click the search button for filter', async () => {
  await page.getByTestId('search-button').click()
})

When(
  'there are no packages available in {string} category',
  async (category: string) => {
    const packageCategories = await page
      .getByTestId(`package-category-${category}`)
      .all()
    expect(packageCategories.length).toBe(0)
  }
)

Then(
  'I should see only packages related to {string}',
  async (category: string) => {
    const packageCategories = await page
      .getByTestId(`package-category-${category}`)
      .all()
    expect(packageCategories.length).toBeGreaterThan(0)

    for (const element of packageCategories) {
      const text = await element.textContent()
      await expect(text).toContain(category)
    }
  }
)

Then(
  'I should see a message "No packages found" for filter results',
  async () => {
    const message = await page.getByText('No packages')
    await expect(message).toBeVisible()
  }
)
