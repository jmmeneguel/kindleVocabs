export class Book {
  id: string
  asin: string
  lang: string
  title: string
  authors: string

  constructor (id: string, asin: string, lang: string, title: string, authors: string) {
    this.id = id
    this.asin = asin
    this.lang = lang
    this.title = title
    this.authors = authors
  }
}
