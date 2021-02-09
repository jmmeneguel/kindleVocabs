/* eslint-disable @typescript-eslint/no-unsafe-call */
import * as initSqlJs from 'sql.js'

export async function initSql () {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const SQL = await initSqlJs({
    // Required to load the wasm binary asynchronously. Of course, you can host it wherever you want
    // You can omit locateFile completely when running in node
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    locateFile: file => 'C:\\Users\\Jéssica\\Desktop\\Programas\\Pessoal\\quasar\\kindleVocabs\\vocab.db'
  })

  console.log(SQL)
}