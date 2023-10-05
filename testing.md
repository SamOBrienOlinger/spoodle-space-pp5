# [Manual Testing](#manual-testing)

Click **[here](README.md)** to return to the **README.md** file.

A series of manual tests were carried out to verify that all functionalities performed as intended. Below are the test cases.

## Asset Component Test Cases

### Test Case 1: Render Asset with Spinner

**Test Case Description:** Verify that the `Asset` component renders correctly with a spinner when the `spinner` prop is set to `true`.

**Test Steps:**
1. Render the `Asset` component with the `spinner` prop set to `true`.
2. Check if the spinner is displayed.

**Expected Result:** The `Asset` component should render with a visible spinner.

**Result:** Passed

### Test Case 2: Render Asset with Image

**Test Case Description:** Verify that the `Asset` component renders correctly with an image when the `src` prop is provided.

**Test Steps:**
1. Render the `Asset` component with the `src` prop containing a valid image URL.
2. Check if the image is displayed.

**Expected Result:** The `Asset` component should render with a visible image.

**Result:** Passed

### Test Case 3: Render Asset with Message

**Test Case Description:** Verify that the `Asset` component renders correctly with a message when the `message` prop is provided.

**Test Steps:**
1. Render the `Asset` component with the `message` prop containing a valid message text.
2. Check if the message is displayed.

**Expected Result:** The `Asset` component should render with a visible message.

**Result:** Passed

### Test Case 4: Render Asset with Spinner and Message

**Test Case Description:** Verify that the `Asset` component renders correctly with both a spinner and a message when both the `spinner` and `message` props are provided.

**Test Steps:**
1. Render the `Asset` component with the `spinner` prop set to `true` and the `message` prop containing a valid message text.
2. Check if the spinner and message are displayed.

**Expected Result:** The `Asset` component should render with a visible spinner and message.

**Result:** Passed

### Test Case 5: Render Asset with No Content

**Test Case Description:** Verify that the `Asset` component renders correctly with no content (no spinner, no image, and no message) when no props are provided.

**Test Steps:**
1. Render the `Asset` component with no props.
2. Check if no spinner, image, or message is displayed.

**Expected Result:** The `Asset` component should render with no visible content.

**Result:** Passed

### Test Case 6: Edge Case - Long Message

**Test Case Description:** Verify that the `Asset` component can handle a long message without overflowing its container.

**Test Steps:**
1. Render the `Asset` component with a long message text that exceeds the width of the container.
2. Check if the message is truncated or wrapped appropriately to prevent overflow.

**Expected Result:** The `Asset` component should handle long messages without causing horizontal overflow.

**Result:** Passed

### Test Case 7: Edge Case - Empty Message

**Test Case Description:** Verify that the `Asset` component can handle an empty message (an empty string) without displaying unnecessary space.

**Test Steps:**
1. Render the `Asset` component with an empty message text.
2. Check if no empty space or message is displayed.

**Expected Result:** The `Asset` component should handle empty messages without displaying unnecessary content.

**Result:** Passed


## Avatar Component Test Cases

### Test Case 1: Render Avatar with Image

**Test Case Description:** Verify that the `Avatar` component renders correctly with an image when the `src` prop is provided.

**Test Steps:**
1. Render the `Avatar` component with the `src` prop containing a valid image URL.
2. Check if the image is displayed.

**Expected Result:** The `Avatar` component should render with a visible image.

**Result:** Passed

### Test Case 2: Render Avatar with Default Height

**Test Case Description:** Verify that the `Avatar` component renders with the default height of 45 pixels when no `height` prop is provided.

**Test Steps:**
1. Render the `Avatar` component without providing a `height` prop.
2. Check if the image has a height of 45 pixels.

**Expected Result:** The `Avatar` component should have a default height of 45 pixels.

**Result:** Passed

### Test Case 3: Render Avatar with Custom Height

**Test Case Description:** Verify that the `Avatar` component renders with a custom height when the `height` prop is provided.

**Test Steps:**
1. Render the `Avatar` component with a custom `height` prop (e.g., height=60).
2. Check if the image has the specified custom height.

**Expected Result:** The `Avatar` component should render with the specified custom height.

**Result:** Passed

### Test Case 4: Render Avatar with Text

**Test Case Description:** Verify that the `Avatar` component renders correctly with text when the `text` prop is provided.

**Test Steps:**
1. Render the `Avatar` component with the `text` prop containing valid text.
2. Check if the text is displayed.

**Expected Result:** The `Avatar` component should render with visible text.

**Result:** Passed

### Test Case 5: Render Avatar with Image and Text

**Test Case Description:** Verify that the `Avatar` component renders correctly with both an image and text when both the `src` and `text` props are provided.

**Test Steps:**
1. Render the `Avatar` component with the `src` prop containing a valid image URL and the `text` prop containing valid text.
2. Check if both the image and text are displayed.

**Expected Result:** The `Avatar` component should render with a visible image and text.

**Result:** Passed

### Test Case 6: Edge Case - No Image and No Text

**Test Case Description:** Verify that the `Avatar` component renders correctly with neither an image nor text when no props are provided.

**Test Steps:**
1. Render the `Avatar` component with no props.
2. Check if neither the image nor text is displayed.

**Expected Result:** The `Avatar` component should render with no visible image or text.

**Result:** Passed


## MoreDropdown Component Test Cases

### Test Case 1: Render MoreDropdown

**Test Case Description:** Verify that the `MoreDropdown` component renders correctly.

**Test Steps:**
1. Render the `MoreDropdown` component.
2. Check if the dropdown icon is displayed.

**Expected Result:**
- The `MoreDropdown` component should render with a visible dropdown icon.

**Result:** Passed

### Test Case 2: Click Edit Button

**Test Case Description:** Verify that the `handleEdit` function is called when the "Edit" button is clicked.

**Test Steps:**
1. Render the `MoreDropdown` component with a `handleEdit` function.
2. Click the "Edit" button in the dropdown.

**Expected Result:**
- The `handleEdit` function should be called.

**Result:** Passed

### Test Case 3: Click Delete Button

**Test Case Description:** Verify that the `handleDelete` function is called when the "Delete" button is clicked.

**Test Steps:**
1. Render the `MoreDropdown` component with a `handleDelete` function.
2. Click the "Delete" button in the dropdown.

**Expected Result:**
- The `handleDelete` function should be called.

**Result:** Passed

## ProfileEditDropdown Component Test Cases

### Test Case 4: Render ProfileEditDropdown

**Test Case Description:** Verify that the `ProfileEditDropdown` component renders correctly.

**Test Steps:**
1. Render the `ProfileEditDropdown` component with a valid `id` prop.
2. Check if the dropdown icon is displayed.

**Expected Result:**
- The `ProfileEditDropdown` component should render with a visible dropdown icon.

**Result:** Passed

### Test Case 5: Click Edit Profile Button

**Test Case Description:** Verify that clicking the "Edit Profile" button in the `ProfileEditDropdown` redirects to the edit profile page.

**Test Steps:**
1. Render the `ProfileEditDropdown` component with a valid `id` prop.
2. Click the "Edit Profile" button in the dropdown.

**Expected Result:**
- The user should be redirected to the edit profile page.

**Result:** Passed

### Test Case 6: Click Change Username Button

**Test Case Description:** Verify that clicking the "Change Username" button in the `ProfileEditDropdown` redirects to the edit username page.

**Test Steps:**
1. Render the `ProfileEditDropdown` component with a valid `id` prop.
2. Click the "Change Username" button in the dropdown.

**Expected Result:**
- The user should be redirected to the edit username page.

**Result:** Passed

### Test Case 7: Click Change Password Button

**Test Case Description:** Verify that clicking the "Change Password" button in the `ProfileEditDropdown` redirects to the edit password page.

**Test Steps:**
1. Render the `ProfileEditDropdown` component with a valid `id` prop.
2. Click the "Change Password" button in the dropdown.

