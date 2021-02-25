import { Definition, definitionInterface } from './Definition'

export interface meaningInterface {
  partOfSpeech: string
  definitions: definitionInterface[]
}

export class Meaning {
  partOfSpeech: string
  definitions: definitionInterface[]

  constructor (meaning: meaningInterface) {
    this.partOfSpeech = meaning.partOfSpeech
    const definitions: definitionInterface[] = []
    meaning.definitions.forEach(item => {
      definitions.push(new Definition(item))
    })
    this.definitions = definitions
  }
}
