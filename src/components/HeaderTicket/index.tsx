import { useEffect } from "react";

export const HeaderTicketComponent = () => {
    useEffect(() => {
        document.title = "Ticket Timbangan";
    }, []);
  return (
    <header className="fixed w-full h-12 bg-gray-900 text-white shadow-md z-50">
      <div className="max-w-screen-xl p-2 pl-7">
        <h4 className="text-lg font-bold">
          PT Setia Bersama
        </h4>
      </div>
    </header>
  );
};
