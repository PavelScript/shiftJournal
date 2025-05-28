
import { createRoot } from "react-dom/client";
import "./index.css";
import Header from "./components/Header/Header";
import TableZayavki from "./components/TableZayavki/TableZayavki";

import AddButton from "./components/AddButton/AddButton";

createRoot(document.getElementById("root")).render(
  <>
    <Header  />
    <TableZayavki  />
    <AddButton />
  </>
);