**Expected Result:**
- The user should be redirected to the edit password page.

**Result:** Passed


## NavBar Component Test Cases

### Test Case 1: Render NavBar

**Test Case Description:** Verify that the `NavBar` component renders correctly.

**Test Steps:**
1. Render the `NavBar` component.
2. Check if the navbar logo is displayed.

**Expected Result:**
The `NavBar` component should render with a visible navbar logo.

**Result:** Passed

### Test Case 2: Click Add Post Icon

**Test Case Description:** Verify that clicking the "Add Post" icon redirects to the "Create Post" page when a user is logged in.

**Test Steps:**
1. Render the `NavBar` component with a logged-in user.
2. Click the "Add Post" icon.

**Expected Result:**
The user should be redirected to the "Create Post" page.

**Result:** Passed

### Test Case 3: Click Home Icon

**Test Case Description:** Verify that clicking the "Home" icon redirects to the home page.

**Test Steps:**
1. Render the `NavBar` component.
2. Click the "Home" icon.

**Expected Result:**
The user should be redirected to the home page.

**Result:** Passed

### Test Case 4: Click Doggy Profiles Icon (Logged Out)

**Test Case Description:** Verify that clicking the "Doggy Profiles" icon displays a tooltip for signing in or signing up when the user is logged out.

**Test Steps:**
1. Render the `NavBar` component with a logged-out user.
2. Click the "Doggy Profiles" icon.

**Expected Result:**
A tooltip should be displayed with the message "Sign in or Sign up to view more!".

**Result:** Passed

### Test Case 5: Click Sign In Icon (Logged Out)

**Test Case Description:** Verify that clicking the "Sign In" icon redirects to the Sign-In page when the user is logged out.

**Test Steps:**
1. Render the `NavBar` component with a logged-out user.
2. Click the "Sign In" icon.

**Expected Result:**
The user should be redirected to the Sign-In page.

**Result:** Passed

### Test Case 6: Click Sign Up Icon (Logged Out)

**Test Case Description:** Verify that clicking the "Sign Up" icon redirects to the Sign-Up page when the user is logged out.

**Test Steps:**
1. Render the `NavBar` component with a logged-out user.
2. Click the "Sign Up" icon.

**Expected Result:**
The user should be redirected to the Sign-Up page.

**Result:** Passed

### Test Case 7: Click Doggy Profiles Icon (Logged In)

**Test Case Description:** Verify that clicking the "Doggy Profiles" icon redirects to the "Dog Profiles" page when the user is logged in.

**Test Steps:**
1. Render the `NavBar` component with a logged-in user.
2. Click the "Doggy Profiles" icon.

**Expected Result:**
The user should be redirected to the "Dog Profiles" page.

**Result:** Passed

### Test Case 8: Click Doggy Health Icon (Logged In)

**Test Case Description:** Verify that clicking the "Doggy Health" icon redirects to the "Dog Health" page when the user is logged in.

**Test Steps:**
1. Render the `NavBar` component with a logged-in user.
2. Click the "Doggy Health" icon.

**Expected Result:**
The user should be redirected to the "Dog Health" page.

**Result:** Passed

### Test Case 9: Click Doggy Danger Icon (Logged In)

**Test Case Description:** Verify that clicking the "Doggy Danger" icon redirects to the "Dog Danger" page when the user is logged in.

**Test Steps:**
1. Render the `NavBar` component with a logged-in user.
2. Click the "Doggy Danger" icon.

**Expected Result:**
The user should be redirected to the "Dog Danger" page.

**Result:** Passed

### Test Case 10: Click Feed Icon (Logged In)

**Test Case Description:** Verify that clicking the "Feed" icon redirects to the "Feed" page when the user is logged in.

**Test Steps:**
1. Render the `NavBar` component with a logged-in user.
2. Click the "Feed" icon.

**Expected Result:**
The user should be redirected to the "Feed" page.

**Result:** Passed

### Test Case 11: Click Liked Icon (Logged In)

**Test Case Description:** Verify that clicking the "Liked" icon redirects to the "Liked" page when the user is logged in.

**Test Steps:**
1. Render the `NavBar` component with a logged-in user.
2. Click the "Liked" icon.

**Expected Result:**
The user should be redirected to the "Liked" page.

**Result:** Passed

### Test Case 12: Click Sign Out Icon (Logged In)

**Test Case Description:** Verify that clicking the "Sign Out" icon triggers the sign-out process when the user is logged in.

**Test Steps:**
1. Render the `NavBar` component with a logged-in user.
2. Click the "Sign Out" icon.

**Expected Result:**
The user should be signed out, and no longer logged in.

**Result:** Passed

### Test Case 13: Click Profile Icon (Logged In)

**Test Case Description:** Verify that clicking the user's profile icon redirects to the user's profile page when the user is logged in.

**Test Steps:**
1. Render the `NavBar` component with a logged-in user.
2. Click the user's profile icon.

**Expected Result:**
The user should be redirected to their profile page.

**Result:** Passed

## NotFound Component Test Cases

### Test Case 1: Render NotFound Page

**Test Case Description:** Verify that the `NotFound` component renders correctly.

**Test Steps:**
1. Render the `NotFound` component.
2. Check if the "Not Found" image and message are displayed.

**Expected Result:**
The `NotFound` component should render with a visible "Not Found" image and message.

**Result:** Passed

## Test Cases for `SignInForm`

### Test Case 1: Successful Sign-In

- **Test Case Name:** Successful Sign-In
- **Test Objective:** Verify that users can successfully sign in with valid credentials.
- **Test Steps:**
   1. Navigate to the Sign-In page.
   2. Enter a valid username and password.
   3. Click the "Sign In" button.
- **Expected Results:**
   - User is successfully signed in and redirected to the expected page.
- **Result:** Passed

### Test Case 2: Sign-In with Invalid Credentials

- **Test Case Name:** Sign-In with Invalid Credentials
- **Test Objective:** Verify that users cannot sign in with invalid credentials.
- **Test Steps:**
   1. Navigate to the Sign-In page.
   2. Enter an invalid username or password.
   3. Click the "Sign In" button.
- **Expected Results:**
   - An error message is displayed indicating that the sign-in attempt failed due to invalid credentials.
- **Result:** Passed

### Test Case 3: Error Handling

- **Test Case Name:** Error Handling
- **Test Objective:** Verify that error messages are displayed when there are issues during sign-in.
- **Test Steps:**
   1. Navigate to the Sign-In page.
   2. Simulate a server error by mocking a failed sign-in request.
   3. Click the "Sign In" button.
- **Expected Results:**
   - An error message is displayed, indicating a server error or other unexpected issues.
- **Result:** Passed

### Test Case 4: Sign-In with Empty Fields

- **Test Case Name:** Sign-In with Empty Fields
- **Test Objective:** Verify that users cannot sign in with empty username or password fields.
- **Test Steps:**
   1. Navigate to the Sign-In page.
   2. Leave either the username or password field empty.
   3. Click the "Sign In" button.
- **Expected Results:**
   - An error message is displayed indicating that both username and password fields are required.
- **Result:** Passed

## Test Cases for `SignUpForm`

### Test Case 5: Successful Sign-Up

- **Test Case Name:** Successful Sign-Up
- **Test Objective:** Verify that users can successfully sign up with valid credentials.
- **Test Steps:**
   1. Navigate to the Sign-Up page.
   2. Enter a valid username and password.
   3. Click the "Sign Up" button.
- **Expected Results:**
   - User is successfully signed up and redirected to the Sign-In page.
- **Result:** Passed

### Test Case 6: Sign-Up with Invalid Credentials

- **Test Case Name:** Sign-Up with Invalid Credentials
- **Test Objective:** Verify that users cannot sign up with invalid credentials.
- **Test Steps:**
   1. Navigate to the Sign-Up page.
   2. Enter an invalid username, password, or confirmation password.
   3. Click the "Sign Up" button.
