const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})
let viewArray = [
  { completed: true, title: 'Take out the Trash' },
  { completed: false, title: 'Buy Toothpaste' },
  { completed: false, title: 'Buy snickerdoodles' },
  { completed: false, title: 'Fix the climate'},
  { complete: false, title: 'Find a cure for aging'}
]
console.log('Welcome to Todo CLI!')
console.log('------------------------')
function askQuestion() {
  rl.question(
    `(v)View • ( n ) New • (cX) Complete • (dX) Delete • (q) Quit)\n`,
    (answer) => {
      answer.toString()
      if (answer == 'q') {
        rl.close()
        process.exit()
      } else if (answer == 'v') {
        let viewString = ''
       
        for (let i = 0; i < viewArray.length; i++) {
          viewString += `[${i}] [${viewArray[i].completed ? '✓' : ' '}] ${
            viewArray[i].title
          }\n`
        }
        console.log(viewString)
      } else if (answer == 'n') {
        rl.question(`What?\n`, (responseTitle) => {
          viewArray.push({ completed: false, title: responseTitle })
          console.log(`Added entry: ${responseTitle}`)
          return askQuestion()
        })
      } else if (answer[0] == 'c') {
        const numberIndex = answer[1]
        if (numberIndex < viewArray.length) {
          viewArray[numberIndex].completed = true
        } else {
          console.log(`This item number ${numberIndex} does not exist`)
        }
        return askQuestion()
      } else if (answer[0] == 'd') {
        const numberIndex = answer[1]
        if (numberIndex < viewArray.length) {
          console.log(`Deleted "${viewArray[numberIndex].title}`)
          viewArray.splice(numberIndex, 1)
        } else {
          console.log(`This item number ${numberIndex} does not exist`)
        }
        return askQuestion()
      }
      return askQuestion()
    }
  )
}
askQuestion()