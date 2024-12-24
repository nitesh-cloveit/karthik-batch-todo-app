import Header from "./components/header";
import Card from "./components/card";

function App() {
  return (
    <>
      <Header />
      <div className="container">
        <Card title="Card 1" description="This is a test card 1." />
        <Card title="Card 2" />
        <Card title="Card 3" />
        <Card title="Card 4" />
      </div>
    </>
  );
}

export default App;
// Component based
// code reusable
// JSX
// declaritive
// virtual dom
// props
