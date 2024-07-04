import { useEffect, useState } from "react";
import markdownit from "markdown-it";

function App() {
  const [terms, setTerms] = useState("");

  useEffect(() => {
    const md = markdownit();
    fetch("./public.md").then(async (content) => {
      const data = await content.text();
      setTerms(md.render(data));
    });
  }, []);

  return (
    <>
      <main className="flex-1 pb-5 mx-10 md:ml-auto md:mr-auto mt-10">
        <article
          className="prose dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: terms }}
        />
      </main>
    </>
  );
}

export default App;
