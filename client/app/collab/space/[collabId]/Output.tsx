export default function OutputTerminal({ output }: { output: string }) {
  return (
    <>
      <h1 className="text-lg font-bold mb-2 w-full">Output</h1>
      <div className="bg-background text-white p-4 rounded-lg shadow-md">
        <pre className="whitespace-pre-wrap break-words scroll-auto">
          {output}
        </pre>
      </div>
    </>
  );
}
