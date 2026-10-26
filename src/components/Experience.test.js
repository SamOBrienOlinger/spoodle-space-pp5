import React from "react";
import { act, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { Router, Route, Switch, Link } from "react-router-dom";
import { createMemoryHistory } from "history";
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import Post from "../pages/posts/Post";
import PostPage from "../pages/posts/PostPage";
import PostsPage from "../pages/posts/PostsPage";
import PostForm from "../pages/posts/PostForm";
import ProfilePage from "../pages/profiles/ProfilePage";
import MyDogPage from "../pages/doghub/MyDogPage";
import DeleteDialog from "./DeleteDialog";
import MobileNavigation from "./MobileNavigation";
import { feedMemory } from "../utils/feedMemory";
import { preparePhoto } from "../utils/photos";

jest.mock("../api/axiosDefaults", () => ({ axiosReq: { get: jest.fn(), post: jest.fn(), put: jest.fn() }, axiosRes: { get: jest.fn(), post: jest.fn(), put: jest.fn(), delete: jest.fn() } }));
jest.mock("../hooks/useRedirect", () => ({ useRedirect: jest.fn() }));
jest.mock("../contexts/CurrentUserContext", () => { const user = { username: "sam", profile_id: 50 }; return { useCurrentUser: () => user, useSetCurrentUser: () => jest.fn() }; });
jest.mock("./FeedRightRail", () => () => null);
jest.mock("../pages/profiles/PopularProfiles", () => () => null);
jest.mock("../utils/photos", () => ({ IMAGE_HELP: "JPEG, PNG, WebP or GIF. Maximum 2 MB and 4096 × 4096 pixels.", preparePhoto: jest.fn() }));
const post = { id: 7, owner: "sam", profile_id: 50, title: "A good walk", content: "A story", image: null, comments_count: 0, likes_count: 0, is_owner: true };
const profile = { id: 50, owner: "sam", image: "profile.jpg", content: "About Sam", dog_profile: 20, dog_health: 21, dog_danger: null };
const page = results => ({ results, next: null });
const mount = (ui, route = "/") => { const history = createMemoryHistory({ initialEntries: [route] }); return { history, ...render(<Router history={history}>{ui}</Router>) }; };
beforeEach(() => { jest.resetAllMocks(); feedMemory.clear(); sessionStorage.clear(); window.scrollTo = jest.fn(); URL.createObjectURL = jest.fn(() => "blob:prepared"); URL.revokeObjectURL = jest.fn(); preparePhoto.mockImplementation(file => Promise.resolve(file)); });

test("mobile navigation exposes five labelled destinations", () => {
  mount(<MobileNavigation />);
  const nav = screen.getByRole("navigation", { name: "Mobile navigation" });
  expect(within(nav).getAllByRole("link").map(link => link.textContent)).toEqual(["Home", "Search", "Post", "My dog", "Profile"]);
  expect(within(nav).getByRole("link", { name: "My dog" })).toHaveAttribute("href", "/my-dog");
  expect(within(nav).getByRole("link", { name: "Profile" })).toHaveAttribute("href", "/profiles/50");
  expect(within(nav).queryByText("Sign out")).not.toBeInTheDocument();
});

test("text-only posts omit the photo panel; long captions expand", () => {
  mount(<Post {...post} content={"A long story. ".repeat(40)} />);
  expect(screen.queryByText("Photo unavailable")).not.toBeInTheDocument();
  expect(screen.queryByRole("button", { name: /full photo/ })).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Read more" }));
  expect(screen.getByRole("button", { name: "Show less" })).toHaveAttribute("aria-expanded", "true");
});

test("full image opens in an accessible dismissible dialog", async () => {
  mount(<Post {...post} image="dog.jpg" />);
  fireEvent.click(screen.getByRole("button", { name: /Open full photo/ }));
  expect(await screen.findByRole("dialog")).toHaveAttribute("aria-labelledby", "full-photo-title-7");
  fireEvent.click(screen.getByRole("button", { name: /close/i }));
  await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
});

test("a failed deletion keeps the record and dialog; success waits for the API", async () => {
  const done = jest.fn(); const close = jest.fn();
  axiosRes.delete.mockRejectedValueOnce(new Error("offline")).mockResolvedValueOnce({});
  mount(<DeleteDialog show label="dog profile" url="/dogprofiles/20/" onClose={close} onDeleted={done} />);
  fireEvent.click(screen.getByRole("button", { name: "Delete dog profile" }));
  await screen.findByRole("alert"); expect(done).not.toHaveBeenCalled(); expect(close).not.toHaveBeenCalled();
  fireEvent.click(screen.getByRole("button", { name: "Delete dog profile" }));
  await waitFor(() => expect(done).toHaveBeenCalledTimes(1)); expect(close).toHaveBeenCalledTimes(1);
});

test("post content stays available when comments fail and retry recovers", async () => {
  let fail = true;
  axiosReq.get.mockImplementation(url => url.startsWith("/posts/") ? Promise.resolve({ data: post }) : fail ? Promise.reject(new Error("offline")) : Promise.resolve({ data: page([]) }));
  mount(<Route path="/posts/:id"><PostPage /></Route>, "/posts/7");
  expect(await screen.findByRole("heading", { name: "A good walk" })).toBeInTheDocument();
  await screen.findByText(/couldn’t load comments/);
  expect(axiosReq.get).toHaveBeenCalledWith("/posts/7/", expect.any(Object));
  expect(document.querySelector('a[href*="undefined"]')).toBeNull();
  fail = false; fireEvent.click(screen.getByRole("button", { name: "Try again" }));
  expect(await screen.findByLabelText("Add a comment")).toBeInTheDocument();
});

test("post failure shows retry instead of an empty post", async () => {
  axiosReq.get.mockRejectedValue(new Error("offline"));
  mount(<Route path="/posts/:id"><PostPage /></Route>, "/posts/7");
  await screen.findByRole("alert");
  expect(screen.queryByRole("heading", { name: "A community moment" })).not.toBeInTheDocument();
  expect(document.querySelector('a[href*="undefined"]')).toBeNull();
});

test("dog hub uses profile record IDs and distinguishes an absent section", async () => {
  axiosReq.get.mockImplementation(url => Promise.resolve({ data: url === "/profiles/50/" ? profile : { id: 20, owner: "sam", dog_name: "Riley" } }));
  mount(<MyDogPage />, "/my-dog");
  expect(await screen.findByRole("heading", { name: "Riley" })).toBeInTheDocument();
  expect(axiosReq.get).toHaveBeenCalledWith("/dogprofiles/20/", expect.any(Object));
  fireEvent.click(screen.getByRole("link", { name: "Behaviour", exact: true }));
  expect(await screen.findByRole("link", { name: "Add behaviour" })).toHaveAttribute("href", "/dogdanger/create");
});

test("profile places the dog above posts and exposes account settings", async () => {
  axiosReq.get.mockImplementation(url => Promise.resolve({ data: url.startsWith("/profiles/") ? profile : url.startsWith("/dogprofiles/") ? { id: 20, dog_name: "Riley" } : page([post]) }));
  mount(<Route path="/profiles/:id"><ProfilePage /></Route>, "/profiles/50");
  const dog = await screen.findByRole("heading", { name: "Riley" });
  const title = await screen.findByRole("heading", { name: "A good walk" });
  expect(dog.compareDocumentPosition(title) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  fireEvent.click(screen.getByText("Account settings"));
  expect(screen.getByRole("link", { name: "Change password" })).toBeInTheDocument();
  fireEvent.click(screen.getByRole("link", { name: "About", exact: true }));
  expect(screen.getByText("About Sam")).toBeInTheDocument();
});

test("feed keeps sorting, query, loaded pages and scroll when returning from a post", async () => {
  axiosReq.get.mockResolvedValue({ data: { ...page([post]), next: "/posts/?page=2" } });
  const { history } = mount(<Switch><Route exact path="/"><PostsPage /></Route><Route path="/posts/:id"><Link to="/?q=walk&sort=-likes_count">Return to feed</Link></Route></Switch>, "/?q=walk&sort=-likes_count");
  await screen.findByRole("heading", { name: "A good walk" });
  expect(axiosReq.get.mock.calls[0][0]).toContain("search=walk");
  expect(axiosReq.get.mock.calls[0][0]).toContain("ordering=-likes_count");
  axiosReq.get.mockResolvedValue({ data: page([{ ...post, id: 8, title: "Another walk" }]) });
  fireEvent.click(screen.getByRole("button", { name: "A few more good dogs" }));
  await screen.findByRole("heading", { name: "Another walk" });
  Object.defineProperty(window, "scrollY", { configurable: true, value: 720 }); fireEvent.scroll(window);
  fireEvent.click(screen.getByRole("link", { name: "Another walk" }));
  expect(history.location.pathname).toBe("/posts/8");
  fireEvent.click(screen.getByRole("link", { name: "Return to feed" }));
  await screen.findByRole("heading", { name: "Another walk" });
  expect(screen.getByLabelText("Sort posts")).toHaveValue("-likes_count");
  expect(window.scrollTo).toHaveBeenCalledWith(0, 720);
  expect(axiosReq.get).toHaveBeenCalledTimes(2);
});

test("changing search never displays cached results for a different query", async () => {
  axiosReq.get.mockResolvedValueOnce({ data: page([post]) }).mockResolvedValue({ data: page([]) });
  mount(<PostsPage searchPage />, "/search?q=walk");
  await screen.findByRole("heading", { name: "A good walk" });
  fireEvent.change(screen.getByLabelText("Search posts by owner or title"), { target: { value: "nomatch" } });
  await screen.findByText("No tails on this trail.");
  expect(screen.queryByRole("heading", { name: "A good walk" })).not.toBeInTheDocument();
});

test("photo preparation, remove/replace, progress and expired-session drafts", async () => {
  let rejectUpload;
  axiosReq.post.mockImplementation((url, body, config) => { config.onUploadProgress({ loaded: 35, total: 100 }); return new Promise((resolve, reject) => { rejectUpload = reject; }); });
  mount(<PostForm />);
  expect(screen.getByText(/Maximum 2 MB/)).toBeInTheDocument();
  const file = new File(["photo"], "dog.png", { type: "image/png" });
  fireEvent.change(screen.getByLabelText(/Post photo/), { target: { files: [file] } });
  await screen.findByText("Photo ready.");
  expect(screen.getByRole("button", { name: "Replace photo" })).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Remove photo" }));
  expect(screen.queryByAltText("Selected upload preview")).not.toBeInTheDocument();
  fireEvent.change(screen.getByLabelText(/Post photo/), { target: { files: [file] } });
  await screen.findByText("Photo ready.");
  fireEvent.change(screen.getByLabelText(/Title/), { target: { value: "My draft" } });
  fireEvent.submit(screen.getByRole("form", { name: "Create post" }));
  await screen.findByText("Uploading photo: 35%");
  await act(async () => rejectUpload({ response: { status: 401 } }));
  expect(screen.getByLabelText(/Title/)).toHaveValue("My draft");
  expect(screen.getByRole("link", { name: /Sign in in a new tab/ })).toHaveAttribute("target", "_blank");
  expect(screen.getByRole("button", { name: "Post", exact: true })).toBeEnabled();
});
