import "./App.css";
import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
const supabase = createClient(
  https://mkxypgtnygxenagtejko.supabase.co,
  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1reHlwZ3RueWd4ZW5hZ3RlamtvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDM0MDIwNjMsImV4cCI6MjAxODk3ODA2M30.knML223u4JdXA3Lql5B7mrR4esYrvgi01Sl2Yap8Zug,
);
function App() {
  // storing data in state
  const [inputData, setInputData] = useState(null);
  const [embedData, setembedData] = useState(null);

  //making call to edge function to create embeddings
  const handleEmbed = async () => {
    const { data, error } = await supabase.functions.invoke(
      "create-embeddings",
      {
        body: { input: inputData },
      }
    );
    if (error) {
      console.log(error);
    } else {
      setembedData("Embed successfully stored");
    }
  };

  return (
    <div className="App">
      <h1>Generate Embeddings</h1>
      <input type="text" onChange={(e) => setInputData(e.target.value)} />
      <br />
      <button onClick={handleEmbed}>Run Embed</button>
      {embedData && <p>{embedData}</p>}
    </div>
  );
}
export default App;

