# Manual Testing

Click **[here](README.md)** to return to the **README.md** file.

A series of manual tests were carried out to verify that all functionalities performed as intended. 
Below are the test cases.

### Test Cases for `SignInForm`

**Test Case 1: Successful Sign-In**
- **Test Case Name:** Successful Sign-In
- **Test Objective:** Verify that users can successfully sign in with valid credentials.
- **Test Steps:**
   1. Navigate to the Sign-In page.
   2. Enter a valid username and password.
   3. Click the "Sign In" button.
- **Expected Results:**
   - User is successfully signed in and redirected to the expected page.

**Test Case 2: Sign-In with Invalid Credentials**
- **Test Case Name:** Sign-In with Invalid Credentials
- **Test Objective:** Verify that users cannot sign in with invalid credentials.
- **Test Steps:**
   1. Navigate to the Sign-In page.
   2. Enter an invalid username or password.
   3. Click the "Sign In" button.
- **Expected Results:**
   - An error message is displayed indicating that the sign-in attempt failed due to invalid credentials.

**Test Case 3: Error Handling**
- **Test Case Name:** Error Handling
- **Test Objective:** Verify that error messages are displayed when there are issues during sign-in.
- **Test Steps:**
   1. Navigate to the Sign-In page.
   2. Simulate a server error by mocking a failed sign-in request.
   3. Click the "Sign In" button.
- **Expected Results:**
   - An error message is displayed, indicating a server error or other unexpected issues.

**Test Case 4: Sign-In with Empty Fields**
- **Test Case Name:** Sign-In with Empty Fields
- **Test Objective:** Verify that users cannot sign in with empty username or password fields.
- **Test Steps:**
   1. Navigate to the Sign-In page.
   2. Leave either the username or password field empty.
   3. Click the "Sign In" button.
- **Expected Results:**
   - An error message is displayed indicating that both username and password fields are required.

### Test Cases for `SignUpForm`

**Test Case 5: Successful Sign-Up**
- **Test Case Name:** Successful Sign-Up
- **Test Objective:** Verify that users can successfully sign up with valid credentials.
- **Test Steps:**
   1. Navigate to the Sign-Up page.
   2. Enter a valid username and password.
   3. Click the "Sign Up" button.
- **Expected Results:**
   - User is successfully signed up and redirected to the Sign-In page.

**Test Case 6: Sign-Up with Invalid Credentials**
- **Test Case Name:** Sign-Up with Invalid Credentials
- **Test Objective:** Verify that users cannot sign up with invalid credentials.
- **Test Steps:**
   1. Navigate to the Sign-Up page.
   2. Enter an invalid username, password, or confirmation password.
   3. Click the "Sign Up" button.
- **Expected Results:**
   - Error messages are displayed indicating the validation issues.

**Test Case 7: Error Handling During Sign-Up**
- **Test Case Name:** Error Handling during Sign-Up
- **Test Objective:** Verify that error messages are displayed when there are issues during sign-up.
- **Test Steps:**
   1. Navigate to the Sign-Up page.
   2. Simulate a server error by mocking a failed sign-up request.
   3. Click the "Sign Up" button.
- **Expected Results:**
   - An error message is displayed, indicating a server error or other unexpected issues.

**Test Case 8: Password Confirmation Mismatch**
- **Test Case Name:** Password Confirmation Mismatch
- **Test Objective:** Verify that users cannot sign up if the password confirmation does not match the password.
- **Test Steps:**
   1. Navigate to the Sign-Up page.
   2. Enter a valid username and password.
   3. Enter a different password in the confirmation field.
   4. Click the "Sign Up" button.
- **Expected Results:**
   - An error message is displayed indicating that the password confirmation does not match.
