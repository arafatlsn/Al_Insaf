export async function fileToBuffer(file) {
  const chunks = [];
  const stream = file.stream();
  const reader = stream.getReader();

  let done = false;
  while (!done) {
    const { value, done: readerDone } = await reader.read();
    if (value) chunks.push(value);
    done = readerDone;
  }

  return Buffer.concat(chunks);
}
