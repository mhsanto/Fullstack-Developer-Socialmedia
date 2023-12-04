import Navbar from "@/components/nav/nav";
import LeftSidebar from "@/components/sidebar/leftsidebar";
import RightSidebar from "@/components/sidebar/rightsidebar";
import React from "react";

const LayoutDesign = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className=" background-light850_dark100 relative">
      <Navbar />
      <div className="flex">
        <LeftSidebar />
        <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-36 max:md:pb-14 sm:px-14">
          <div className="mx-auto w-full max-w-5xl">{children}</div>
        </section>
        <RightSidebar />
  
      </div>
      toaster
    </main>
  );
};

export default LayoutDesign;
