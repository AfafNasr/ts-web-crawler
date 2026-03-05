import { crawlPage } from './crawl.js'
import { crawlSiteAsync } from './crawl.js'

async function main() {
  const args = process.argv.slice(2)

  if (args.length !== 1) {
    console.log("no website provided")
    process.exit(1)
  }

  const baseURL = args[0]
  const pages = await crawlSiteAsync(baseURL, 5)

  console.log("Results:", pages)


}

main()
