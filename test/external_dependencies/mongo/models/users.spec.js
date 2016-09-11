import chai, { expect } from 'chai';
import chaiLint from 'chai-lint';
import chaiAsPromised from 'chai-as-promised';
import dropTestDb from '../db_utils';
import User from '../../../../src/models/users';

chai.use(chaiAsPromised);
chai.use(chaiLint);

describe('Users model', () => {
  before(async function () {
    // Start with a Sandboxed DB
    await dropTestDb();
  });

  describe('User pre save hooks', () => {
    it('should hash the password', async function () {
      const password = 'myPassword';
      const email = 'user1@gmail.com';
      const user = new User({ email, password });
      await user.save();
      const savedUser = await User.findOne({ email });
      expect(savedUser.password).to.not.equal(password);
    });

    it('should not rehash a password for an existing user', async function () {
      const password = 'myPassword';
      const email = 'user2@outlook.com';
      const user = new User({ email, password });
      await user.save();
      const savedUser = await User.findOne({ email });
      await savedUser.save();
      const updatedUser = await User.findOne({ email });
      expect(updatedUser.password).to.be.equal(savedUser.password);
    });
  });

  describe('User schema definitions', () => {
    it('should not save two users with the same username', async () => {
      // Mongo may have not finished creating the user index..
      // we should wait until the index is created.
      User.on('index', async function(e) {
        if (e) { console.log(e); }
        const password = 'pw';
        const email = 'user3@mymail.com.mx';
        const user = new User({ email, password });
        await user.save();
        const sameUser = new User({ email, password });
        return expect(sameUser.save()).to.be.rejected;
      });
    });

    it('should throw an error when saving an invalid email', async () => {
      const password = 'pw';
      const email = 'notavalidemail';
      const user = new User({ email, password });
      return expect(user.save()).to.be.rejected;
    });

    describe('verifyPassword', () => {
      it('should return true when the password match', async () => {
        const password = 'pw';
        const email = 'user4@another.email.mx';
        const user = new User({ email, password });
        await user.save();
        const match = await user.verifyPassword(password);
        expect(match).to.beTrue();
      });


      it('should return false when the password does not match', async () => {
        const password = 'pw';
        const email = 'user5@hehe.com';
        const user = new User({ email, password });
        await user.save();
        const match = await user.verifyPassword('anotherPassword');
        expect(match).to.beFalse();
      });
    });

    // describe('Generate Token ', () => {
    //   it('not sure', async function() {
    //     const password = 'pw';
    //     const username = 'user6';
    //     const user = new User({username, password});
    //     console.log(user.generateToken());
    //     expect(true).to.be.true;
    //   });
    //
    // });
  });
});

