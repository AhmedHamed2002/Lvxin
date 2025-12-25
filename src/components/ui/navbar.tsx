"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Moon,
  Sun,
  LogOut,
  User,
  Settings,
  Menu,
  BookOpen,
  Home,
  DollarSign,
  Info,
  Phone,
  HelpCircle,
} from "lucide-react";
import Swal from "sweetalert2";
import { userService } from "@/services/userService";
import Image from "next/image";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  
  // Load user info & theme
  useEffect(() => {
    const loadUser = () => {
      const token = localStorage.getItem("Lvxin_token");
      setLoggedIn(!!token);

      if (token) {
        userService.getUserImage().then((res) => {
          if (res?.data) {
            setUsername(res.data.name);
          }
        });
      }
    };

    loadUser();

    window.addEventListener("login-success", loadUser);

    return () => {
      window.removeEventListener("login-success", loadUser);
    };
  }, []);


  const toggleDark = () => {
    const isDark = !darkMode;
    setDarkMode(isDark);
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  };

  const handleLogout = async () => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, logout!",
      background: darkMode ? "#1b1b1b" : "#fff",
      color: darkMode ? "#f3f4f6" : "#111827",
    });

    if (confirm.isConfirmed) {
      await userService.logout();
      localStorage.removeItem("Lvxin_token");
      setLoggedIn(false);
      setUsername("");
      router.push("/login");
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Logged out successfully",
        showConfirmButton: false,
        timer: 2000,
        background: darkMode ? "#1b1b1b" : "#fff",
        color: darkMode ? "#f3f4f6" : "#111827",
      });
    }
  };

  const isActive = (path: string) =>
    pathname === path
      ? "text-[#184892] dark:text-[#1a52a6] pb-1"
      : "text-gray-600 dark:text-gray-300 hover:text-blue-800 dark:hover:text-blue-600";

  return (
    <nav className="fixed w-full z-50 top-0 border-b bg-white/95 dark:bg-neutral-900 backdrop-blur-md shadow-sm transition-colors duration-300">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center px-4 py-3">
        {/* Logo */}
        <Link href="/home" className="flex items-center space-x-2">
          <Image src="/assets/logo.png" alt="LVXIN" width={140} height={140} />
        </Link>

        {/* Links */}
        <ul className="hidden md:flex items-center space-x-5 font-medium">
          <li>
            <Link href="/home" className={`flex items-center md:text-xs lg:text-lg gap-1 ${isActive("/home")}`}>
              <Home className="w-5 h-5" />
              <span className="sm:hidden md:block">Home</span>
            </Link>
          </li>

          <li>
            <Link href="/pricing" className={`flex items-center md:text-xs lg:text-lg gap-1 ${isActive("/pricing")}`}>
              <DollarSign className="w-5 h-5" />
              <span className="sm:hidden md:block">Pricing</span>
            </Link>
          </li>

          <li>
            <Link href="/about-us" className={`flex items-center md:text-xs lg:text-lg gap-1 ${isActive("/about-us")}`}>
              <Info className="w-5 h-5" />
              <span className="sm:hidden md:block">About Us</span>
            </Link>
          </li>

          <li>
            <Link href="/contact-us" className={`flex items-center md:text-xs lg:text-lg gap-1 ${isActive("/contact-us")}`}>
              <Phone className="w-5 h-5" />
              <span className="sm:hidden md:block">Contact Us</span>
            </Link>
          </li>

          <li>
            <Link href="/blog" className={`flex items-center md:text-xs lg:text-lg gap-1 ${isActive("/blog")}`}>
              <BookOpen className="w-5 h-5" />
              <span className="sm:hidden md:block">Blog</span>
            </Link>
          </li>

          <li>
            <Link href="/faq" className={`flex items-center md:text-xs lg:text-lg gap-1 ${isActive("/faq")}`}>
              <HelpCircle className="w-5 h-5" />
              <span className="sm:hidden md:block">FAQ</span>
            </Link>
          </li>
        </ul>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggleDark} className="rounded-full">
            {darkMode ? <Sun className="text-yellow-400" /> : <Moon className="text-blue-600" />}
          </Button>

          {loggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center cursor-pointer">
                    <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-blue-800 text-white font-semibold">
                      {username?.charAt(0)?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden lg:block text-sm">{username}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 dark:bg-neutral-800">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile" className={`cursor-pointer ${isActive("/profile")}`}>
                    <User className="mr-2 w-4 h-4" /> Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/edit-profile" className={`cursor-pointer ${isActive("/edit-profile")}`}>
                    <Settings className="mr-2 w-4 h-4" /> Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className="text-red-500 cursor-pointer">
                  <LogOut className="mr-2 w-4 h-4" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              onClick={() => router.push("/login")}
              variant="outline"
              className="px-4 py-1 text-sm font-medium bg-blue-800 hover:border-blue-600 dark:bg-blue-900 dark:hover:border-blue-800 cursor-pointer text-white"
            >
              Login
            </Button>
          )}

          {/* Mobile */}
          <div className="md:hidden">
            <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="flex flex-col gap-8 px-6 pt-14">
                <SheetHeader>
                  <SheetTitle className="font-bold text-2xl text-[#184892] dark:text-[#1a52a6]">
                    LVXIN
                  </SheetTitle>
                  <SheetDescription>
                    Pioneering advanced AI-powered legal solutions for modern businesses
                  </SheetDescription>
                </SheetHeader>

                <ul className="flex flex-col ms-4 space-y-4 mt-6 text-gray-700 dark:text-gray-200">
                  <li>
                    <Link
                      href="/home"
                      onClick={() => setMenuOpen(false)}
                      className={`flex items-center gap-2 ${isActive("/home")}`}
                    >
                      <Home className="w-5 h-5" /> Home
                    </Link>
                  </li>

                  <li>
                    <Link 
                      href="/pricing" 
                      onClick={() => setMenuOpen(false)}
                      className={`flex items-center gap-2 ${isActive("/pricing")}`}
                    >
                      <DollarSign className="w-5 h-5" /> Pricing
                    </Link>
                  </li>

                  <li>
                    <Link
                    href="/about-us"
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center gap-2 ${isActive("/about-us")}`}
                    >
                      <Info className="w-5 h-5" /> About Us
                    </Link>
                  </li>

                  <li>
                    <Link 
                      href="/contact-us"
                      onClick={() => setMenuOpen(false)}
                      className={`flex items-center gap-2 ${isActive("/contact-us")}`}
                    >
                      <Phone className="w-5 h-5" /> Contact Us
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="/blog"
                      onClick={() => setMenuOpen(false)}
                      className={`flex items-center gap-2 ${isActive("/blog")}`}
                    >
                      <BookOpen className="w-5 h-5" /> Blog
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="/faq"
                      onClick={() => setMenuOpen(false)}
                      className={`flex items-center gap-2 ${isActive("/faq")}`}
                    >
                      <HelpCircle className="w-5 h-5" /> FAQ
                    </Link>
                  </li>
                  {!loggedIn && (
                    <li>
                      <Button
                        onClick={() => { setMenuOpen(false); router.push("/login"); }}
                        variant="outline"
                        className="w-full text-left text-white bg-blue-800 hover:border-blue-600 dark:bg-blue-900 dark:hover:border-blue-800  cursor-pointer"
                      >
                        Login
                      </Button>
                    </li>
                  )}
                </ul>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
