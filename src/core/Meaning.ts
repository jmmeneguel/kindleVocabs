import { Definition } from './Definition'

export class Meaning {
  partOfSpeech: string
  definition: Definition

  constructor (partOfSpeech: string, definition: Definition) {
    this.partOfSpeech = partOfSpeech
    this.definition = definition
  }
}
