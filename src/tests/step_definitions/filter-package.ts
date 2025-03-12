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
  console.log('category:', category)
  await page.getByTestId('filter-button').click()
  await page.getByTestId('category-filter').click()
  await page.click(`[data-value="${category}"]`)
})

When('I click the search button for filter', async () => {
  await page.getByTestId('search-button').click()
})

When(
  'there are no packages available in {string} category',
  async (category: string) => {
    const packageCatergory = await page.getByTestId('package-category').all()
    packageCatergory.forEach(async (element) => {
      const text = await element.textContent()
      console.log('text:', text)

      await expect(text).not.toContain(category)
    })
  }
)

Then(
  'I should see only packages related to {string}',
  async (category: string) => {
    const packageCatergory = await page.getByTestId('package-category').all()
    packageCatergory.forEach(async (element) => {
      const text = await element.textContent()
      console.log('text:', text)
      await expect(text).toContain(category)
    })
  }
)

Then(
  'I should see a message "No packages found" for filter results',
  async () => {
    const message = await page.getByText('No packages found')
    await expect(message).toBeVisible()
  }
)