- **Expected Results:**
   - Error messages are displayed indicating the validation issues.
- **Result:** Passed

### Test Case 7: Error Handling During Sign-Up

- **Test Case Name:** Error Handling during Sign-Up
- **Test Objective:** Verify that error messages are displayed when there are issues during sign-up.
- **Test Steps:**
   1. Navigate to the Sign-Up page.
   2. Simulate a server error by mocking a failed sign-up request.
   3. Click the "Sign Up" button.
- **Expected Results:**
   - An error message is displayed, indicating a server error or other unexpected issues.
- **Result:** Passed

### Test Case 8: Password Confirmation Mismatch

- **Test Case Name:** Password Confirmation Mismatch
- **Test Objective:** Verify that users cannot sign up if the password confirmation does not match the password.
- **Test Steps:**
   1. Navigate to the Sign-Up page.
   2. Enter a valid username and password.
   3. Enter a different password in the confirmation field.
   4. Click the "Sign Up" button.
- **Expected Results:**
   - An error message is displayed indicating that the password confirmation does not match.
- **Result:** Passed

## Test Cases for `Comment` Component

**Test Case 1: Render Comment**
- **Test Case Name:** Render Comment
- **Test Objective:** Verify that the `Comment` component renders correctly with all the expected elements and information.
- **Test Steps:**
   1. Render the `Comment` component with valid props.
- **Expected Result:** The `Comment` component should display the user's avatar, owner name, date, content, and more options (edit and delete) if the user is the owner of the comment.
- **Result:** Passed

**Test Case 2: Edit Comment**
- **Test Case Name:** Edit Comment
- **Test Objective:** Verify that a user can edit their own comment.
- **Test Steps:**
   1. Render the `Comment` component with valid props.
   2. Click on the "Edit" option.
   3. Modify the comment content.
   4. Click the "Save" button on the edit form.
- **Expected Result:** The comment content should be updated with the modified content.
- **Result:** Passed

**Test Case 3: Delete Comment**
- **Test Case Name:** Delete Comment
- **Test Objective:** Verify that a user can delete their own comment.
- **Test Steps:**
   1. Render the `Comment` component with valid props.
   2. Click on the "Delete" option.
   3. Confirm the deletion when prompted.
- **Expected Result:** The comment should be successfully deleted from the post, and the comments count on the post should decrease by 1.
- **Result:** Passed

**Test Case 4: Ownership Verification**
- **Test Case Name:** Ownership Verification
- **Test Objective:** Verify that the comment displays the "Edit" and "Delete" options only for the owner of the comment.
- **Test Steps:**
   1. Render the `Comment` component with valid props.
   2. Check if the "Edit" and "Delete" options are displayed.
- **Expected Result:** The "Edit" and "Delete" options should be displayed only if the current user is the owner of the comment.
- **Result:** Passed

**Test Case 5: Cancel Edit**
- **Test Case Name:** Cancel Edit
- **Test Objective:** Verify that a user can cancel the edit of their own comment.
- **Test Steps:**
   1. Render the `Comment` component with valid props.
   2. Click on the "Edit" option.
   3. Modify the comment content.
   4. Click the "Cancel" button on the edit form.
- **Expected Result:** The comment content should remain unchanged, and the edit form should be closed.
- **Result:** Passed

**Test Case 6: Delete Confirmation**
- **Test Case Name:** Delete Confirmation
- **Test Objective:** Verify that a user can confirm the deletion of their own comment.
- **Test Steps:**
   1. Render the `Comment` component with valid props.
   2. Click on the "Delete" option.
   3. Confirm the deletion when prompted.
- **Expected Result:** The comment should be successfully deleted from the post, and the comments count on the post should decrease by 1.
- **Result:** Passed

## Test Cases for `CommentCreateForm` Component

**Test Case 1: Render Comment Create Form**
- **Test Case Name:** Render Comment Create Form
- **Test Objective:** Verify that the `CommentCreateForm` component renders correctly with the required input fields.
- **Test Steps:**
   1. Render the `CommentCreateForm` component.
- **Expected Result:** The component should display an input field for entering a comment and a "post" button.
- **Result:** Passed

**Test Case 2: Submit Comment**
- **Test Case Name:** Submit Comment
- **Test Objective:** Verify that users can submit a comment successfully.
- **Test Steps:**
   1. Render the `CommentCreateForm` component.
   2. Enter a valid comment.
   3. Click the "post" button.
- **Expected Result:** The comment should be submitted, and it should appear as a new comment on the post.
- **Result:** Passed

**Test Case 3: Validation Errors Handling**
- **Test Case Name:** Validation Errors Handling
- **Test Objective:** Verify that the `CommentCreateForm` component handles validation errors gracefully.
- **Test Steps:**
   1. Render the `CommentCreateForm` component.
   2. Submit the form with an empty comment.
- **Expected Result:** A validation error should be displayed, and the form should not be submitted until a valid comment is provided.
- **Result:** Passed

**Test Case 4: Cancel Comment**
- **Test Case Name:** Cancel Comment
- **Test Objective:** Verify that users can cancel creating a comment and return to the previous state.
- **Test Steps:**
   1. Render the `CommentCreateForm` component.
   2. Click the "cancel" button.
- **Expected Result:** Users should be able to cancel comment creation and return to the previous state without posting a comment.
- **Result:** Passed

## Test Cases for `CommentEditForm` Component

**Test Case 1: Render Comment Edit Form**
- **Test Case Name:** Render Comment Edit Form
- **Test Objective:** Verify that the `CommentEditForm` component renders correctly with the comment content and edit options.
- **Test Steps:**
   1. Render the `CommentEditForm` component with valid props.
- **Expected Result:** The component should display the existing comment content and "cancel" and "save" buttons.
- **Result:** Passed

**Test Case 2: Edit Comment**
- **Test Case Name:** Edit Comment
- **Test Objective:** Verify that users can edit a comment successfully.
- **Test Steps:**
   1. Render the `CommentEditForm` component with valid props.
   2. Modify the comment content.
   3. Click the "save" button.
- **Expected Result:** The comment content should be updated with the modified content.
- **Result:** Passed

**Test Case 3: Validation Errors Handling in Edit**
- **Test Case Name:** Validation Errors Handling in Edit
- **Test Objective:** Verify that the `CommentEditForm` component handles validation errors when editing a comment.
- **Test Steps:**
   1. Render the `CommentEditForm` component with valid props.
   2. Remove the comment content.
   3. Click the "save" button.
- **Expected Result:** A validation error should be displayed, and the form should not be submitted until valid content is provided.
- **Result:** Passed

**Test Case 4: Cancel Edit**
- **Test Case Name:** Cancel Edit
- **Test Objective:** Verify that users can cancel editing a comment and return to the previous state.
- **Test Steps:**
   1. Render the `CommentEditForm` component with valid props.
   2. Click the "cancel" button.
- **Expected Result:** Users should be able to cancel editing and return to the previous comment content without saving changes.
- **Result:** Passed

## Test Cases for `DogDanger` Component

**Test Case 1: Render DogDanger**
- **Test Case Name:** Render DogDanger
- **Test Objective:** Verify that the `DogDanger` component renders correctly with all the expected elements and information.
- **Test Steps:**
   1. Render the `DogDanger` component with valid props.
- **Expected Result:** The `DogDanger` component should display the owner's avatar, owner name, date, dog danger details, and more options (edit and delete) if the user is the owner of the dog danger details.
- **Result:** Passed

**Test Case 2: Edit DogDanger Details**
- **Test Case Name:** Edit DogDanger Details
- **Test Objective:** Verify that a user can edit dog danger details when on the dog danger page.
- **Test Steps:**
   1. Render the `DogDanger` component with `dogDangerPage` set to `true`.
   2. Click on the "Edit" option.
   3. Modify some of the dog danger details.
   4. Save the changes.
