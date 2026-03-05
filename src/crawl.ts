import { JSDOM } from 'jsdom'

export interface ExtractedPageData {
  url: string
  heading: string
  first_paragraph: string
  outgoing_links: string[]
  image_urls: string[]
}

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

export function getURLsFromHTML(html: string, baseURL: string): string[] {
    const urls: string[] = []
    const dom = new JSDOM(html)
    const linkElements = dom.window.document.querySelectorAll('a')

    for (const linkElement of linkElements) {
        if (linkElement.hasAttribute('href')) {
            const href = linkElement.getAttribute('href')
            try {
                const urlObj = new URL(href!, baseURL)
                urls.push(urlObj.href)
            } catch (err) {
                console.log(`error with invalid url: ${err instanceof Error ? err.message : err}`)
            }
        }
    }
    return urls
}

export function getImagesFromHTML(html: string, baseURL: string): string[] {
    const images: string[] = []
    const dom = new JSDOM(html)
    const imgElements = dom.window.document.querySelectorAll('img')

    for (const imgElement of imgElements) {
        if (imgElement.hasAttribute('src')) {
            const src = imgElement.getAttribute('src')
            try {
                const urlObj = new URL(src!, baseURL)
                images.push(urlObj.href)
            } catch (err) {
                console.log(`error with invalid img url: ${err instanceof Error ? err.message : err}`)
            }
        }
    }
    return images
}

export function extractPageData(html: string, pageURL: string): ExtractedPageData {
  return {
    url: pageURL,
    heading: getHeadingFromHTML(html),
    first_paragraph: getFirstParagraphFromHTML(html),
    outgoing_links: getURLsFromHTML(html, pageURL),
    image_urls: getImagesFromHTML(html, pageURL)
  }
}

export async function getHTML(url: string): Promise<string | undefined> {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'User-Agent': 'BootCrawler/1.0',
                'Accept': 'text/html' 
            }
        })

        if (response.status >= 400) {
            console.log(`Error: HTTP status ${response.status}`)
            return
        }

        const contentType = response.headers.get('content-type')
        if (!contentType || !contentType.includes('text/html')) {
            console.log(`Error: Content-Type is ${contentType}`)
            return
        }

        return await response.text()
    } catch (err) {
        console.log(`Error: ${err instanceof Error ? err.message : err}`)
        return
    }
}

export async function crawlPage(
  baseURL: string,
  currentURL: string = baseURL,
  pages: Record<string, number> = {}
): Promise<Record<string, number>> {
  
  const baseURLObj = new URL(baseURL)
  const currentURLObj = new URL(currentURL)
  if (baseURLObj.hostname !== currentURLObj.hostname) {
    return pages
  }

  const normalizedCurrentURL = normalizeURL(currentURL)

  if (pages[normalizedCurrentURL] > 0) {
    pages[normalizedCurrentURL]++
    return pages
  }

  pages[normalizedCurrentURL] = 1

  console.log(`actively crawling: ${currentURL}`)

  try {
    const htmlBody = await getHTML(currentURL)
    if (!htmlBody) {
        return pages
    }

    const nextURLs = getURLsFromHTML(htmlBody, baseURL)

    for (const nextURL of nextURLs) {
      pages = await crawlPage(baseURL, nextURL, pages)
    }
    
  } catch (err) {
    console.log(`error in crawlPage: ${err instanceof Error ? err.message : err}`)
  }

  return pages
}
