export class Definition {
  definition: string
  example: string
  synonyms: string[]

  constructor (definition: string, example: string, synonyms: string[]) {
    this.definition = definition
    this.example = example
    this.synonyms = synonyms
  }
}
