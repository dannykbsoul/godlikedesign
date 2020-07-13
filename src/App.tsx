import React from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import Button, { ButtonType, ButtonSize } from "./components/Button/button";
import Icon from "./components/Icon/icon";
import Alert from "./components/Alert/alert";
import Menu from "./components/Menu/menu";
import MenuItem from "./components/Menu/menuItem";

library.add(fas);

function App() {
  return (
    <div>
      <h1>1</h1>
      <h2>2</h2>
      <h3>3</h3>
      <Button
        btnType="primary"
        size="lg"
        onClick={(e) => {
          console.log(e.target);
        }}
        className="self-style"
      >
        hello,button
      </Button>
      <Button btnType="danger" size="sm">
        hello,danger
      </Button>
      <Button btnType="default" size="lg" disabled>
        hello,button disabled
      </Button>
      <Button btnType="default" size="lg">
        hello,button
      </Button>
      <Button btnType="link" size="sm" href="http://google.com">
        hello,link
      </Button>
      <Button btnType="link" size="lg" disabled href="http://google.com">
        hello,link disabled
      </Button>
      <Icon icon="coffee" theme="danger" />
      <Alert title="alert title1" type="success" />
      <Alert
        title="alert title2"
        description="alert title2 content"
        type="default"
      />
      <Alert title="alert title3" type="danger" />
      <Alert title="alert title4" type="warning" />
      <Menu defaultIndex={0} mode="vertical">
        <MenuItem index={1}>1</MenuItem>
        <MenuItem index={2}>2</MenuItem>
        <MenuItem index={3}>3</MenuItem>
      </Menu>
    </div>
  );
}

export default App;
