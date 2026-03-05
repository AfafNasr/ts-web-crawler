import { crawlPage } from './crawl.js'

async function main() {
  const args = process.argv.slice(2)

  if (args.length !== 1) {
    console.log("no website provided")
    process.exit(1)
  }

  const baseURL = args[0]

  console.log(`starting crawl of ${baseURL}`)
  
  const pages = await crawlPage(baseURL, baseURL, {})

  console.log("---------- CRAWL RESULTS ----------")
  for (const page in pages) {
    console.log(`${page}: ${pages[page]}`)
  }
}

main()
