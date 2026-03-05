import { getHTML } from './crawl.js'

async function main() {
    const args = process.argv.slice(2)

    if (args.length !== 1) {
        console.error("Usage: npm run start <BASE_URL>")
        process.exit(1)
    }

    const baseURL = args[0]
    console.log(`Starting crawler at: ${baseURL}`)

    const html = await getHTML(baseURL)
    if (html) {
        console.log(html)
    }

    process.exit(0)
}

main()
