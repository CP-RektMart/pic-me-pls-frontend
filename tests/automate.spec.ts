import { chromium, expect, test } from '@playwright/test'

const EMAIL = 'chanatip.kowsurat@gmail.com'
const REPORT_NAME = 'test report from automation at 12 pm'
const REPORT_DESCRIPTION = 'simple descriptionnn'
const REVIEW_STARS = 4
const REVIEW_COMMENT = 'test review from automation at 12 pm'

test('create report', async () => {
  const browser = await chromium.launch({
    headless: false,
    args: [
      '--disable-dev-shm-usage',
      '--disable-blink-features=AutomationControlled',
    ],
  })
  const context = await browser.newContext({})
  const page = await context.newPage()

  // await page.setDefaultNavigationTimeout(0)
  await page.goto('http://localhost:3000/')
  await page.getByRole('button', { name: 'Login' }).click()

  // login
  await expect(page).toHaveURL('http://localhost:3000/login')
  await page.getByRole('button', { name: 'Login with Google' }).click()
  await page.getByLabel('Email or phone').click()
  await page.getByRole('textbox', { name: 'Email' }).fill(EMAIL)
  await page.getByRole('button', { name: 'Next' }).click()

  await page.waitForURL('http://localhost:3000/')

  test.setTimeout(60000)
  // config
  await page.goto('http://localhost:3000/')

  // go to quotation page
  await page.getByRole('button', { name: 'Quotation' }).click()
  await page.click("a[href='/quotation/5']")
  await expect(page).toHaveURL('http://localhost:3000/quotation/5')

  // filling report info
  await page.getByRole('button', { name: 'Report issue' }).click()
  await page.getByRole('textbox', { name: 'Title' }).fill(REPORT_NAME)
  await page.getByRole('textbox', { name: 'Description' }).click()
  await page
    .getByRole('textbox', { name: 'Description' })
    .fill(REPORT_DESCRIPTION)
  await page.getByRole('button', { name: 'Submit' }).click()

  // check result
  await page.goto('http://localhost:3000/report')
  const row = page.locator('tr', { hasText: REPORT_NAME })
  await row.getByRole('button', { name: 'View' }).click()

  const dialog = page.locator('[role="dialog"]')
  await expect(dialog.getByText(REPORT_NAME)).toBeVisible()
  await expect(dialog.getByText(REPORT_DESCRIPTION)).toBeVisible()
})

test('create review', async () => {
  const browser = await chromium.launch({
    headless: false,
    args: [
      '--disable-dev-shm-usage',
      '--disable-blink-features=AutomationControlled',
    ],
  })
  const context = await browser.newContext({})
  const page = await context.newPage()

  // await page.setDefaultNavigationTimeout(0)
  await page.goto('http://localhost:3000/')
  await page.getByRole('button', { name: 'Login' }).click()

  // login
  await expect(page).toHaveURL('http://localhost:3000/login')
  await page.getByRole('button', { name: 'Login with Google' }).click()
  await page.getByLabel('Email or phone').click()
  await page.getByRole('textbox', { name: 'Email' }).fill(EMAIL)
  await page.getByRole('button', { name: 'Next' }).click()

  await page.waitForURL('http://localhost:3000/')

  test.setTimeout(120000)
  await page.goto('http://localhost:3000/')

  // go to quotation page
  await page.getByRole('button', { name: 'Quotation' }).click()
  await page.click("a[href='/quotation/5']")
  await expect(page).toHaveURL('http://localhost:3000/quotation/5')

  await page.getByTestId(`star-${REVIEW_STARS}`).click()

  // fill comment
  const commentBox = page.getByPlaceholder('Type your message here.')
  await commentBox.fill(REVIEW_COMMENT)
  await page.getByRole('button', { name: 'Send' }).click()

  // check result
  await page.goto('http://localhost:3000/quotation/5')
  await expect(page.getByText(REVIEW_COMMENT)).toBeVisible()

  await page.close()
})
