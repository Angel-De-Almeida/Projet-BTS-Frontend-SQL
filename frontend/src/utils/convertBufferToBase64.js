// src/utils/convertBufferToBase64.js
import { Buffer } from "buffer";

export const convertBufferToBase64 = (buffer) => {
  return Buffer.from(buffer).toString("base64");
};
