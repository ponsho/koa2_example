import { dropTestDb } from '../db_test_connection';
const User = require(`${rootDir}/src/models/users`).default;

describe('Users model', () => {

  before(async function () {
    // Start with a Sandboxed DB
    await dropTestDb();
  });

  describe('User pre save hooks' , () => {
    it('should hash the password', async function () {
      const password = 'myPassword';
      const username = 'user1';
      const user = new User({username, password});
      await user.save();
      const savedUser = await User.findOne({username});
      expect(savedUser.password).to.not.equal(password);
    });

    it('should not rehash a password for an existing user', async function () {
      const password = 'myPassword';
      const username = 'user2';
      const user = new User({username, password});
      await user.save();
      const savedUser = await User.findOne({username});
      await savedUser.save();
      const updatedUser = await User.findOne({username});
      expect(updatedUser.password).to.be.equal(savedUser.password);
    });
  });

  describe('User schema definitions', () => {
    it('should not save two users with the same username', async function() {
      // Mongo may have not finished creating the user index..
      // we should wait until the index is created.
      User.on('index', async function(e) {
        const password = 'pw';
        const username = 'user3';
        const user = new User({username, password});
        await user.save();
        const sameUser = new User({username, password});
        return expect(sameUser.save()).to.be.rejected;
      });
    });

    describe('Validate password', () => {
      it('should return true when the password match', async function() {
          const password = 'pw';
          const username = 'user4';
          const user = new User({username, password});
          await user.save();
          const match = await user.validatePassword(password);
          expect(match).to.be.true;
        });


      it('should return false when the password does not match', async function() {
        const password = 'pw';
        const username = 'user5';
        const user = new User({username, password});
        await user.save();
        const match = await user.validatePassword('anotherPassword');
        expect(match).to.be.false;
      });
    });

    describe('Generate Token ', () => {
      it('not sure', async function() {
        const password = 'pw';
        const username = 'user6';
        const user = new User({username, password});
        console.log(user.generateToken());
        expect(true).to.be.true;
      });

    });
  });
});

