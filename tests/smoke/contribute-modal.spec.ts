import { test, expect } from '@playwright/test'
import { executeCommand, openCommandPalette } from './helpers'

test.describe('Contribute modal', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      const openedUrls: string[] = []
      Object.defineProperty(window, '__bigfootOpenedUrls', {
        configurable: true,
        value: openedUrls,
      })
      window.open = ((url?: string | URL | undefined) => {
        openedUrls.push(String(url ?? ''))
        return null
      }) as typeof window.open

      const copiedBundles: string[] = []
      Object.defineProperty(window, '__bigfootCopiedBundles', {
        configurable: true,
        value: copiedBundles,
      })
      Object.defineProperty(navigator, 'clipboard', {
        configurable: true,
        value: {
          writeText: async (text: string) => {
            copiedBundles.push(text)
          },
        },
      })
    })

    await page.goto('/', { waitUntil: 'domcontentloaded' })
    await expect(page.locator('[data-testid="sidebar-top-nav"]')).toBeVisible({ timeout: 10_000 })
  })

  test('Cmd+K opens Contribute, keyboard actions work, and Escape restores the opener @smoke', async ({ page }) => {
    await openCommandPalette(page)
    await executeCommand(page, 'Contribute')

    await expect(page.getByTestId('feedback-dialog')).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Contribute to Bigfoot' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Check out Bigfoot Capital' })).toBeFocused()

    await page.keyboard.press('Enter')
    await expect.poll(async () => page.evaluate(() => (window as typeof window & { __bigfootOpenedUrls: string[] }).__bigfootOpenedUrls)).toContain('https://bigfoot.capital/')

    await page.keyboard.press('Tab')
    await expect(page.getByRole('button', { name: 'Open Product Board' })).toBeFocused()
    await page.keyboard.press('Enter')
    await expect.poll(async () => page.evaluate(() => (window as typeof window & { __bigfootOpenedUrls: string[] }).__bigfootOpenedUrls)).toContain('https://bigfoot.capital/')

    await page.keyboard.press('Tab')
    await expect(page.getByRole('button', { name: 'Open Discussions' })).toBeFocused()
    await page.keyboard.press('Space')
    await expect.poll(async () => page.evaluate(() => (window as typeof window & { __bigfootOpenedUrls: string[] }).__bigfootOpenedUrls)).toContain('https://github.com/yatstudio/bigfootMD/discussions')

    await page.keyboard.press('Tab')
    await expect(page.getByRole('button', { name: 'Open Pull Requests' })).toBeFocused()
    await page.keyboard.press('Enter')
    await expect.poll(async () => page.evaluate(() => (window as typeof window & { __bigfootOpenedUrls: string[] }).__bigfootOpenedUrls)).toContain('https://github.com/yatstudio/bigfootMD/pulls')

    await page.keyboard.press('Tab')
    await expect(page.getByRole('button', { name: 'Open Contributing Guide' })).toBeFocused()
    await page.keyboard.press('Space')
    await expect.poll(async () => page.evaluate(() => (window as typeof window & { __bigfootOpenedUrls: string[] }).__bigfootOpenedUrls)).toContain('https://github.com/yatstudio/bigfootMD/blob/main/CONTRIBUTING.md')

    await page.keyboard.press('Tab')
    await expect(page.getByRole('button', { name: 'Open GitHub Issues' })).toBeFocused()
    await page.keyboard.press('Enter')
    await expect.poll(async () => page.evaluate(() => (window as typeof window & { __bigfootOpenedUrls: string[] }).__bigfootOpenedUrls)).toContain('https://github.com/yatstudio/bigfootMD/issues')

    await page.keyboard.press('Tab')
    await expect(page.getByRole('button', { name: 'Copy sanitized diagnostics' })).toBeFocused()
    await page.keyboard.press('Space')
    await expect.poll(async () => page.evaluate(() => (window as typeof window & { __bigfootCopiedBundles: string[] }).__bigfootCopiedBundles.length)).toBe(1)

    await page.keyboard.press('Escape')
    await expect(page.getByTestId('feedback-dialog')).not.toBeVisible()
    await expect(page.locator('input[placeholder="Type a command..."]')).toBeVisible()
    await expect(page.locator('input[placeholder="Type a command..."]')).toBeFocused()
  })
})
