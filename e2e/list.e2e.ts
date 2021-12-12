import { by, device, element, expect } from 'detox'

beforeAll(async () => {
  await device.launchApp()
})

describe('List screen', () => {
  it('initially a list item is visible', async () => {
    await waitFor(element(by.id('loading-indicator')))
      .not.toBeVisible()
      .withTimeout(2000)
    await expect(element(by.id('list-item')).atIndex(0)).toBeVisible()
  })

  it('long press on a list item opens the sneak peek', async () => {
    await element(by.id('list-item')).atIndex(0).longPress()
    await expect(element(by.id('user-sneak-peek-container'))).toBeVisible()
    await expect(element(by.id('user-sneak-peek-card'))).toBeVisible()
  })

  it('tapping on the sneak peak card should not close the sneak peek view', async () => {
    await element(by.id('user-sneak-peek-card')).tap()
    await expect(element(by.id('user-sneak-peek-container'))).toBeVisible()
  })

  it('tapping on the sneak peak container should close the sneak peek view', async () => {
    // tap outside the card
    await element(by.id('user-sneak-peek-container')).tap({ x: 5, y: 5 })
    await expect(element(by.id('user-sneak-peek-container'))).not.toBeVisible()
    await expect(element(by.id('user-sneak-peek-card'))).not.toBeVisible()
  })
})
