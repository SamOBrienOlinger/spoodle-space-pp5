import { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useAuthReady, useCurrentUser } from "../contexts/CurrentUserContext";

export function useRedirect(status) {
  const user = useCurrentUser();
  const ready = useAuthReady();
  const history = useHistory();
  const location = useLocation();
  useEffect(() => {
    if (!ready) return;
    if (status === "loggedOut" && !user) history.replace("/signin", { from: location.pathname + location.search });
    if (status === "loggedIn" && user) {
      const from = location.state?.from;
      history.replace(typeof from === "string" && from.startsWith("/") && !from.startsWith("//") ? from : "/feed");
    }
  }, [ready, user, status, history, location.pathname, location.search, location.state]);
}
