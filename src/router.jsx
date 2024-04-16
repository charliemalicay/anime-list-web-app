import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import AnimePage from "./AnimePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "anime/:animeID",
    element: <AnimePage />,
  },
]);

export { router };
