"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { signOut } from "@/lib/actions";
import type { Profile } from "@/lib/types";
import { MenuIcon, SearchIcon } from "@/components/icons";

const links = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore" },
  { href: "/write", label: "Write" },
  { href: "/about", label: "About" },
];

export function Navbar({ user }: { user: Profile | null }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function search(event: React.FormEvent) {
    event.preventDefault();
    const next = query.trim();
    router.push(next ? `/explore?q=${encodeURIComponent(next)}` : "/explore");
    setOpen(false);
  }

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <nav className="navbar">
        <Link href="/" className="logo-text">
          SerenFeed
        </Link>

        <ul className="nav-links">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className={pathname === link.href ? "active" : undefined}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="nav-right">
          <form className="search-box" onSubmit={search}>
            <SearchIcon />
            <input
              type="search"
              placeholder="Search stories..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search stories"
            />
          </form>

          {user ? (
            <>
              <span className="user-chip">{user.name}</span>
              <Link href="/write" className="signup-btn">
                Write
              </Link>
              <form action={signOut}>
                <button type="submit" className="logout-btn">
                  Log out
                </button>
              </form>
            </>
          ) : (
            <>
              <Link href="/login" className="login-btn">
                Log in
              </Link>
              <Link href="/signup" className="signup-btn">
                Sign up
              </Link>
            </>
          )}

          <button
            className="menu-btn"
            type="button"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
          >
            <MenuIcon />
          </button>
        </div>
      </nav>

      {open ? (
        <button
          type="button"
          className="mobile-overlay"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
        />
      ) : null}

      <div className={`mobile-menu${open ? " active" : ""}`}>
        <button className="close-menu" type="button" onClick={() => setOpen(false)} aria-label="Close menu">
          ×
        </button>
        <ul>
          {links.map((link) => (
            <li key={`m-${link.href}`}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
          {user ? (
            <>
              <li>
                <Link href="/write">Write a story</Link>
              </li>
              <li>
                <form action={signOut}>
                  <button type="submit" className="logout-btn">
                    Log out
                  </button>
                </form>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/login">Log in</Link>
              </li>
              <li>
                <Link href="/signup">Sign up</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </header>
  );
}
