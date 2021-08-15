export interface BookLibrary {
  "/book": {
    get: () => void;
  };
  "/book/{bookId}": {
    delete?: () => void;
  };
  "/book/{bookId}/bar/{barId}": {
    delete?: () => void;
  };
}

type PathParamter<TPath extends string> =
  TPath extends `${infer Head}/{${infer Parameter}}${infer Tail}`
    ? [string, ...PathParamter<Tail>]
    : [];

declare const foo: PathParamter<"/book/{bookId}/bar">;
export type Path = <TPath extends keyof BookLibrary>(
  path: TPath,
  ...pathParameter: PathParamter<TPath>
) => BookLibrary[TPath];

// declare normal use in *.d.ts
// https://stackoverflow.com/questions/14311675/typescript-declaration-files-contain-class-definitions-with-no-member-implementa/14323673#14323673
export declare function BooksClient(baseUrl: string): {
  path: Path;
};

const client = BooksClient("http://localhost")
  .path("/book/{bookId}", "1")
  .delete();

const client2 = BooksClient("http://localhost")
  .path("/book/{bookId}/bar/{barId}", "1", "2")
  .delete();

function test(test: string): string {
  return null;
}