- **Expected Result:** Users should be able to edit and save dog danger details when on the dog danger page.
- **Result:** Passed

**Test Case 3: Delete DogDanger Details**
- **Test Case Name:** Delete DogDanger Details
- **Test Objective:** Verify that a user can delete dog danger details when on the dog danger page.
- **Test Steps:**
   1. Render the `DogDanger` component with `dogDangerPage` set to `true`.
   2. Click on the "Delete" option.
   3. Confirm the deletion.
- **Expected Result:** Users should be able to delete dog danger details when on the dog danger page, and the component should be removed.
- **Result:** Passed

**Test Case 4: User Restrictions**
- **Test Case Name:** User Restrictions
- **Test Objective:** Verify that certain actions (edit/delete) are only available to the owner of the dog danger details.
- **Test Steps:**
   1. Render the `DogDanger` component with `dogDangerPage` set to `true`.
   2. Verify if the "Edit" and "Delete" options are visible.
   3. If not the owner, try to click "Edit" or "Delete."
   4. Verify if the actions are restricted.
- **Expected Result:** Non-owners should not be able to edit or delete dog danger details.
- **Result:** Passed

## Test Cases for `DogDangerCreateForm` Component

**Test Case 1: Render Dog Danger Create Form**
- **Test Case Name:** Render Dog Danger Create Form
- **Test Objective:** Verify that the `DogDangerCreateForm` component renders correctly with all the expected input fields and buttons.
- **Test Steps:**
   1. Render the `DogDangerCreateForm` component.
- **Expected Result:** The component should display input fields for entering dog danger details and "cancel" and "create" buttons.
- **Result:** Passed

**Test Case 2: Submit Dog Danger Details**
- **Test Case Name:** Submit Dog Danger Details
- **Test Objective:** Verify that users can successfully submit dog danger details.
- **Test Steps:**
   1. Render the `DogDangerCreateForm` component.
   2. Fill in the dog danger details.
   3. Click the "create" button.
- **Expected Result:** The dog danger details should be submitted, and the user should be redirected to the dog danger details page.
- **Result:** Passed

**Test Case 3: Validation Errors Handling**
- **Test Case Name:** Validation Errors Handling
- **Test Objective:** Verify that the `DogDangerCreateForm` component handles validation errors gracefully.
- **Test Steps:**
   1. Render the `DogDangerCreateForm` component.
   2. Submit the form with missing or invalid details.
- **Expected Result:** Validation errors should be displayed, and the form should not be submitted until valid details are provided.
- **Result:** Passed

**Test Case 4: Cancel Dog Danger Creation**
- **Test Case Name:** Cancel Dog Danger Creation
- **Test Objective:** Verify that users can cancel creating dog danger details and return to the previous state.
- **Test Steps:**
   1. Render the `DogDangerCreateForm` component.
   2. Click the "cancel" button.
- **Expected Result:** Users should be able to cancel dog danger creation and return to the previous state without creating a new dog danger.
- **Result:** Passed

## Test Cases for `DogDangerEditForm` Component

**Test Case 1: Render Dog Danger Edit Form**
- **Test Case Name:** Render Dog Danger Edit Form
- **Test Objective:** Verify that the `DogDangerEditForm` component renders correctly with the existing dog danger details and edit options.
- **Test Steps:**
   1. Render the `DogDangerEditForm` component with valid props.
- **Expected Result:** The component should display the existing dog danger details and "cancel" and "save" buttons.
- **Result:** Passed

**Test Case 2: Edit Dog Danger Details**
- **Test Case Name:** Edit Dog Danger Details
- **Test Objective:** Verify that users can edit dog danger details successfully.
- **Test Steps:**
   1. Render the `DogDangerEditForm` component with valid props.
   2. Modify the dog danger details.
   3. Click the "save" button.
- **Expected Result:** The dog danger details should be updated with the modified content, and the user should be redirected to the dog danger details page.
- **Result:** Passed

**Test Case 3: Validation Errors Handling in Edit**
- **Test Case Name:** Validation Errors Handling in Edit
- **Test Objective:** Verify that the `DogDangerEditForm` component handles validation errors when editing dog danger details.
- **Test Steps:**
   1. Render the `DogDangerEditForm` component with valid props.
   2. Remove or provide invalid details.
   3. Click the "save" button.
- **Expected Result:** Validation errors should be displayed, and the form should not be submitted until valid details are provided.
- **Result:** Passed

**Test Case 4: Cancel Edit**
- **Test Case Name:** Cancel Edit
- **Test Objective:** Verify that users can cancel editing dog danger details and return to the previous state.
- **Test Steps:**
   1. Render the `DogDangerEditForm` component with valid props.
   2. Click the "cancel" button.
- **Expected Result:** Users should be able to cancel editing and return to the previous dog danger details without saving changes.
- **Result:** Passed

### Test Cases for `DogDangerPage` Component

**Test Case 1: Render Dog Danger Page**
- **Test Case Name:** Render Dog Danger Page
- **Test Objective:** Verify that the `DogDangerPage` component renders correctly with all the expected elements.
- **Test Steps:**
   1. Render the `DogDangerPage` component.
- **Expected Result:** The component should display popular profiles, dog danger details (if available), or a message if no dog danger details are found.
- **Result:** Passed

**Test Case 2: Load Dog Danger Details**
- **Test Case Name:** Load Dog Danger Details
- **Test Objective:** Verify that dog danger details are loaded correctly when the component is rendered.
- **Test Steps:**
   1. Render the `DogDangerPage` component.
- **Expected Result:** Dog danger details should be fetched and displayed in the component.
- **Result:** Passed

**Test Case 3: No Dog Danger Details Found**
- **Test Case Name:** No Dog Danger Details Found
- **Test Objective:** Verify that a message is displayed when no dog danger details are found.
- **Test Steps:**
   1. Render the `DogDangerPage` component with no dog danger details.
- **Expected Result:** The component should display a message indicating that no dog danger details exist.
- **Result:** Passed

### Test Cases for `DogDangersPage` Component

**Test Case 1: Render Dog Dangers Page**
- **Test Case Name:** Render Dog Dangers Page
- **Test Objective:** Verify that the `DogDangersPage` component renders correctly with all the expected elements.
- **Test Steps:**
   1. Render the `DogDangersPage` component.
- **Expected Result:** The component should display popular profiles, a search bar, and a list of dog danger details or a message if no results are found.
- **Result:** Passed

**Test Case 2: Load Dog Danger Details**
- **Test Case Name:** Load Dog Danger Details
- **Test Objective:** Verify that dog danger details are loaded correctly when the component is rendered.
- **Test Steps:**
   1. Render the `DogDangersPage` component.
- **Expected Result:** Dog danger details should be fetched and displayed in the component.
- **Result:** Passed

**Test Case 3: No Dog Danger Details Found**
- **Test Case Name:** No Dog Danger Details Found
- **Test Objective:** Verify that a message is displayed when no dog danger details are found.
- **Test Steps:**
   1. Render the `DogDangersPage` component with no dog danger details.
- **Expected Result:** The component should display a message indicating that no dog danger details exist.
- **Result:** Passed

## Test Cases for DogHealth Component

### Test Case 1: Render Dog Health Card
- **Test Case Name:** Render Dog Health Card
- **Test Objective:** Verify that the `DogHealth` component renders correctly with all the expected elements.
- **Test Steps:**
   1. Render the `DogHealth` component.
- **Expected Result:** The component should display information about a dog's health, including vet details, health status, and options to edit or delete (if the user is the owner).
- **Result:** Passed

### Test Case 2: Edit Dog Health
- **Test Case Name:** Edit Dog Health
- **Test Objective:** Verify that the user can edit the dog's health information.
- **Test Steps:**
   1. Render the `DogHealth` component.
   2. Click on the edit button.
   3. Modify the dog's health information.
   4. Submit the form.
