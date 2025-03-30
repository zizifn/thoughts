import { JSDOM } from "jsdom";

const window = new JSDOM().window;
export default function getElementsByStyle(
  element: Element,
  property: string,
  value: string,
  isRoot = true
): Array<Element> {
  if (!element) {
    return [];
  }
  const children = element.children;
  const result: Element[] = [];
  for (const child of children) {
    const elementsWithStyle = getElementsByStyle(child, property, value, false);
    result.push(...elementsWithStyle);
  }
  if (!isRoot) {
    const styles = window.getComputedStyle(element);
    if (styles.getPropertyValue(property) === value) {
      result.push(element);
    }
  }

  return result;
}

const doc = new window.DOMParser().parseFromString(
  `<div>
    <span style="font-size: 12px">Span</span>
    <p style="font-size: 12px">Paragraph</p>
    <blockquote style="font-size: 14px">Blockquote</blockquote>
  </div>`,
  "text/html"
);

console.log(doc.body);

console.log(getElementsByStyle(doc.body, "font-size", "12px"));
// [span, p] <-- This is an array of elements.
