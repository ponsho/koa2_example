/* Boilerplate code used in all of the tests */
import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import path from 'path';

require('sinon-as-promised');

chai.use(chaiAsPromised);
chai.use(sinonChai);

global.sinon = sinon;
global.expect = expect;
global.rootDir = path.join(__dirname, '..' );
