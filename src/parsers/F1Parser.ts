import { Parser } from 'binary-parser'

export class F1Parser<T> extends Parser {
  /**
   *
   * @param {Buffer} buffer
   */
  fromBuffer(buffer: Buffer): T {
    return this.parse(buffer)
  }
}
