generateArticle()

function randomSelect(next_word_obj){
  // Obtain total sum of all counts in the object
  let sumOfCounts = 0
  for (next_word in next_word_obj) {
    let count = next_word_obj[next_word]
    sumOfCounts += parseInt(count)
  }

  // Generate random integer
  let randInt = Math.floor(Math.random() * sumOfCounts)

  // Select next_word
  let cumSum = 0
  for (next_word in next_word_obj) {
    let count = next_word_obj[next_word]
    cumSum += parseInt(count)
    if (randInt <= cumSum ) {
      console.log(next_word)
      return next_word
    }
  }


}

function generateArticle(){
  var full_string = ''

  // Initialize and run twice
  var next_word = randomSelect(prob_dict['<START>']['<START>'])
  var curr_word = next_word

  next_word = randomSelect(prob_dict['<START>'][curr_word])
  if (next_word == '<END>') {
    displayArticle(full_string)
  }
    
  full_string += ' ' + curr_word
  prev_word = curr_word
  curr_word = next_word

  while(true){
    next_word = randomSelect(prob_dict[prev_word][curr_word])

    if (next_word == '<END>') {
      displayArticle(full_string)
    }

    if (next_word == '\n') {
      full_string += '\n\n'
    }

    else {
      full_string += ' ' + next_word
    }

    prev_word = curr_word
    curr_word = next_word
  }
}

function displayArticle(full_str) {
  articleArray = full_str.split('\n')
  new_str = ''
  for (index in articleArray) {
    if (index === '0') {
      new_str += '<h1>' + articleArray[index] + '</h1>'
    } else {
      new_str += '<p>' + articleArray[index] + '</p>'
    }
  }
  document.getElementById("content").innerHTML = new_str
}