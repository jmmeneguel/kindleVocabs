export interface definitionInterface {
  definition: string
  synonyms?: string[]
  example: string
}

export class Definition {
  definition: string
  synonyms?: string[]
  example: string

  constructor (definition: definitionInterface) {
    this.definition = definition.definition
    this.synonyms = definition.synonyms
    this.example = definition.example
  }
}