- **Expected Result:** The component should allow the user to edit the dog's health information, and upon submission, the changes should be saved.
- **Result:** Passed

### Test Case 3: Delete Dog Health
- **Test Case Name:** Delete Dog Health
- **Test Objective:** Verify that the user can delete the dog's health information.
- **Test Steps:**
   1. Render the `DogHealth` component.
   2. Click on the delete button.
   3. Confirm the deletion.
- **Expected Result:** The component should prompt the user for confirmation and delete the dog's health information upon confirmation.
- **Result:** Passed

## Test Cases for DogHealthCreateForm Component

### Test Case 1: Render Dog Health Create Form
- **Test Case Name:** Render Dog Health Create Form
- **Test Objective:** Verify that the `DogHealthCreateForm` component renders correctly with all the expected form fields.
- **Test Steps:**
   1. Render the `DogHealthCreateForm` component.
- **Expected Result:** The component should display a form with fields for entering dog health information.
- **Result:** Passed

### Test Case 2: Create Dog Health
- **Test Case Name:** Create Dog Health
- **Test Objective:** Verify that the user can create a new dog health entry.
- **Test Steps:**
   1. Render the `DogHealthCreateForm` component.
   2. Fill in the required fields.
   3. Submit the form.
- **Expected Result:** The component should allow the user to create a new dog health entry, and upon submission, the entry should be saved.
- **Result:** Passed

## Test Cases for DogHealthEditForm Component

### Test Case 1: Render Dog Health Edit Form
- **Test Case Name:** Render Dog Health Edit Form
- **Test Objective:** Verify that the `DogHealthEditForm` component renders correctly with all the expected form fields.
- **Test Steps:**
   1. Render the `DogHealthEditForm` component.
- **Expected Result:** The component should display a form with fields for editing dog health information.
- **Result:** Passed

### Test Case 2: Edit Dog Health
- **Test Case Name:** Edit Dog Health
- **Test Objective:** Verify that the user can edit the dog's health information.
- **Test Steps:**
   1. Render the `DogHealthEditForm` component.
   2. Click on the edit button.
   3. Modify the dog's health information.
   4. Submit the form.
- **Expected Result:** The component should allow the user to edit the dog's health information, and upon submission, the changes should be saved.
- **Result:** Passed

## Test Cases for DogHealthPage Component

### Test Case 1: Render Dog Health Page
- **Test Case Name:** Render Dog Health Page
- **Test Objective:** Verify that the `DogHealthPage` component renders correctly with all the expected elements.
- **Test Steps:**
   1. Render the `DogHealthPage` component.
- **Expected Result:** The component should display a page showing dog health details, including vet information and options to edit or delete (if the user is the owner).
- **Result:** Passed

### Test Case 2: Fetch Dog Health Details
- **Test Case Name:** Fetch Dog Health Details
- **Test Objective:** Verify that the component fetches and displays the correct dog health details.
- **Test Steps:**
   1. Render the `DogHealthPage` component.
- **Expected Result:** The component should fetch and display the dog's health details correctly, including vet information.
- **Result:** Passed

## Test Cases for DogsHealthPage Component

### Test Case 1: Render Dogs Health Page
- **Test Case Name:** Render Dogs Health Page
- **Test Objective:** Verify that the `DogsHealthPage` component renders correctly with all the expected elements.
- **Test Steps:**
   1. Render the `DogsHealthPage` component.
- **Expected Result:** The component should display a page showing a list of dog health details, including a search bar, list of dog health cards, and options to load more.
- **Result:** Passed

### Test Case 2: Search Dog Health Details
- **Test Case Name:** Search Dog Health Details
- **Test Objective:** Verify that the user can search for specific dog health details using the search bar.
- **Test Steps:**
   1. Render the `DogsHealthPage` component.
   2. Enter a search query in the search bar.
   3. Submit the search.
- **Expected Result:** The component should allow the user to search for dog health details based on the query, and the results should be displayed.
- **Result:** Passed

### Test Case 3: Load More Dog Health Cards
- **Test Case Name:** Load More Dog Health Cards
- **Test Objective:** Verify that the user can load more dog health cards when scrolling.
- **Test Steps:**
   1. Render the `DogsHealthPage` component.
   2. Scroll to the bottom of the page.
- **Expected Result:** The component should load and display more dog health cards as the user scrolls down, if more cards are available.
- **Result:** Passed

## Test Cases for DogProfile Component

### Test Case 1: Render Dog Profile
- **Test Case Name:** Render Dog Profile
- **Test Objective:** Verify that the `DogProfile` component renders correctly with all the expected elements.
- **Test Steps:**
   1. Render the `DogProfile` component.
- **Expected Result:** The component should display a dog's profile, including the owner's name, dog's image, name, age, color, and bio. It should also show options to edit or delete (if the user is the owner).
- **Result:** Passed

### Test Case 2: Edit Dog Profile
- **Test Case Name:** Edit Dog Profile
- **Test Objective:** Verify that the user can edit a dog's profile.
- **Test Steps:**
   1. Render the `DogProfile` component.
   2. Click the "Edit" button.
- **Expected Result:** The component should allow the user to edit the dog's profile information, including the name, age, color, and bio, and save the changes.
- **Result:** Passed

### Test Case 3: Delete Dog Profile
- **Test Case Name:** Delete Dog Profile
- **Test Objective:** Verify that the user can delete a dog's profile.
- **Test Steps:**
   1. Render the `DogProfile` component.
   2. Click the "Delete" button and confirm the action.
- **Expected Result:** The component should allow the user to delete the dog's profile, and the profile should be removed from the system.
- **Result:** Passed

## Test Cases for DogProfileCreateForm Component

### Test Case 1: Render Dog Profile Create Form
- **Test Case Name:** Render Dog Profile Create Form
- **Test Objective:** Verify that the `DogProfileCreateForm` component renders correctly with all the expected form fields and elements.
- **Test Steps:**
   1. Render the `DogProfileCreateForm` component.
- **Expected Result:** The component should display a form for creating a new dog's profile, including fields for name, age, color, bio, and image upload.
- **Result:** Passed

### Test Case 2: Create Dog Profile
- **Test Case Name:** Create Dog Profile
- **Test Objective:** Verify that the user can create a new dog's profile.
- **Test Steps:**
   1. Render the `DogProfileCreateForm` component.
   2. Fill in the required fields.
   3. Upload a dog image.
   4. Click the "Create" button.
- **Expected Result:** The component should allow the user to create a new dog's profile with the provided information and image.
- **Result:** Passed

## Test Cases for DogProfileEditForm Component

### Test Case 1: Render Dog Profile Edit Form
- **Test Case Name:** Render Dog Profile Edit Form
- **Test Objective:** Verify that the `DogProfileEditForm` component renders correctly with all the expected form fields and elements.
- **Test Steps:**
   1. Render the `DogProfileEditForm` component.
- **Expected Result:** The component should display a form for editing an existing dog's profile, including fields for name, age, color, bio, and image upload.
- **Result:** Passed

### Test Case 2: Edit Dog Profile
- **Test Case Name:** Edit Dog Profile
- **Test Objective:** Verify that the user can edit an existing dog's profile.
- **Test Steps:**
   1. Render the `DogProfileEditForm` component.
   2. Make changes to the profile information.
   3. Upload a new dog image (optional).
   4. Click the "Save" button.
- **Expected Result:** The component should allow the user to edit the dog's profile information and save the changes, including updating the image if necessary.
- **Result:** Passed

## Test Cases for DogProfilePage Component

### Test Case 1: Render Dog Profile Page
- **Test Case Name:** Render Dog Profile Page
- **Test Objective:** Verify that the `DogProfilePage` component renders correctly with all the expected elements.
- **Test Steps:**
   1. Render the `DogProfilePage` component.
