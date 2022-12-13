import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthProvider from "./provider/auth-provider";
import routes from "./routes";

function App() {
  const router = createBrowserRouter(
    routes.map((item) => ({
      path: item.path,
      element: (
        <AuthProvider>
          {item.layout ? item.layout(item.element) : item.element}
        </AuthProvider>
      ),
    }))
  );

  return <RouterProvider router={router} />;
}

export default App;
