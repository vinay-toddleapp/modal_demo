import { DataEditor, GridCellKind } from "@glideapps/glide-data-grid";
import React, { useCallback, useState } from "react";
import Editor from "./component/Editor";

const App = () => {
  const [tableData] = useState([{ comment: "Click to see comment" }]);
  const [column] = useState([{ id: "comment", title: "Comment", width: 200 }]);

  const getCellContent = useCallback(
    (cell) => {
      const [col, row] = cell;
      const dataRow = tableData[row];
      const indexes = ["comment"];
      const key = indexes[col];
      const data = dataRow[key];

      return {
        kind: GridCellKind.Custom,
        allowOverlay: true,
        readonly: false,
        data: data,
        copyData: JSON.stringify(data),
      };
    },
    [tableData]
  );

  const renderer = {
    kind: GridCellKind.Custom,

    provideEditor: () => ({
      editor: Editor,
      styleOverride: {
        // position: "fixed",
        // left: "12.5vw",
        // top: "12.5vh",
        // width: "75vw",
        // borderRadius: "9px",
        // maxWidth: "unset",
        // maxHeight: "unset",
      },
      disablePadding: true,
    }),
    isMatch: (cell) => {
      return cell.kind === GridCellKind.Custom;
    },
    draw: (args) => {
      const { cell, ctx, rect } = args;
      const { x, y, width, height } = rect;
      const { data } = cell;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const centerX = x + width / 2;
      const centerY = y + height / 2;
      ctx.fillStyle = "black";
      ctx.font = "14px";
      ctx.fillText(data, centerX, centerY);
      return true;
    },
  };

  return (
    <>
      <DataEditor
        columns={column}
        rows={tableData.length}
        getCellContent={getCellContent}
        customRenderers={[renderer]}
      />
      <div id="portal" />
    </>
  );
};

export default App;