- **Expected Result:** The component should display a page showing a dog's profile, including the owner's name, dog's image, name, age, color, and bio.
- **Result:** Passed

### Test Case 2: Fetch Dog Profile Details
- **Test Case Name:** Fetch Dog Profile Details
- **Test Objective:** Verify that the component fetches and displays the correct dog profile details.
- **Test Steps:**
   1. Render the `DogProfilePage` component.
- **Expected Result:** The component should fetch and display the dog's profile details correctly, including the owner's name, dog's image, name, age, color, and bio.
- **Result:** Passed

## Test Cases for DogProfilesPage Component

### Test Case 1: Render Dog Profiles Page
- **Test Case Name:** Render Dog Profiles Page
- **Test Objective:** Verify that the `DogProfilesPage` component renders correctly with all the expected elements.
- **Test Steps:**
   1. Render the `DogProfilesPage` component.
- **Expected Result:** The component should display a page showing a list of dog profiles, including a search bar, list of dog profile cards, and options to load more.
- **Result:** Passed

### Test Case 2: Search Dog Profiles
- **Test Case Name:** Search Dog Profiles
- **Test Objective:** Verify that the user can search for specific dog profiles using the search bar.
- **Test Steps:**
   1. Render the `DogProfilesPage` component.
   2. Enter a search query in the search bar.
   3. Submit the search.
- **Expected Result:** The component should allow the user to search for dog profiles based on the query, and the results should be displayed.
- **Result:** Passed

### Test Case 3: Load More Dog Profile Cards
- **Test Case Name:** Load More Dog Profile Cards
- **Test Objective:** Verify that the user can load more dog profile cards when scrolling.
- **Test Steps:**
   1. Render the `DogProfilesPage` component.
   2. Scroll to the bottom of the page.
- **Expected Result:** The component should load and display more dog profile cards as the user scrolls down, if more cards are available.
- **Result:** Passed

## Test Cases for Post Component

### Test Case 1: Viewing a Post
- **Test Case Name:** Viewing a Post
- **Test Objective:** Verify that the `Post` component displays a post correctly and handles user interactions.
- **Test Steps:**
   1. Navigate to a page that displays a post.
   2. Check for the presence of the post owner's username and profile image.
   3. Verify if the post's title, content, and image (if available) are shown.
   4. Ensure the post's creation date is displayed.
   5. If logged in as the post owner, check for the availability of the "Edit" and "Delete" buttons.
   6. If not logged in, verify that an overlay tooltip suggests signing in or signing up to view more.
   7. Check if the "Like" button is available and clickable.
   8. Click on the "Like" button.
   9. Verify that the likes count increases by 1.
   10. Click on the "Like" button again.
   11. Verify that the likes count decreases by 1 (undoing the like).
   12. If not logged in, verify that clicking the "Like" button prompts the user to log in.
   13. Check if the "Comment" button is available and clickable.
   14. Click on the "Comment" button.
   15. Verify that it navigates to the post's comments section.
- **Expected Result:** The `Post` component should display the post content correctly, allow users to like the post, and navigate to the comments section when clicking on "Comment."
- **Result:** Passed

### Test Case 2: Handling Post Deletion
- **Test Case Name:** Handling Post Deletion
- **Test Objective:** Verify that the `Post` component allows the post owner to delete a post and handles the deletion process.
- **Test Steps:**
   1. Ensure there is at least one post available for testing.
   2. Log in to an account as the post owner (required for this test case).
   3. Navigate to a page that displays your post.
   4. Click on the "Delete" button.
   5. A confirmation dialog should appear with a warning message.
   6. Upon confirmation, the post should be deleted.
   7. A success notification should be displayed, and you should be redirected to the homepage.
   8. Click on the "Delete" button again and then cancel the confirmation dialog.
- **Expected Result:** The `Post` component should allow the post owner to delete their post, display a confirmation dialog, and handle post deletion correctly.
- **Result:** Passed

### Test Case 3: Handling Ownership and Like Restrictions
- **Test Case Name:** Handling Ownership and Like Restrictions
- **Test Objective:** Verify that the `Post` component correctly handles ownership restrictions and like restrictions.
- **Test Steps:**
   1. Ensure there is at least one post available for testing.
   2. Log in to an account as the post owner (required for this test case).
   3. Navigate to a page that displays your post.
   4. Verify that you cannot like your own post, and a tooltip suggests this restriction.
   5. Log out of the account.
   6. Check if the "Like" button prompts the user to log in.
   7. Log in to a different account that is not the post owner's account.
   8. Check if the "Like" button is available and clickable.
   9. Click on the "Like" button.
   10. Verify that the likes count increases by 1.
   11. Click on the "Like" button again.
   12. Verify that the likes count decreases by 1 (undoing the like).
   13. Check if the "Comment" button is available and clickable.
   14. Click on the "Comment" button.
   15. Verify that it navigates to the post's comments section.
- **Expected Result:** The `Post` component should correctly handle ownership restrictions, like restrictions, and user interactions, providing appropriate tooltips and functionality.
- **Result:** Passed

## Test Cases for PostCreateForm Component

### Test Case 1: Creating a Post
- **Test Case Name:** Creating a Post
- **Test Objective:** Verify that the `PostCreateForm` component allows users to create a new post and handles the creation process.
- **Test Steps:**
   1. Navigate to the post creation page.
   2. Fill in the title and content fields.
   3. Upload an image.
   4. Click the "Create" button.
   5. Verify that a success notification is displayed.
   6. Verify that you are redirected to the newly created post page.
- **Expected Result:** The `PostCreateForm` component should allow users to create a new post successfully, display a success notification, and redirect to the created post page.
- **Result:** Passed

### Test Case 2: Handling Post Creation Errors
- **Test Case Name:** Handling Post Creation Errors
- **Test Objective:** Verify that the `PostCreateForm` component handles errors during post creation.
- **Test Steps:**
   1. Navigate to the post creation page.
   2. Fill in the title and content fields with invalid or empty values.
   3. Attempt to create the post.
   4. Verify that validation error messages are displayed for invalid fields.
   5. Verify that an error notification is displayed.
- **Expected Result:** The `PostCreateForm` component should handle validation errors during post creation and display appropriate error messages and notifications.
- **Result:** Passed

## Test Cases for PostEditForm Component

### Test Case 1: Editing a Post
- **Test Case Name:** Editing a Post
- **Test Objective:** Verify that the `PostEditForm` component allows users to edit an existing post and handles the editing process.
- **Test Steps:**
   1. Navigate to the post editing page for an existing post.
   2. Modify the title and content fields.
   3. Upload a new image (optional).
   4. Click the "Save" button.
   5. Verify that a success notification is displayed.
   6. Verify that you are redirected to the edited post page.
- **Expected Result:** The `PostEditForm` component should allow users to edit an existing post successfully, display a success notification, and redirect to the edited post page.
- **Result:** Passed

### Test Case 2: Handling Post Editing Errors
- **Test Case Name:** Handling Post Editing Errors
- **Test Objective:** Verify that the `PostEditForm` component handles errors during post editing.
- **Test Steps:**
   1. Navigate to the post editing page for an existing post.
   2. Modify the title and content fields with invalid or empty values.
   3. Attempt to save the edited post.
   4. Verify that validation error messages are displayed for invalid fields.
   5. Verify that an error notification is displayed.
- **Expected Result:** The `PostEditForm` component should handle validation errors during post editing and display appropriate error messages and notifications.
- **Result:** Passed

## Test Cases for PostPage Component

### Test Case 1: Viewing a Post
- **Test Case Name:** Viewing a Post
- **Test Objective:** Verify that the `PostPage` component displays a specific post along with its comments.
- **Test Steps:**
   1. Navigate to the `PostPage` for a specific post.
   2. Verify that the post content, including the owner's name, image, title, content, and comments, is displayed.
   3. If logged in, verify that the comment creation form is available.
   4. Scroll through the comments if there are more comments available.
