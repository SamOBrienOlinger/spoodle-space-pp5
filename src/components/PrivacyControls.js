import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { PRIVACY_KEY, PRIVACY_EVENT, readPrivacyChoice, savePrivacyChoice, clearSavedDrafts } from "../privacy";

const privacyUrl = `${process.env.PUBLIC_URL || ""}/privacy.html`;
const css = `
.spoodle-privacy{font:1rem/1.5 system-ui,sans-serif;color:#292034;text-align:left;box-sizing:border-box}
.spoodle-privacy *{box-sizing:border-box}.spoodle-privacy a{color:#592482;text-decoration:underline}
.spoodle-privacy button{font:inherit;min-height:44px;padding:.6rem .9rem;border:2px solid #592482;border-radius:.55rem;background:white;color:#592482;cursor:pointer;white-space:normal}
.spoodle-privacy button:hover{background:#f4edf8}.spoodle-privacy :focus-visible{outline:3px solid #b04d00;outline-offset:3px}
.spoodle-privacy h2{font-size:1.3rem;margin:0 0 .75rem}.spoodle-privacy p{margin:.6rem 0}
.spoodle-privacy-actions{display:flex;flex-wrap:wrap;gap:.6rem;margin-top:1rem}.spoodle-privacy-actions button{flex:1 1 10rem}
.spoodle-privacy-footer{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:.75rem;padding:1rem;background:#f8f4fa;position:relative;z-index:1}
.spoodle-privacy-banner{position:fixed;bottom:max(1rem,env(safe-area-inset-bottom));left:1rem;right:1rem;max-width:48rem;max-height:65vh;overflow:auto;margin:auto;padding:1rem;background:white;border:2px solid #592482;border-radius:.75rem;box-shadow:0 8px 40px #0003;z-index:1040}
.spoodle-privacy label{display:block;font-weight:600;margin:1rem 0}.spoodle-privacy input{width:1.2rem;height:1.2rem;margin-right:.7rem;vertical-align:middle}
.spoodle-privacy-status{flex-basis:100%;text-align:center;font-size:.9rem}
@media(max-width:480px){.spoodle-privacy-banner{left:.5rem;right:.5rem}.spoodle-privacy-actions button{flex-basis:100%}}
`;

export default function PrivacyControls() {
  const [choice, setChoice] = useState(readPrivacyChoice);
  const [show, setShow] = useState(false);
  const [drafts, setDrafts] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    const refresh = () => setChoice(readPrivacyChoice());
    const storage = event => { if (event.key === PRIVACY_KEY || event.key === null) refresh(); };
    const visible = () => { if (!document.hidden) refresh(); };
    window.addEventListener(PRIVACY_EVENT, refresh);
    window.addEventListener("storage", storage);
    document.addEventListener("visibilitychange", visible);
    return () => {
      window.removeEventListener(PRIVACY_EVENT, refresh);
      window.removeEventListener("storage", storage);
      document.removeEventListener("visibilitychange", visible);
    };
  }, []);
  const open = () => { setDrafts(readPrivacyChoice()?.drafts === true); setShow(true); };
  const save = allowed => {
    const saved = savePrivacyChoice(allowed);
    setChoice(saved);
    setShow(false);
    setMessage(saved.persistent ? "Privacy choice saved. Change it at any time using Cookie settings." : "Choice applied for this page only because browser storage is unavailable.");
  };
  const clear = () => { clearSavedDrafts(); setMessage("Saved post drafts cleared from this tab. Text still on an open form is not erased."); };
  return <>
    <style>{css}</style>
    <footer className="spoodle-privacy spoodle-privacy-footer" aria-label="Privacy controls">
      <a href={privacyUrl}>Privacy &amp; cookies</a>
      <button type="button" onClick={open}>Cookie settings</button>
      <button type="button" onClick={clear}>Clear saved drafts</button>
      <p className="spoodle-privacy-status" role="status" aria-live="polite">{message}</p>
    </footer>
    {!choice && <section className="spoodle-privacy spoodle-privacy-banner" aria-labelledby="spoodle-privacy-title">
      <h2 id="spoodle-privacy-title">Your cookie and privacy choices</h2>
      <p>Login and security cookies support the account features you request. Optional draft-saving is off until you choose. You can use the site and create posts without saving drafts on this device.</p>
      <p>This control does not enable advertising or analytics. Your choice is remembered for up to 180 days.</p>
      <a href={privacyUrl}>Read the full privacy policy</a>
      <div className="spoodle-privacy-actions">
        <button type="button" onClick={() => save(false)}>Reject optional</button>
        <button type="button" onClick={open}>Choose settings</button>
        <button type="button" onClick={() => save(true)}>Accept optional</button>
      </div>
    </section>}
    <Modal show={show} onHide={() => setShow(false)} aria-labelledby="spoodle-settings-title" centered scrollable>
      <Modal.Header closeButton><Modal.Title id="spoodle-settings-title">Cookie and privacy settings</Modal.Title></Modal.Header>
      <Modal.Body className="spoodle-privacy">
        <p><strong>Necessary login and security:</strong> these are not switched off by Reject optional. To end your authenticated session, use Sign out. Browser blocking of authentication cookies may prevent sign-in.</p>
        <p><strong>Necessary choice record:</strong> local storage remembers your permission, notice version and choice time for up to 180 days. It is not an advertising identifier.</p>
        <label htmlFor="spoodle-drafts"><input id="spoodle-drafts" type="checkbox" checked={drafts} onChange={event => setDrafts(event.target.checked)} />Remember unfinished post text in this tab</label>
        <p>This optional feature saves post title/content in session storage, scoped to the account and form. It does not save passwords or selected photo files. Closing the tab normally clears session storage, although browser session restoration can retain it. Switching this off removes saved drafts while leaving text on your currently open form.</p>
        <p>Submission is different: a real post is sent to the service when you choose Post or Save changes. Posts and dog records are not a private vault. <a href={privacyUrl}>Read visibility, retention and rights information</a>.</p>
        <div className="spoodle-privacy-actions"><button type="button" onClick={() => save(false)}>Reject optional</button><button type="button" onClick={() => save(drafts)}>Save selected choice</button><button type="button" onClick={() => setShow(false)}>Close without changing</button></div>
      </Modal.Body>
    </Modal>
  </>;
}
