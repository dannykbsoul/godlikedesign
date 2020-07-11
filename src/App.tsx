import React from "react";
import Button, { ButtonType, ButtonSize } from "./components/Button/button";

function App() {
  return (
    <div>
      <h1>1</h1>
      <h2>2</h2>
      <h3>3</h3>
      <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>
        hello,button
      </Button>
      <Button
        btnType={ButtonType.Link}
        size={ButtonSize.Large}
        href="http://google.com"
      >
        hello,link
      </Button>
      <Button
        btnType={ButtonType.Link}
        size={ButtonSize.Large}
        disabled
        href="http://google.com"
      >
        hello,link disabled
      </Button>
    </div>
  );
}

export default App;
