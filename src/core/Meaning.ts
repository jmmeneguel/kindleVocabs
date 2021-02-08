import { Definition } from './Definition'

export class Meaning {
  partOfSpeech: string
  definition: Definition

  constructor (meaning: {partOfSpeech: string, definition: Definition}) {
    this.partOfSpeech = meaning.partOfSpeech
    this.definition = meaning.definition
  }
}
