export default function Markdown() {
  return (
    <ReactMarkdown
      components={{
        h1: ({ children }) => <PrimHeading>{children}</PrimHeading>,
        h2: ({ children }) => <SecHeading>{children}</SecHeading>,
        p: ({ children }) => <ParaText>{children}</ParaText>,
        code: ({ children }) => <CodeBlock>{children}</CodeBlock>,
      }}
      disallowedElements={['h1']}
    >
      {props.content}
    </ReactMarkdown>
  );
}
