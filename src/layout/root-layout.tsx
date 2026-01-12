import { Outlet } from 'react-router';

export default function RootLayout() {
  return (
    <div className="max-w-3xl mx-auto">
      <Outlet />
    </div>
  );
}
