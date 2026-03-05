import fs from 'fs'
import path from 'path'
import { ExtractedPageData } from './crawl_utils.js'

export function writeJSONReport(
  pageData: Record<string, ExtractedPageData>,
  filename = "report.json"
): void {
  const sorted = Object.values(pageData).sort((a, b) => a.url.localeCompare(b.url))

  const jsonContent = JSON.stringify(sorted, null, 2)

  const fullPath = path.resolve(process.cwd(), filename)

  try {
    fs.writeFileSync(fullPath, jsonContent)
    console.log(`Report successfully written to: ${fullPath}`)
  } catch (err) {
    console.error(`Failed to write report: ${err}`)
  }
}
