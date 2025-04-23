import { expect, test } from '@playwright/test'

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/')

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/)
})

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/')

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click()

  // Expects page to have a heading with the name of Installation.
  await expect(
    page.getByRole('heading', { name: 'Installation' })
  ).toBeVisible()
})

test('login', async ({ page }) => {
  await page.goto('http://localhost:3000/')

  // login
  // click login button
  await page.getByRole('button', { name: 'Login' }).click()

  // login
  await expect(page).toHaveURL('http://localhost:3000/login')
  await page.getByRole('button', { name: 'Login with Google' }).click()
  await page.getByLabel('Email or phone').click()
  await page
    .getByRole('textbox', { name: 'Email' })
    .fill('chanatip.kowsurat@gmail.com')
  await page.getByRole('button', { name: 'Next' }).click()
  await page.waitForTimeout(2000)

  await expect(page).toHaveURL(
    'https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?response_type=code&client_id=817565358406-caqn2b5f4e6fdp8kv5ia3jk34ip4t3t7.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fauth%2Fcallback%2Fgoogle&code_challenge=lZvBWASo1Gxjw3QNs46kUjA5W0u7KVD0Mp6fNSWghdM&code_challenge_method=S256&scope=openid%20profile%20email&service=lso&o2v=2&ddm=1&flowName=GeneralOAuthFlow'
  )
})

//   // await page.getByRole('button', { name: 'Login' }).click()
// })

test('create review', async ({ page }) => {
  const comment = 'test review from automation'

  await page.goto('http://localhost:3000/')

  await page.getByRole('button', { name: 'Quotation' }).click()

  await page.getByRole('button', { name: 'Quotation' }).click()
  await expect(page).toHaveURL('http://localhost:3000/quotation/5')

  // filling review info
  await page.getByRole('button', { name: 'Rating' }).click()
  await page.getByRole('textbox', { name: 'Comment' }).click()
  await page.getByRole('textbox', { name: 'Comment' }).fill(comment)
  await page.getByRole('button', { name: 'Send' }).click()

  // check result
  await page.goto('http://localhost:3000/quotation/5')
  await expect(page.getByText(comment)).toBeVisible()
})

test('create report', async ({ page }) => {
  const reportName = 'test report from automation'
  const reportDescription = 'simple description'

  await page.goto('http://localhost:3000/')

  await page.getByRole('button', { name: 'Quotation' }).click()

  await page.getByRole('button', { name: 'Quotation' }).click()
  await expect(page).toHaveURL('http://localhost:3000/quotation/5')

  // filling report info
  await page.getByRole('textbox', { name: 'Report' }).click()
  await page.getByRole('textbox', { name: 'Report' }).fill(reportName)
  await page.getByRole('textbox', { name: 'Description' }).click()
  await page
    .getByRole('textbox', { name: 'Description' })
    .fill(reportDescription)
  await page.getByRole('button', { name: 'Submit' }).click()

  // check result
  await expect(page).toHaveURL('http://localhost:3000/report')
  await expect(page.getByText(reportName)).toBeVisible()
  await expect(page.getByText(reportDescription)).toBeVisible()
})
