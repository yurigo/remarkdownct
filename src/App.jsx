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
      <h1 className="red text-3xl font-bold underline">Terms of Service</h1>

      <div className="prose" dangerouslySetInnerHTML={{ __html: terms }} />
    </>
  );
}

export default App;
