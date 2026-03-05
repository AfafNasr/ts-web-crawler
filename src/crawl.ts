import { JSDOM } from 'jsdom'

export function normalizeURL(urlString: string): string {
    const urlObj = new URL(urlString)
    let fullPath = `${urlObj.hostname}${urlObj.pathname}`
    
    if (fullPath.length > 0 && fullPath.slice(-1) === '/') {
        fullPath = fullPath.slice(0, -1)
    }
    
    return fullPath
}

export function getHeadingFromHTML(html: string): string {
    const dom = new JSDOM(html)
    const h1 = dom.window.document.querySelector('h1')
    if (h1 && h1.textContent) {
        return h1.textContent
    }
    const h2 = dom.window.document.querySelector('h2')
    if (h2 && h2.textContent) {
        return h2.textContent
    }
    return ""
}

export function getFirstParagraphFromHTML(html: string): string {
    const dom = new JSDOM(html)
    const mainP = dom.window.document.querySelector('main p')
    if (mainP && mainP.textContent) {
        return mainP.textContent
    }
    const anyP = dom.window.document.querySelector('p')
    if (anyP && anyP.textContent) {
        return anyP.textContent
    }
    return ""
}
