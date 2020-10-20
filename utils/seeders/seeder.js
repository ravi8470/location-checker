const User = require('../../models/User');
let data = [
  {
    userName: 'ravi',
    password: '1234',
    role: 'admin'
  },
  {
    userName: 'ravi',
    password: '1234',
    role: 'user'
  }
]

const seedData = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let count = await User.estimatedDocumentCount();
      if (count === 0) {
        await User.create(data);
      } 
      resolve(1);
    } catch (err) {
      console.log('Error: ', err);
      reject(err);
    }
  })
}

module.exports = seedData;