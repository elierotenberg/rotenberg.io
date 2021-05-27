/* eslint-disable quotes */
declare module "json-url" {
  type Algorithm = "lzw" | "lzma";
  type Codec = {
    readonly compress: (input: unknown) => Promise<string>;
    readonly decompress: (input: string) => Promise<unknown>;
  };
  const createCodec: (algorithm: Algorithm) => Codec;
  export default createCodec;
}
