import {Parser} from 'binary-parser';

export class F1Parser extends Parser {
  /**
   *
   * @param {Buffer} buffer
   */
  // tslint:disable-next-line:no-any
  fromBuffer(buffer: Buffer): unknown {
    return this.parse(buffer);
  }
}
