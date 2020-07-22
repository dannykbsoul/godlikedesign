import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Menu from "./index";

export const defaultMenu = () => (
  <Menu
    defaultIndex="0"
    onSelect={action("selected!")}
    style={{ width: "655px" }}
  >
    <Menu.Item index="66">cool link</Menu.Item>
    <Menu.Item index="67">cool link 2</Menu.Item>
    <Menu.Item index="68">cool link 3</Menu.Item>
    <Menu.SubMenu title="下拉选项1" index="33">
      <Menu.Item>下拉选项一</Menu.Item>
      <Menu.Item>下拉选项二</Menu.Item>
    </Menu.SubMenu>
    <Menu.Item disabled>disabled</Menu.Item>
    <Menu.SubMenu title="下拉选项2" index="34">
      <Menu.Item index="100">下拉选项三</Menu.Item>
      <Menu.Item>下拉选项四</Menu.Item>
    </Menu.SubMenu>
  </Menu>
);
export const clickMenu = () => (
  <Menu defaultIndex="0" onSelect={action("selected!")} mode="vertical">
    <Menu.Item>cool link</Menu.Item>
    <Menu.Item>cool link 2</Menu.Item>
    <Menu.SubMenu title="点击下拉选项">
      <Menu.Item>下拉选项一</Menu.Item>
      <Menu.Item>下拉选项二</Menu.Item>
    </Menu.SubMenu>
  </Menu>
);
export const openedMenu = () => (
  <Menu
    defaultIndex="0"
    onSelect={action("selected!")}
    mode="vertical"
    defaultOpenSubMenus={["3"]}
  >
    <Menu.Item>cool link</Menu.Item>
    <Menu.Item>cool link 2</Menu.Item>
    <Menu.SubMenu title="默认展开下拉选项1">
      <Menu.Item>下拉选项一</Menu.Item>
      <Menu.Item>下拉选项二</Menu.Item>
    </Menu.SubMenu>
    <Menu.SubMenu title="默认展开下拉选项2">
      <Menu.Item>下拉选项三</Menu.Item>
      <Menu.Item>下拉选项四</Menu.Item>
    </Menu.SubMenu>
  </Menu>
);

storiesOf("Menu Component", module)
  .add("Menu", defaultMenu)
  .add("纵向的 Menu", clickMenu)
  .add("默认展开的纵向 Menu", openedMenu);
