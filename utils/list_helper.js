const _ = require('lodash')

const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  let total_likes = 0
  for (const x of blogs) {
    total_likes = total_likes + x.likes
  }

  return total_likes
}

const favoriteBlog = (blogs) => {
  let max = 0
  let favourite_blog = null
  for (const x of blogs) {
    if (x.likes > max) {
      max = x.likes
      favourite_blog = x
    }
  }
  return favourite_blog
}

const mostBlogs = (blogs) => {
  const counts = _.countBy(blogs, 'author')
  let most_blogs = 0
  let result = {}
  for (const x in counts){
    if (counts[x] > most_blogs){
      most_blogs = counts[x]
      result['author'] = x
      result['blogs'] = counts[x]
    }
  }
  return result
}

const mostLikes = (blogs) => {
  let authors = []

  for (const x of blogs){
    authors.push(x.author)
  }

  const unique_authors = new Set(authors)

  const convert_to_list = [...unique_authors]

  const transform_to_dict = convert_to_list.map(x => ({
    'author': x,
    'likes': 0
  }))

  console.log(transform_to_dict)

  for(const x of blogs){
    const author = transform_to_dict.find(y => y.author === x.author)

    if(author){
      author.likes += x.likes
    }
  }

  let most_likes = 0
  let result = {}
  for (const x of transform_to_dict){
    if(x.likes > most_likes){
      most_likes = x.likes
      result = x
    }
  }

  return result
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}