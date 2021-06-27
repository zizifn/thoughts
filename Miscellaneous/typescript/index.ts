export interface BookLibrary {
  "/book": {
    get: () => void;
  };
  "/book/{bookId}": {
    delete: () => void;
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

export declare function BooksClient(baseUrl: string): {
  path: Path;
};

const client = BooksClient("http://localhost")
  .path("/book/{bookId}", "1")
  .delete();
