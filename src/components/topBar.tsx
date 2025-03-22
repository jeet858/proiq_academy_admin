import Image from "next/image";
import { faCircleUser, menuBarView, notifications } from "public";
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";

const TopBar: React.FunctionComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLImageElement>(null);
  const { data: session, status } = useSession();
  const pathName = usePathname();
  const router = useRouter();
  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <div className="top-bar h-fit w-full rounded-t-lg bg-[#FABA0999] px-2 py-3">
      {/* profile detail section */}
      <div className="flex h-full items-center justify-end">
        {/* Notification Block */}
        {/* <div className="w-[27px]">
          <Image src={notifications} alt="Notifications" />
        </div> */}
        {/* Profile-icon block */}
        {/* <div className="ml-4 mr-1 w-[27px]">
          <Image src={faCircleUser} alt="User" />
        </div> */}
        {/* name-designation block */}
        <div className="flex flex-col px-[1%] font-medium text-[#202B5D]">
          <div className="text-base md:text-lg">
            {session?.user.name}, {session?.user.email}
          </div>
          <div className="text-base">{session?.user.role}</div>
        </div>
        <div className="flex w-[27px] items-center lg:hidden">
          <Image
            ref={menuRef}
            onClick={() => setIsOpen(!isOpen)}
            alt=""
            src={menuBarView}
          />
          <div className="relative inline-block" ref={menuRef}>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="fixed left-0 z-10 w-screen bg-[#202B5D]"
                >
                  <ul className="py-2 text-white">
                    <li className="pb-2">
                      <Link
                        href="student-registration"
                        className={`relative flex gap-3 py-3 pl-5 hover:rounded-[45px] hover:bg-[#FABA0999] ${
                          pathName === "/student-registration"
                            ? "rounded-full bg-[#FABA09]"
                            : ""
                        }`}
                      >
                        Student Registration
                      </Link>
                    </li>
                    <li className="pb-2">
                      <Link
                        href="create-centre"
                        className={`relative flex gap-3 py-3 pl-5 hover:rounded-[45px] hover:bg-[#FABA0999] ${
                          pathName.includes("centre")
                            ? "rounded-full bg-[#FABA09]"
                            : ""
                        }`}
                      >
                        Create Centre
                      </Link>
                    </li>
                    <li className="pb-2">
                      <Link
                        href="create-course"
                        className={`relative flex gap-3 py-3 pl-5 hover:rounded-[45px] hover:bg-[#FABA0999] ${
                          pathName?.includes("course")
                            ? "rounded-full bg-[#FABA09]"
                            : ""
                        }`}
                      >
                        Create Course
                      </Link>
                    </li>
                    <li className="pb-2">
                      <Link
                        href="attendance"
                        className={`relative flex gap-3 py-3 pl-5 hover:rounded-[45px] hover:bg-[#FABA0999] ${
                          pathName?.includes("attendance")
                            ? "rounded-full bg-[#FABA09]"
                            : ""
                        }`}
                      >
                        Attendance / Footfall
                      </Link>
                    </li>
                    <li className="pb-2">
                      <Link
                        href="payment-collection"
                        className={`relative flex gap-3 py-3 pl-5 hover:rounded-[45px] hover:bg-[#FABA0999] ${
                          pathName.includes("payment")
                            ? "rounded-full bg-[#FABA09]"
                            : ""
                        }`}
                      >
                        Payment Collection
                      </Link>
                    </li>
                    <li className="pb-2">
                      <Link
                        href="update-student"
                        className="relative flex gap-3 py-3 pl-5 hover:rounded-[45px] hover:bg-[#FABA0999]"
                      >
                        Update Student Reg.
                      </Link>
                    </li>
                    <li className="pb-2">
                      <Link
                        href="readdmission"
                        className="relative flex gap-3 py-3 pl-5 hover:rounded-[45px] hover:bg-[#FABA0999]"
                      >
                        Student Readdmission
                      </Link>
                    </li>
                    <li className="pb-4">
                      <button
                        className="relative flex w-full gap-3 py-3 pl-5 hover:rounded-[45px] hover:bg-[#FABA0999]"
                        onClick={async () => {
                          await signOut({ redirect: false });
                          await router.push("/");
                        }}
                      >
                        Sign Out
                      </button>
                    </li>
                    <li className="pb-2">
                      {" "}
                      {/* Add pb-2 for consistent padding-bottom */}
                      <Link
                        href="user-creation"
                        className={`relative flex gap-3 py-3 pl-5 hover:rounded-[45px] hover:bg-[#FABA0999] ${
                          pathName.includes("user")
                            ? "rounded-full bg-[#FABA09]"
                            : ""
                        }`}
                      >
                        User Creation
                      </Link>
                    </li>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TopBar;
