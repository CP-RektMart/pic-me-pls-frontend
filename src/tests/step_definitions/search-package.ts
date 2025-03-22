import { Given, Then, When } from '@cucumber/cucumber'
import { Browser, Page, chromium, expect } from '@playwright/test'

let browser: Browser
let page: Page

Given('I am on the homepage for search', async () => {
  browser = await chromium.launch()
  page = await browser.newPage()
  await page.goto('http://localhost:3000/')
})

When('I enter {string} in the search bar', async (keyword: string) => {
  await page.getByTestId('search-input').fill(keyword)
})

When('I click the search button', async () => {
  await page.getByTestId('search-button').click()
})

Then('I should see {string} in the search results', async (keyword: string) => {
  const title = page.getByTestId(`package-title-${keyword}`)
  await expect(title).toBeVisible()
})

Then('I should see a message "No packages found"', async () => {
  const message = page.getByText('No packages')
  await expect(message).toBeVisible()
})
