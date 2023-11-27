export const SELF_CLOSING_TAGS = new Set([
  "area",
  "base",
  "br",
  "col",
  "command",
  "embed",
  "hr",
  "img",
  "input",
  "keygen",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr",
]);

export const htmlTags = [
  // Metadata and scripting
  "base",
  "head",
  "link",
  "meta",
  "noscript",
  "script",
  "style",
  "title",

  // Sections
  "body",
  "footer",
  "header",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "nav",
  "section",

  // Grouping content
  "blockquote",
  "div",
  "figure",
  "hr",
  "li",
  "main",
  "ol",
  "p",
  "pre",
  "ul",

  // Text-level semantics
  "a",
  "abbr",
  "b",
  "br",
  "cite",
  "code",
  "data",
  "em",
  "i",
  "span",
  "strong",
  "time",
  "u",

  // Forms
  "button",
  "datalist",
  "fieldset",
  "form",
  "input",
  "label",
  "legend",
  "meter",
  "optgroup",
  "option",
  "output",
  "progress",
  "select",
  "textarea",

  // Embedded content
  "audio",
  "canvas",
  "embed",
  "iframe",
  "img",
  "map",
  "object",
  "picture",
  "source",
  "track",
  "video",

  // Tables
  "caption",
  "col",
  "colgroup",
  "table",
  "tbody",
  "td",
  "tfoot",
  "th",
  "thead",
  "tr",
  "turbo-frame"
] as const;

export type HtmlTags = (typeof htmlTags)[number];

export const htmlTagsSet = new Set(htmlTags);
