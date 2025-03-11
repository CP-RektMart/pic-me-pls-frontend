import { Given, Then, When } from '@cucumber/cucumber'
import { Browser, Page, chromium, expect } from '@playwright/test'

let browser: Browser
let page: Page

Given('I am on the Playwright website', async () => {
  browser = await chromium.launch()
  page = await browser.newPage()
  await page.goto('https://playwright.dev/')
})

When('I look at the page', async () => {
  await page.waitForSelector('text=Get started')
})

Then('I should see the Playwright title', async () => {
  await expect(page).toHaveTitle(/Playwright/)
  await browser.close()
})
