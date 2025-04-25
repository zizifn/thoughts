import React, { Suspense } from "react";
import ReactMarkdown, { MarkdownAsync } from "react-markdown";

import Image from "next/image";
import rehypeRaw from "rehype-raw";

export default function Home() {
  return (
    <>
      <Suspense fallback={<p>loading....</p>}>
        <WordStream
          words={wordGenerator([
            "Hello",
            "**world**",
            "this",
            "is",
            "a",
            "test",
          ])}
        ></WordStream>
      </Suspense>
    </>
  );
}

async function WordStream({
  words,
  accumulated = "",
}: {
  words: AsyncGenerator<string>;
  accumulated?: string;
}) {
  const { value: word, done } = await words.next();

  if (done) return null;

  // const nextAccumulated = accumulated + " " + word;

  return (
    <>
      {word}
      <Suspense>
        <WordStream words={words} />
      </Suspense>
    </>
  );
}

async function* wordGenerator(words: string[]) {
  for (const word of words) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    yield word;
  }
}
