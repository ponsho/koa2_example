import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

require('sinon-as-promised');

chai.use(chaiAsPromised);
chai.use(sinonChai);

global.expect = expect;
global.sinon = sinon;
