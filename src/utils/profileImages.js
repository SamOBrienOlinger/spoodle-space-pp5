export const DEFAULT_PROFILE_IMAGE =
  "https://res.cloudinary.com/dzhbg6go0/image/upload/v1/default_profile_qdjgyp";

export const normalizeProfileImage = (src) => {
  if (!src) {
    return DEFAULT_PROFILE_IMAGE;
  }

  return src.replace("/media/../", "/");
};

export const useDefaultProfileImage = (event) => {
  if (event.currentTarget.src !== DEFAULT_PROFILE_IMAGE) {
    event.currentTarget.src = DEFAULT_PROFILE_IMAGE;
  }
};
