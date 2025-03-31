type Element = { tag: string; children: Array<string | Element> };

export default function serializeHTML(element: Element): string {
  // throw "Not implemented!";
  const results = [];
  function walk(element: Element, level: number) {
    if (!element) {
      return;
    }

    // put begin tag
    console.log(level);
    results.push(...new Array(level).fill("\t"));
    results.push(`<${element.tag}>\n`);

    for (const item of element.children) {
      if (typeof item === "object") {
        walk(item, level + 1);
      } else {
        results.push(...new Array(level + 1).fill("\t"));
        results.push(`${item}\n`);
      }
    }
    // put end tag
    results.push(...new Array(level).fill("\t"));
    if (level === 0) {
      results.push(`</${element.tag}>`);
    } else {
      results.push(`</${element.tag}>\n`);
    }
  }

  walk(element, 0);

  return results.join("");
}
const tree = {
  tag: "body",
  children: [
    { tag: "div", children: [{ tag: "span", children: ["foo", "bar"] }] },
    { tag: "div", children: ["baz"] },
  ],
};

console.log(serializeHTML(tree));
// Output:
`<body>
  <div>
    <span>
      foo
      bar
    </span>
  </div>
  <div>
    baz
  </div>
</body>`;
