import { getHTML } from './crawl.js'

async function main() {
    const args = process.argv.slice(2)

    if (args.length !== 1) {
        console.error("Usage: npm run start <URL>")
        process.exit(1)
    }

    const baseURL = args[0]
    
    const html = await getHTML(baseURL)

    if (html) {
        console.log(html)
    } 
    
}

main()
