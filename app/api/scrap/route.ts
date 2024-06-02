import { NextResponse } from 'next/server'
import { chromium } from 'playwright'

export async function GET() {
  try {
    const browser = await chromium.launch()
    const context = await browser.newContext()
    const page = await context.newPage()

    await page.goto('https://prtimes.jp/main/html/searchrlp/company_id/94499')

    const content = await page.content()

    const pressRelease = await page.$$eval(
      'ul[data-testid="press-release-list"] > li',
      lis => lis.map(li => li.textContent?.trim())
    )

    await browser.close()
    
    console.log('Scraped Data:', pressRelease)

    return NextResponse.json({ data: pressRelease })
  } catch (error) {
    console.error('error:', error)
    return NextResponse.json({ message: 'error', error: error.message }, { status: 500 })
  }
}
