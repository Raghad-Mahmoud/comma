const numbersArr = [84, 92, 58, 66, 102, 124, 30, 45, 27, 48, 49, 95]

const usersData = [
  {
    name: 'Yaser Jom3a',
    email: 'Yaser@Jom3a.com',
    active: 'online'
  },
  {
    name: 'A7mad Med7at',
    email: 'A7mad@Med7at.com',
    active: 'offline'
  },
  {
    name: 'George Kordahi',
    email: 'George@Kordahi.com',
    active: 'online'
  }
]

function arraySum(arr) {
  let sum = 0
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i]
  }
  return sum
}

module.exports = {
  arraySum,
  numbersArr,
  usersData
}
