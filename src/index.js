import React from 'react';
import ReactDOM from 'react-dom/client';
import {RouterProvider,} from "react-router-dom";
import { routes } from './routes';
import 'bootstrap/dist/css/bootstrap.min.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={routes} />);
