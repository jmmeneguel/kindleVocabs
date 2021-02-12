export class Definition {
  definition: string
  synonyms?: string[]
  example: string

  constructor (definition: {definition: string, example: string, synonyms?: string[]}) {
    this.definition = definition.definition
    this.synonyms = definition.synonyms
    this.example = definition.example
  }
}
