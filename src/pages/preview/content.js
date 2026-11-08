import landingPhoto from "../../assets/preview-landing-cockapoo.webp";
import dogPhoto from "../../assets/sign-in-cockapoo.jpeg";

export { landingPhoto };
export const sampleMember = "SpoodleSpace";

export const sampleDogRecords = {
  profile: {
    dog_name: "Milo",
    dog_age: "4 years",
    dog_color: "Apricot",
    dog_bio: "A cockapoo who makes a beeline for the muddy part of every walk.",
    dog_profile_image: dogPhoto,
  },
  health: {
    kennel_cough: "Vaccination recorded",
    allergies: "None listed",
  },
  behaviour: {
    bites_kids: "Calm around familiar children when supervised",
    dangerously_cute: "Loves a game of fetch and settles well after a walk",
  },
};

export const samplePosts = [
  {
    id: "design-photo",
    owner: sampleMember,
    title: "The little moments are the big ones.",
    content: "Muddy paws, fresh air and very good company. We took the long way round the park this morning and Milo found every puddle along the path. He spent the rest of the walk carrying a leaf as though it were the most important thing in the world. By the time we got home, the leaf was still in one piece and Milo was asleep by the door.",
    image: landingPhoto,
    photoAlt: "A cockapoo running towards the camera on grass",
    profile_image: dogPhoto,
    updated_at: "Photo post example",
  },
  {
    id: "design-text",
    owner: sampleMember,
    title: "A quieter walk",
    content: "Milo took his time sniffing along the hedgerow this evening. We stopped at his favourite bench and listened to the rain.",
    profile_image: dogPhoto,
    updated_at: "Text-only post example",
  },
];