- **Expected Result:** The `PostPage` component should correctly display the specified post, including comments, and provide the option to create comments if the user is logged in.
- **Result:** Passed

### Test Case 2: Handling Post Loading Errors
- **Test Case Name:** Handling Post Loading Errors
- **Test Objective:** Verify that the `PostPage` component gracefully handles errors when loading a post.
- **Test Steps:**
   1. Attempt to navigate to the `PostPage` for a post that does not exist.
   2. Verify that an error message is displayed.
- **Expected Result:** The `PostPage` component should handle errors when loading a non-existent post and display an appropriate error message.
- **Result:** Passed

## Test Cases for PostsPage Component

### Test Case 1: Viewing a List of Posts
- **Test Case Name:** Viewing a List of Posts
- **Test Objective:** Verify that the `PostsPage` component displays a list of posts, possibly filtered by a search query.
- **Test Steps:**
   1. Navigate to the `PostsPage`.
   2. Verify that a list of posts is displayed, each containing the owner's name, image, title, and content.
   3. If logged in, verify the presence of a search bar to filter posts.
   4. Scroll through the posts if there are more posts available.
- **Expected Result:** The `PostsPage` component should correctly display a list of posts, optionally filtered by a search query, and provide the ability to scroll through posts.
- **Result:** Passed

### Test Case 2: Handling Post Loading Errors
- **Test Case Name:** Handling Post Loading Errors
- **Test Objective:** Verify that the `PostsPage` component gracefully handles errors when loading posts.
- **Test Steps:**
   1. Attempt to navigate to the `PostsPage` when there is an issue loading posts (e.g., server error).
   2. Verify that an appropriate error message is displayed.
- **Expected Result:** The `PostsPage` component should handle errors when loading posts and display an appropriate error message.
- **Result:** Passed

### Test Case 3: Searching for Posts
- **Test Case Name:** Searching for Posts
- **Test Objective:** Verify that the `PostsPage` component allows users to search for posts using a search query.
- **Test Steps:**
   1. If logged in, enter a search query in the search bar.
   2. Verify that the list of displayed posts is updated according to the search query.
- **Expected Result:** The `PostsPage` component should correctly filter and display posts based on the entered search query.
- **Result:** Passed

## Test Cases for PopularProfiles Component

### Test Case 1: Rendering Popular Profiles
- **Test Case Name:** Rendering Popular Profiles
- **Test Objective:** Verify that the `PopularProfiles` component renders the list of popular profiles correctly.
- **Test Steps:**
   1. Render the `PopularProfiles` component.
- **Expected Result:** The component should display a list of popular profiles, including their names and images.
- **Result:** Passed

### Test Case 2: Mobile View of Popular Profiles
- **Test Case Name:** Mobile View of Popular Profiles
- **Test Objective:** Verify that the `PopularProfiles` component renders correctly in mobile view.
- **Test Steps:**
   1. Render the `PopularProfiles` component with the `mobile` prop set to `true`.
- **Expected Result:** The component should display a condensed list of popular profiles in a mobile-friendly layout.
- **Result:** Passed

### Test Case 3: Handling Empty Data
- **Test Case Name:** Handling Empty Data
- **Test Objective:** Verify that the `PopularProfiles` component handles empty data gracefully.
- **Test Steps:**
   1. Render the `PopularProfiles` component when there are no popular profiles available.
- **Expected Result:** The component should display a loading spinner or an appropriate message when there are no popular profiles to display.
- **Result:** Passed

## Test Cases for Profile Component

### Test Case 1: Rendering User Profile
- **Test Case Name:** Rendering User Profile
- **Test Objective:** Verify that the `Profile` component renders a user's profile correctly.
- **Test Steps:**
   1. Render the `Profile` component with user profile data.
- **Expected Result:** The component should display the user's profile including their avatar, username, and a "follow" or "unfollow" button based on the current user's relationship with the profile owner.
- **Result:** Passed

### Test Case 2: Rendering Profile in Mobile View
- **Test Case Name:** Rendering Profile in Mobile View
- **Test Objective:** Verify that the `Profile` component renders correctly in mobile view.
- **Test Steps:**
   1. Render the `Profile` component with the `mobile` prop set to `true`.
- **Expected Result:** The component should display the user's profile in a mobile-friendly layout, including their avatar, username, and a "follow" or "unfollow" button based on the current user's relationship with the profile owner.
- **Result:** Passed

### Test Case 3: Handling Unauthenticated User
- **Test Case Name:** Handling Unauthenticated User
- **Test Objective:** Verify that the `Profile` component handles unauthenticated users gracefully.
- **Test Steps:**
   1. Render the `Profile` component when there is no authenticated user.
- **Expected Result:** The component should display a tooltip with a message, indicating that the user should sign in or sign up to view more.
- **Result:** Passed

### Test Case 4: Following a Profile
- **Test Case Name:** Following a Profile
- **Test Objective:** Verify that the `Profile` component allows the current user to follow a profile.
- **Test Steps:**
   1. Render the `Profile` component when the current user is not following the profile owner.
   2. Click on the "follow" button.
- **Expected Result:** The component should update to show the "unfollow" button, indicating that the current user is now following the profile owner.
- **Result:** Passed

### Test Case 5: Unfollowing a Profile
- **Test Case Name:** Unfollowing a Profile
- **Test Objective:** Verify that the `Profile` component allows the current user to unfollow a profile.
- **Test Steps:**
   1. Render the `Profile` component when the current user is following the profile owner.
   2. Click on the "unfollow" button.
- **Expected Result:** The component should update to show the "follow" button, indicating that the current user is no longer following the profile owner.
- **Result:** Passed

## Test Cases for ProfileEditForm Component

### Test Case 1: Rendering Profile Edit Form
- **Test Case Name:** Rendering Profile Edit Form
- **Test Objective:** Verify that the `ProfileEditForm` component renders the profile edit form correctly.
- **Test Steps:**
   1. Render the `ProfileEditForm` component.
- **Expected Result:** The component should display the profile edit form with fields for name, bio, and the option to change the profile image. It should also show "Save" and "Cancel" buttons.
- **Result:** Passed

### Test Case 2: Editing Profile Data
- **Test Case Name:** Editing Profile Data
- **Test Objective:** Verify that the `ProfileEditForm` component allows the user to edit their profile data.
- **Test Steps:**
   1. Render the `ProfileEditForm` component.
   2. Modify the name and bio fields.
   3. Click the "Save" button.
- **Expected Result:** The component should submit the edited profile data, and a success notification should be displayed. The user's profile image should also update if a new image is selected.
- **Result:** Passed

### Test Case 3: Changing Profile Image
- **Test Case Name:** Changing Profile Image
- **Test Objective:** Verify that the `ProfileEditForm` component allows the user to change their profile image.
- **Test Steps:**
   1. Render the `ProfileEditForm` component.
   2. Click the "Change the image" button.
   3. Select a new image file.
   4. Click the "Save" button.
- **Expected Result:** The component should submit the edited profile data with the new image, and a success notification should be displayed. The user's profile image should also update with the new image.
- **Result:** Passed

### Test Case 4: Handling Errors
- **Test Case Name:** Handling Errors
- **Test Objective:** Verify that the `ProfileEditForm` component handles errors gracefully.
- **Test Steps:**
   1. Render the `ProfileEditForm` component.
   2. Attempt to save with invalid data (e.g., empty fields).
- **Expected Result:** The component should display error messages for invalid data and show an error notification. The profile data should not be updated in case of errors.
- **Result:** Passed

### Test Case 5: Canceling Edit
- **Test Case Name:** Canceling Edit
- **Test Objective:** Verify that the `ProfileEditForm` component allows the user to cancel the profile edit.
- **Test Steps:**
   1. Render the `ProfileEditForm` component.
   2. Modify the name and bio fields.
   3. Click the "Cancel" button.
