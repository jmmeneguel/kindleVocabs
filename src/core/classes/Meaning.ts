/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Definition } from './Definition'

export class Meaning {
  partOfSpeech: string
  definitions: []

  constructor (meaning: {partOfSpeech: string, definitions: Definition[]}) {
    this.partOfSpeech = meaning.partOfSpeech
    const definitions = []
    meaning.definitions.forEach(item => {
      definitions.push(new Definition(item))
    })
    this.definitions = definitions
  }
}
