import { crawlPage } from './crawl.js'
import { crawlSiteAsync } from './crawl.js'

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

    console.log("---------- REPORT ----------")
    for (const page in pages) {
        console.log(`Found ${pages[page]} internal links to ${page}`)
    }
}
main()
