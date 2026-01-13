import { Outlet } from 'react-router';

export default function RootLayout() {
  return (
    <div className="max-w-5xl mx-auto px-2 py-4">
      <p className="flex justify-center mt-15 mb-10 text-3xl bg-primary rounded-2xl p-6 text-white font-bold">
        Important news!
      </p>
      <Outlet />
    </div>
  );
}
