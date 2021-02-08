export class PhoneticInfo {
  text: string
  audio: string

  constructor (phonetic: {text: string, audio: string}) {
    this.text = phonetic.text
    this.audio = phonetic.audio
  }
}
