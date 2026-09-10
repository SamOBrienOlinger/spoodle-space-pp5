import React from "react";
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import FormPage from "./FormPage";
import PostCreateForm from "../pages/posts/PostCreateForm";
import PostEditForm from "../pages/posts/PostEditForm";
import DogProfileCreateForm from "../pages/dogprofiles/DogProfileCreateForm";
import DogProfileEditForm from "../pages/dogprofiles/DogProfileEditForm";
import DogHealthCreateForm from "../pages/doghealth/DogHealthCreateForm";
import DogHealthEditForm from "../pages/doghealth/DogHealthEditForm";
import DogDangerCreateForm from "../pages/dogdanger/DogDangerCreateForm";
import DogDangerEditForm from "../pages/dogdanger/DogDangerEditForm";
import ProfileEditForm from "../pages/profiles/ProfileEditForm";
import UsernameForm from "../pages/profiles/UsernameForm";
import UserPasswordForm from "../pages/profiles/UserPasswordForm";
import SignInForm from "../pages/auth/SignInForm";
import SignUpForm from "../pages/auth/SignUpForm";
import CommentCreateForm from "../pages/comments/CommentCreateForm";
import CommentEditForm from "../pages/comments/CommentEditForm";

jest.mock("../api/axiosDefaults", () => ({ axiosReq: { get: jest.fn(), post: jest.fn(), put: jest.fn() }, axiosRes: { post: jest.fn(), put: jest.fn() } }));
jest.mock("../hooks/useRedirect", () => ({ useRedirect: jest.fn() }));
jest.mock("../contexts/CurrentUserContext", () => { const user = { username: "sam", profile_id: 1 }; return { useCurrentUser: () => user, useSetCurrentUser: () => jest.fn() }; });
jest.mock("./FeedRightRail", () => () => null);
jest.mock("react-notifications", () => ({ NotificationManager: { success: jest.fn(), error: jest.fn() } }));
const record = { is_owner: true, title: "A walk", content: "About us", image: "photo.jpg", name: "Sam", dog_name: "Riley", dog_age: "3 years", dog_color: "Apricot", dog_bio: "Loves walks", dog_profile_image: "dog.jpg", vet_name: "Example vet", vet_phone: "0123456789", vet_email: "vet@example.test", kennel_cough: "Notes", rabies: "Notes", allergies: "None", bites_babies: "No", bites_kids: "No", bites_teenagers: "No", bites_burglars: "Unknown", dangerously_cute: "Yes" };
const mount = Component => render(<MemoryRouter initialEntries={["/example/1/edit"]}><Route path="/example/:id/edit"><Component /></Route></MemoryRouter>);
beforeEach(() => { jest.clearAllMocks(); axiosReq.get.mockResolvedValue({ data: record }); URL.createObjectURL = jest.fn(() => "blob:new-photo"); URL.revokeObjectURL = jest.fn(); });

test.each([
  [PostCreateForm, 3], [PostEditForm, 3], [DogProfileCreateForm, 5], [DogProfileEditForm, 5],
  [DogHealthCreateForm, 6], [DogHealthEditForm, 6], [DogDangerCreateForm, 5], [DogDangerEditForm, 5],
  [ProfileEditForm, 2], [UsernameForm, 1], [UserPasswordForm, 2], [SignInForm, 2], [SignUpForm, 3],
])("%p renders each field once with an associated label", async (Component, count) => {
  const { container } = mount(Component);
  await act(async () => {});
  const fields = [...container.querySelectorAll("form input, form textarea")];
  expect(fields).toHaveLength(count);
  expect(new Set(fields.map(field => field.name)).size).toBe(count);
  fields.forEach(field => expect(field.labels.length).toBeGreaterThan(0));
});

test("Doggy danger shows the API error at the matching field and preserves values", async () => {
  axiosReq.post.mockRejectedValue({ response: { status: 400, data: { bites_kids: ["Please describe this behaviour."] } } });
  mount(DogDangerCreateForm);
  fireEvent.change(screen.getByLabelText(/Bites kids/), { target: { value: "No biting" } });
  fireEvent.submit(screen.getByRole("form", { name: "Doggy danger" }));
  expect(await screen.findByText("Please describe this behaviour.")).toBeInTheDocument();
  expect(screen.getByLabelText(/Bites kids/)).toHaveAttribute("aria-describedby", "bites_kids-error");
  expect(screen.getByLabelText(/Bites kids/)).toHaveValue("No biting");
  expect(screen.getByLabelText(/Bites babies/)).not.toHaveAttribute("aria-invalid");
  expect(axiosReq.post.mock.calls[0][1].get("bites_kids")).toBe("No biting");
});

test("replacing a dog photo refreshes the preview and keeps its API field name", async () => {
  axiosReq.put.mockRejectedValue(new Error("offline"));
  mount(DogProfileEditForm);
  await screen.findByDisplayValue("Riley");
  const file = new File(["test image"], "dog.png", { type: "image/png" });
  fireEvent.change(screen.getByLabelText("Dog photo"), { target: { files: [file] } });
  expect(screen.getByAltText("Dog photo preview")).toHaveAttribute("src", "blob:new-photo");
  fireEvent.submit(screen.getByRole("form", { name: "Doggy profile" }));
  await screen.findByText("Your changes couldn’t be saved. Please try again.");
  expect(axiosReq.put.mock.calls[0][1].get("dog_profile_image")).toBe(file);
});

test("creating a post without a selected photo does not send an undefined file", async () => {
  axiosReq.post.mockRejectedValue(new Error("offline"));
  mount(PostCreateForm);
  fireEvent.submit(screen.getByRole("form", { name: "Create post" }));
  await screen.findByText("Your changes couldn’t be saved. Please try again.");
  expect(axiosReq.post.mock.calls[0][1].has("image")).toBe(false);
});

test("the shared form prevents duplicate submissions while saving", async () => {
  let resolve;
  const submit = jest.fn(() => new Promise(done => { resolve = done; }));
  render(<FormPage auth title="Example" onSubmit={submit}><input aria-label="Example field" /></FormPage>);
  const form = screen.getByRole("form", { name: "Example" });
  fireEvent.submit(form); fireEvent.submit(form);
  expect(submit).toHaveBeenCalledTimes(1);
  expect(screen.getByLabelText("Example field")).toBeDisabled();
  await act(async () => resolve());
  expect(screen.getByRole("button", { name: "Save changes" })).toBeEnabled();
});

test("clearing an edited comment disables Save changes", () => {
  render(<CommentEditForm id={8} content="Original" />);
  fireEvent.change(screen.getByLabelText("Edit comment"), { target: { value: "   " } });
  expect(screen.getByRole("button", { name: "Save changes" })).toBeDisabled();
});

test("a failed comment submission retains the draft and displays an error", async () => {
  axiosRes.post.mockRejectedValue(new Error("offline"));
  render(<MemoryRouter><CommentCreateForm post={11} profile_id={1} /></MemoryRouter>);
  fireEvent.change(screen.getByLabelText("Add a comment"), { target: { value: "A lovely walk" } });
  fireEvent.click(screen.getByRole("button", { name: "Post comment" }));
  await waitFor(() => expect(screen.getByRole("alert")).toHaveTextContent("Please try again"));
  expect(screen.getByLabelText("Add a comment")).toHaveValue("A lovely walk");
  expect(screen.getByRole("button", { name: "Post comment" })).toBeEnabled();
});
