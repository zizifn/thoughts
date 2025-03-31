import { JSDOM } from "jsdom";

const window = new JSDOM().window;

export default function getElementsByClassName(
  element: Element,
  classNames: string,
  isRoot = true
): Array<Element> {
  // throw "Not implemented!";
  const classNamesList = classNames.split(" ").filter(Boolean);
  let results: Element[] = [];
  if (!element) {
    return results;
  }

  const match = classNamesList.every((className) =>
    element.classList.contains(className)
  );

  if (match && !isRoot) {
    results.push(element);
  }
  for (const item of element.children) {
    const eles = getElementsByClassName(item, classNames, false);
    results = results.concat(eles);
  }
  return results;
}

const doc = new window.DOMParser().parseFromString(
  `<div class="foo bar baz">
    <span class="bar baz">Span</span>
    <p class="foo baz">Paragraph</p>
    <div class="foo bar"></div>
  </div>`,
  "text/html"
);

console.log(getElementsByClassName(doc.body, "foo bar"));
// [div.foo.bar.baz, div.foo.bar] <-- This is an array of elements.
