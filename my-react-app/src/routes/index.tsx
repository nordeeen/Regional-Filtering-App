import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../layouts';
import { loaderDatas } from '../fakeApi';
import NotFound from '../pages/NotFound';
import FilterPage from '../pages/Home';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <FilterPage />, loader: loaderDatas },
      { path: '*', element: <NotFound /> },
    ],
  },
]);
