import * as React from "react";
import {
    createBrowserRouter
} from "react-router-dom";
import "./index.css";
import Root, {actoin as rootAction, loader as rootLoader} from "./routes/root";
import ErrorPage from "./error-page";
import Contact, {loader as contactLoader} from "./routes/contact";
import EditContact, {action as editAction} from "./routes/edit";
import { action as destroyAction } from "./routes/destroy";
import Index from "./routes";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
        {
          errorElement: <ErrorPage />,
          children: [
            {
              index: true,
              element: <Index />  
            },
            {   
              path: 'contacts/:contactId',
              element: <Contact />,
              loader: contactLoader
          }
          ]
              

        },

        
        {
          path: "contacts/:contactId/edit",
          element: <EditContact />,
          loader: contactLoader,
          action: editAction
        },
        {
          path: "contacts/:contactId/lol",
          action: destroyAction,
          errorElement: <div>Oops! There was an error</div>
        }
      
    ]
  },
 
]);

