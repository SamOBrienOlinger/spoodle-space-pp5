import React from "react";
import { Link } from "react-router-dom";
import { isPagesPreview, liveAccountUrl } from "../config/deployment";

// Stay in this tab, on the real frontend, for the entire sign-in flow.
export default function AccountLink({ to, children, ...props }) {
  return isPagesPreview ? (
    <a {...props} href={liveAccountUrl(to === "/signup" ? "signup" : "signin")}>
      {children}
    </a>
  ) : (
    <Link {...props} to={to}>{children}</Link>
  );
}
