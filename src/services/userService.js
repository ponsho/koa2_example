import User from '../models/users';

async function registerUser(user) {
  const { email } = user;

  await User.findOne( {  $or:[ { email }, {}]})
}

// function addFields(user) {
//   const { email } = user;
//   const fields = [email];
//   if(user.facebook) fields.concat({'facebook.id': user.facebook.id});
//   if(user.google) fields.concat()
//   fields.concat()
// }
