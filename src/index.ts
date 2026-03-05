import { crawlPage } from './crawl.js'
import { crawlSiteAsync } from './crawl.js'
import { writeJSONReport } from './report.js'

async function main() {
    const args = process.argv.slice(2)

    if (args.length < 3) {
        console.log("Usage: npm run start <URL> <maxConcurrency> <maxPages>")
        process.exit(1)
    }

    const baseURL = args[0]
    const maxConcurrency = parseInt(args[1])
    const maxPages = parseInt(args[2])

    console.log(`Starting crawl at ${baseURL} with concurrency ${maxConcurrency} and limit ${maxPages}`)

    const pages = await crawlSiteAsync(baseURL, maxConcurrency, maxPages)
    console.log("Finished crawling.")
    writeJSONReport(pages, "report.json")
    const firstPage = Object.values(pages)[0]

    if (firstPage) {
    console.log(`First page record: ${firstPage["url"]} - ${firstPage["heading"]}`)
    }
 console.log("---------- FINAL REPORT ----------")
for (const url in pages) {
    const pageData = pages[url]
    console.log(`URL: ${url}`)
    console.log(`- Title: ${pageData.heading}`)
    console.log(`- Links found on this page: ${pageData.outgoing_links.length}`)
    console.log("----------------------------------")
}    
}
main()
