import { test, expect } from 'vitest'
import { normalizeURL, getHeadingFromHTML, getFirstParagraphFromHTML } from './crawl'

test('normalizeURL strip protocol', () => {
    const input = 'https://blog.boot.dev/path'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeURL strip trailing slash', () => {
    const input = 'https://blog.boot.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeURL capitals', () => {
    const input = 'https://BLOG.boot.dev/path'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeURL strip http', () => {
    const input = 'http://blog.boot.dev/path'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})
test('getHeadingFromHTML basic h1', () => {
    const input = '<html><body><h1>Hello World</h1></body></html>'
    expect(getHeadingFromHTML(input)).toBe('Hello World')
})

test('getHeadingFromHTML fallback to h2', () => {
    const input = '<html><body><h2>Only H2 here</h2></body></html>'
    expect(getHeadingFromHTML(input)).toBe('Only H2 here')
})

test('getHeadingFromHTML empty if none', () => {
    const input = '<html><body><p>No titles here</p></body></html>'
    expect(getHeadingFromHTML(input)).toBe('')
})

test('getFirstParagraphFromHTML main priority', () => {
    const input = `
    <html><body>
      <p>Outside</p>
      <main><p>Inside Main</p></main>
    </body></html>`
    expect(getFirstParagraphFromHTML(input)).toBe('Inside Main')
})

test('getFirstParagraphFromHTML fallback to any p', () => {
    const input = '<html><body><p>Just a paragraph</p></body></html>'
    expect(getFirstParagraphFromHTML(input)).toBe('Just a paragraph')
})

test('getFirstParagraphFromHTML empty if none', () => {
    const input = '<html><body><div>No p tags</div></body></html>'
    expect(getFirstParagraphFromHTML(input)).toBe('')
})
