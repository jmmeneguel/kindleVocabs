interface bookInfoInterface {
  id: string
  asin: string
  lang: string
  title: string
  authors: string
}

export class BookInfo {
  id: string
  asin: string
  lang: string
  title: string
  authors: string

  constructor (bookInfo: bookInfoInterface) {
    this.id = bookInfo.id
    this.asin = bookInfo.asin
    this.lang = bookInfo.lang
    this.title = bookInfo.title
    this.authors = bookInfo.authors
  }
}
