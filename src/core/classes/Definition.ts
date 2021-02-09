export class Definition {
  definition: string
  example: string
  synonyms?: string[]

  constructor (definition: {definition: string, example: string, synonyms?: string[]}) {
    this.definition = definition.definition
    this.example = definition.example
    this.synonyms = definition.synonyms
  }
}
