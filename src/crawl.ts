export function normalizeURL(urlString: string): string {
    const urlObj = new URL(urlString)
    let fullPath = `${urlObj.hostname}${urlObj.pathname}`
    
    if (fullPath.length > 0 && fullPath.slice(-1) === '/') {
        fullPath = fullPath.slice(0, -1)
    }
    
    return fullPath
}
