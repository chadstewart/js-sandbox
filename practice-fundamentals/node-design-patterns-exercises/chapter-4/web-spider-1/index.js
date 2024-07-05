import { spider } from './spider.js'

spider(process.argv[2], (err, filename, downloaded) => {
  if (err) {
    console.error(err)
    return process.exit(1)
  }
  
  if (downloaded) return console.log(`Completed the download of "${filename}"`)
  
  return console.log(`"${filename}" was already downloaded`)
})