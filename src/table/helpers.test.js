import { formatBytes } from "./helpers";

test("file less than 1024 bytes displays in bytes", () => {
  expect(formatBytes(1)).toEqual("1 bytes");
  expect(formatBytes(2)).toEqual("2 bytes");
  expect(formatBytes(512)).toEqual("512 bytes");
  expect(formatBytes(1023)).toEqual("1023 bytes");
});

test("file more than 1 KB and less than 1 MB displays in KB", () => {
  expect(formatBytes(1024)).toEqual("1 KB");
  expect(formatBytes(1024 * 2)).toEqual("2 KB");
  expect(formatBytes(1024 * 512)).toEqual("512 KB");
  expect(formatBytes(1024 * 1023)).toEqual("1023 KB");
});

test("file more than 1 MB and less than 1 GB displays in MB", () => {
  expect(formatBytes(Math.pow(1024, 2))).toEqual("1 MB");
  expect(formatBytes(2 * Math.pow(1024, 2))).toEqual("2 MB");
  expect(formatBytes(512 * Math.pow(1024, 2))).toEqual("512 MB");
  expect(formatBytes(Math.pow(1023, 3))).toEqual("1021 MB");
});

test("file more than 1 GB and less than 1 TB displays in GB", () => {
  expect(formatBytes(Math.pow(1024, 3))).toEqual("1 GB");
  expect(formatBytes(2 * Math.pow(1024, 3))).toEqual("2 GB");
  expect(formatBytes(512 * Math.pow(1024, 3))).toEqual("512 GB");
  expect(formatBytes(Math.pow(1023, 4))).toEqual("1020 GB");
});

test("file more than 1 TB displays in TB", () => {
  expect(formatBytes(Math.pow(1024, 4))).toEqual("1 TB");
  expect(formatBytes(2 * Math.pow(1024, 4))).toEqual("2 TB");
  expect(formatBytes(512 * Math.pow(1024, 4))).toEqual("512 TB");
  expect(formatBytes(Math.pow(1024, 5))).toEqual("1024 TB");
});
