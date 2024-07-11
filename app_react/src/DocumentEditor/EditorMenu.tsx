import React, { ReactElement } from "react";
import { useTheme } from "@mui/material";
import {
  MenuButtonBlockquote,
  MenuButtonBold,
  MenuButtonBulletedList,
  MenuButtonCode,
  MenuButtonCodeBlock,
  MenuButtonEditLink,
  MenuButtonItalic,
  MenuButtonOrderedList,
  MenuButtonRedo,
  MenuButtonRemoveFormatting,
  MenuButtonUndo,
  MenuControlsContainer,
  MenuDivider,
  MenuSelectHeading,
} from "mui-tiptap";

export default function EditorMenuControls(): ReactElement {
  const theme = useTheme();
  return (
    <>
      <MenuControlsContainer>
        <MenuSelectHeading />

        <MenuDivider />

        <MenuButtonBold />

        <MenuButtonItalic />

        <MenuDivider />

        <MenuButtonEditLink />

        <MenuDivider />

        <MenuButtonOrderedList />

        <MenuButtonBulletedList />

        <MenuDivider />

        <MenuButtonBlockquote />

        <MenuDivider />

        <MenuButtonCode />

        <MenuButtonCodeBlock />

        <MenuDivider />

        <MenuButtonRemoveFormatting />

        <MenuDivider />

        <MenuButtonUndo />
        <MenuButtonRedo />
      </MenuControlsContainer>
    </>
  );
}
