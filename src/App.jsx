import { useEffect, useState } from "react";
import markdownit from "markdown-it";

function App() {
  const [terms, setTerms] = useState("");
  const [url, setUrl] = useState(
    "https://raw.githubusercontent.com/yurigo/remarkdownct/master/public/public.md"
  );

  useEffect(() => {
    setTerms("Loading...");
    const md = markdownit();
    fetch(url)
      .then(async (content) => {
        if (!content.ok) throw new Error("Error fetching the file");
        const data = await content.text();
        setTerms(md.render(data));
      })
      .catch((error) => {
        console.error("Error:", error);
        setTerms(`Error while fetching the file: ${error.message}`);
      });
  }, [url]);

  return (
    <>
      <main className="pb-5 mx-10 md:ml-auto md:mr-auto mt-10">
        <section className="max-w-2xl lg:max-w-full">
          <h1 className="text-8xl">Htmlizer</h1>

          <p className="mt-3">
            Htmlizer is a simple tool that converts markdown to HTML. It uses
            markdown-it to convert markdown to HTML. The HTML is then rendered
            using React.
          </p>

          <div className="mt-4 mb-10">
            <label htmlFor="url" className="text-xs mt-10 mb-10">
              Url
            </label>

            <input
              name="url"
              type="url"
              className="border-2 border-gray-300 p-2 w-full mt-2 bg-gray-800"
              value={url}
              onChange={(e) => {
                console.log("changed", e.target.value);
                setUrl(e.target.value);
              }}
            />

            <p>
              <small>
                <code>{url}</code>
              </small>
            </p>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-full mb-20">
          <div>
            <h2 className="text-3xl mb-5">HTML</h2>

            <article className="prose dark:prose-invert mx-auto lg:w-[65ch]">
              <pre>{terms}</pre>
            </article>
          </div>

          <div>
            <h2 className="text-3xl mb-5">Preview</h2>
            <article
              className="prose dark:prose-invert mt-5 mx-auto lg:w-[65ch]"
              dangerouslySetInnerHTML={{ __html: terms }}
            />
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
