import * as React from "react";

import { Root } from "./styled";
import { useEffect, useState } from "react";
import { CellValue } from "../../types";

interface Props {
  value: CellValue;
  onClick: (e: React.MouseEvent) => void;
  rowOffset: number;
}

const Cell = ({ value, onClick, rowOffset }: Props) => {
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    setHasEntered(true);
  }, []);

  return (
    <Root
      onClick={onClick}
      value={value}
      rowOffset={rowOffset}
      hasEntered={hasEntered}
    />
  );
};

Cell.displayName = "Cell";

export default Cell;