- **Expected Result:** The component should discard the changes made during the edit and return to the previous page without updating the profile data.
- **Result:** Passed

## Test Cases for ProfilePage Component

### Test Case 1: Rendering Profile Page
- **Test Case Name:** Rendering Profile Page
- **Test Objective:** Verify that the `ProfilePage` component renders the profile page correctly.
- **Test Steps:**
   1. Render the `ProfilePage` component.
- **Expected Result:** The component should display the user's profile details, including their name, bio, profile image, and statistics (posts, followers, following). It should also show "Follow" or "Unfollow" buttons based on the relationship with the current user.
- **Result:** Passed

### Test Case 2: Editing Own Profile
- **Test Case Name:** Editing Own Profile
- **Test Objective:** Verify that the `ProfilePage` component allows the user to edit their own profile when viewing their own profile page.
- **Test Steps:**
   1. Render the `ProfilePage` component while logged in as the profile owner.
   2. Click the "Edit Profile" button (if available).
- **Expected Result:** The component should navigate to the profile edit page, where the user can edit their profile information.
- **Result:** Passed

### Test Case 3: Following and Unfollowing
- **Test Case Name:** Following and Unfollowing
- **Test Objective:** Verify that the `ProfilePage` component allows the user to follow or unfollow another user.
- **Test Steps:**
   1. Render the `ProfilePage` component while logged in.
   2. Click the "Follow" button (if not following) or "Unfollow" button (if already following).
- **Expected Result:** The component should update the following status and display the appropriate button (follow or unfollow) based on the user's action. It should also show a success notification when following or unfollowing.
- **Result:** Passed

### Test Case 4: Viewing Dog Profile Details
- **Test Case Name:** Viewing Dog Profile Details
- **Test Objective:** Verify that the `ProfilePage` component allows the user to view dog profile details.
- **Test Steps:**
   1. Render the `ProfilePage` component while logged in.
   2. Click the "Doggy Profile Details" link (if available).
- **Expected Result:** If the profile owner has a dog profile, the component should navigate to the dog profile details page. If not, it should display a message encouraging the user to create a doggy profile if they are the owner.
- **Result:** Passed

### Test Case 5: Viewing Dog Health Details
- **Test Case Name:** Viewing Dog Health Details
- **Test Objective:** Verify that the `ProfilePage` component allows the user to view dog health details.
- **Test Steps:**
   1. Render the `ProfilePage` component while logged in.
   2. Click the "Doggy Health Details" link (if available).
- **Expected Result:** If the profile owner has dog health details, the component should navigate to the dog health details page. If not, it should display a message encouraging the user to create doggy health details if they are the owner.
- **Result:** Passed

### Test Case 6: Viewing Dog Danger Details
- **Test Case Name:** Viewing Dog Danger Details
- **Test Objective:** Verify that the `ProfilePage` component allows the user to view dog danger details.
- **Test Steps:**
   1. Render the `ProfilePage` component while logged in.
   2. Click the "Doggy Danger Details" link (if available).
- **Expected Result:** If the profile owner has dog danger details, the component should navigate to the dog danger details page. If not, it should display a message encouraging the user to create doggy danger details if they are the owner.
- **Result:** Passed

### Test Case 7: Viewing Another User's Profile
- **Test Case Name:** Viewing Another User's Profile
- **Test Objective:** Verify that the `ProfilePage` component allows the user to view another user's profile.
- **Test Steps:**
   1. Render the `ProfilePage` component while logged in.
   2. Navigate to another user's profile page.
- **Expected Result:** The component should display the profile details of the other user, including their name, bio, profile image, and statistics (posts, followers, following). It should also show "Follow" or "Unfollow" buttons based on the relationship with the other user.
- **Result:** Passed

### Test Case 8: Handling No Posts
- **Test Case Name:** Handling No Posts
- **Test Objective:** Verify that the `ProfilePage` component handles cases where the profile owner has no posts.
- **Test Steps:**
   1. Render the `ProfilePage` component for a profile owner with no posts.
- **Expected Result:** The component should display a message indicating that the profile owner hasn't posted anything yet and show a relevant image.
- **Result:** Passed

### Test Case 9: Handling No Dog Profiles
- **Test Case Name:** Handling No Dog Profiles
- **Test Objective:** Verify that the `ProfilePage` component handles cases where the profile owner has no dog profiles.
- **Test Steps:**
   1. Render the `ProfilePage` component for a profile owner with no dog profiles.
- **Expected Result:** The component should display a message indicating that the profile owner hasn't created a doggy profile yet and show a relevant image.
- **Result:** Passed

### Test Case 10: Viewing Dog Health Details from Profile Page
- **Test Case Name:** Viewing Dog Health Details from Profile Page
- **Test Objective:** Verify that the `ProfilePage` component allows the user to view dog health details directly from the profile page.
- **Test Steps:**
   1. Render the `ProfilePage` component while logged in.
   2. Click the "Doggy Health Details" link on the profile page (if available).
- **Expected Result:** The component should navigate to the dog health details page for the profile owner's dog. If there are no dog health details, it should display a message encouraging the user to create them if they are the owner.
- **Result:** Passed

### Test Case 11: Viewing Dog Danger Details from Profile Page
- **Test Case Name:** Viewing Dog Danger Details from Profile Page
- **Test Objective:** Verify that the `ProfilePage` component allows the user to view dog danger details directly from the profile page.
- **Test Steps:**
   1. Render the `ProfilePage` component while logged in.
   2. Click the "Doggy Danger Details" link on the profile page (if available).
- **Expected Result:** The component should navigate to the dog danger details page for the profile owner's dog. If there are no dog danger details, it should display a message encouraging the user to create them if they are the owner.
- **Result:** Passed

## UsernameForm Component Test Cases

### Test Case 1: Rendering UsernameForm Component
- **Objective:** Verify that the `UsernameForm` component renders correctly.
- **Steps:**
   1. Render the `UsernameForm` component.
- **Expected Result:** The component should render without errors and display a form to change the username.
- **Result:** Passed

### Test Case 2: Changing Username
- **Objective:** Verify that the user can change their username using the `UsernameForm` component.
- **Steps:**
   1. Render the `UsernameForm` component.
   2. Enter a new username in the input field.
   3. Click the "Save" button.
- **Expected Result:** The user's username should be updated, and they should be navigated back to the previous page.
- **Result:** Passed

### Test Case 3: Validation Error Handling
- **Objective:** Verify that the `UsernameForm` component handles validation errors correctly.
- **Steps:**
   1. Render the `UsernameForm` component.
   2. Enter an invalid username in the input field.
   3. Click the "Save" button.
- **Expected Result:** The component should display validation error messages.
- **Result:** Passed

## UserPasswordForm Component Test Cases

### Test Case 1: Rendering UserPasswordForm Component
- **Objective:** Verify that the `UserPasswordForm` component renders correctly.
- **Steps:**
   1. Render the `UserPasswordForm` component.
- **Expected Result:** The component should render without errors and display a form to change the user's password.
- **Result:** Passed

### Test Case 2: Changing Password
- **Objective:** Verify that the user can change their password using the `UserPasswordForm` component.
- **Steps:**
   1. Render the `UserPasswordForm` component.
   2. Enter a new password in the input fields.
   3. Click the "Save" button.
- **Expected Result:** The user's password should be updated, and they should be navigated back to the previous page.
- **Result:** Passed

### Test Case 3: Validation Error Handling
- **Objective:** Verify that the `UserPasswordForm` component handles validation errors correctly.
- **Steps:**
   1. Render the `UserPasswordForm` component.
   2. Enter an invalid password in the input fields.
   3. Click the "Save" button.
- **Expected Result:** The component should display validation error messages.
- **Result:** Passed

Click **[here](#manual-testing)** to return to the top of this file.

Click **[here](README.md)** to return to the **README.md** file.