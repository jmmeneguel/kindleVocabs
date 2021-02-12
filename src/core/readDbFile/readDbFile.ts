/* eslint-disable camelcase */
/* eslint-disable no-var */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as initSqlJs from 'sql.js'

let SQL: { Database: new (arg0: Uint8Array) => any }

export interface kindleLookUpType {
  id: string,
  word_key: string,
  book_key: string,
  timestamp: number,
  usage: string,
  dict_key: string,
  pos: string
}

export interface kindleWordType {
  id: string,
  word: string,
  stem: string,
  lang: string,
  category: number,
  timestamp: number,
  profileid: string
}

export class Database {
  async startDatabase () {
    SQL = await initSqlJs({
      // Required to load the wasm binary asynchronously. Of course, you can host it wherever you want
      // You can omit locateFile completely when running in node
      locateFile: () => 'sql-wasm.wasm'
    })
  }

  async readTable (filePath: Blob, tableName: string) {
    await this.startDatabase()

    return new Promise((resolve) => {
      const r = new FileReader()
      r.onload = function () {
        const Uints = new Uint8Array(r.result)
        const db = new SQL.Database(Uints)
        var response = db.prepare(`SELECT * FROM ${tableName}`)
        for (var result = []; response.step();) result.push(response.getAsObject())
        resolve(result)
      }
      r.readAsArrayBuffer(filePath)
    })
  }
}
