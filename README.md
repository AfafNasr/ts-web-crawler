#  Concurrent Web Crawler

A high-performance, command-line web crawler built with **Node.js** and **TypeScript**. This tool recursively explores websites, extracts structured data (headings and links), and saves the results into a deterministic JSON report.

---

##  Key Features

* **Asynchronous Concurrency:** Utilizes promise-based concurrency control to fetch multiple pages simultaneously without overwhelming the target server.
* **Resource Management:** Configurable limits for both maximum concurrent requests and total pages crawled to ensure optimal performance.
* **Structured Data Extraction:** Automatically extracts page headings (`<h1>`) and maps all internal/external outgoing links.
* **Robust Error Handling:** Designed to handle malformed URLs, non-HTML content types, and various HTTP status codes (404, 500, etc.).
* **OOP Architecture:** Built using a class-based approach in TypeScript for better state management and maintainability.

---

##  Tech Stack & Concepts

* **Language:** [TypeScript](https://www.typescriptlang.org/) (for type safety and modern JS features).
* **Runtime:** [Node.js](https://nodejs.org/).
* **Concurrency Control:** [`p-limit`](https://www.npmjs.com/package/p-limit) to manage parallel execution flow.
* **DOM Parsing:** [`jsdom`](https://www.npmjs.com/package/jsdom) to parse and extract data from HTML strings.
* **Networking:** Native `fetch` API for HTTP requests.
* **File System:** Node.js `fs` and `path` modules for report generation.

---

##  Prerequisites

Ensure you have the following installed on your machine:
- **Node.js** (v18.0.0 or higher)
- **npm** (Node Package Manager)
- **WSL** (Recommended if you are on Windows)

---

##  Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/afaf-nasr/crawler.git
   cd crawler
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```

---

##  Usage

You can start the crawler using the following command structure:
```bash
npm run start <BASE_URL> <MAX_CONCURRENCY> <MAX_PAGES>
```

### Arguments:
| Argument | Description | Example |
|----------|-------------|---------|
| `BASE_URL` | The starting URL of the website to crawl. | `https://crawler-test.com` |
| `MAX_CONCURRENCY` | Maximum number of simultaneous requests. | `5` |
| `MAX_PAGES` | Total number of unique pages to crawl. | `50` |

### Execution Example:
```bash
npm run start https://crawler-test.com 3 25
```

---

##  Output (JSON Report)

After the crawling process completes, a `report.json` file is generated in the root directory. The data is sorted alphabetically by URL:
```json
[
  {
    "url": "https://crawler-test.com/",
    "heading": "Crawler Test Site",
    "outgoing_links": [
      "https://crawler-test.com/mobile",
      "https://crawler-test.com/status_codes"
    ]
  }
]
```

---

##  Engineering Concepts Implemented

During the development of this project, I applied several core Computer Engineering principles:
- **Concurrency Management:** Implementing `p-limit` to handle Node.js's non-blocking I/O efficiently.
- **Recursion & Graph Traversal:** Using recursive logic to traverse the "web" of links as a directed graph.
- **State Coordination:** Using a `Set` to track active promises and ensuring all tasks complete before generating the final report.
- **Data Normalization:** Ensuring URLs are consistent (removing trailing slashes, protocols, etc.) to prevent duplicate crawling.

---
