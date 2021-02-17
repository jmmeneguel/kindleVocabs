import { gellAllKeys, getIndexedDbEntry } from './manageIndexedDb'
import { Word } from '../classes/Word'
import { LookUp } from '../classes/LookUp'
import { TrainingData } from '../classes/TrainingData'
import { databaseStateInterface } from '../../store/database/state'

export async function getFormatedEntries () {
  const words: Word[] = <Word[]> await gellAllKeys('database', 'words')
  console.log('words', words)
  const entries: databaseStateInterface[] = []
  for (const item of words) {
    const entry: databaseStateInterface = {
      word: item.word,
      stem: item.stem,
      meaning: item.wordInfo,
      lookUps: undefined,
      trainingData: undefined,
    }
    const p1 = getIndexedDbEntry('database', 'lookUps', 'wordId', item.id)
    const p2 = getIndexedDbEntry('database', 'trainingData', 'id', item.id)

    const res = await Promise.all([p1, p2])
    entry.lookUps = <LookUp[]> res[0]
    entry.trainingData = <TrainingData><unknown> res[1][0]
    console.log('entry', entry)
    entries.push(entry)
  }
  return entries
}