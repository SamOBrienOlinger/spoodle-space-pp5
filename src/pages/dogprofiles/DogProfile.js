// Custom Model 1

// class DogProfile(models.Model):

//     # owner = models.OneToOneField(User, on_delete=models.CASCADE)
//     # owner = models.OneToOneField(User, related_name='doggy_profile', on_delete=models.CASCADE)
//     # my_dog = models.OneToOneField(User, related_name='my_dog', on_delete=models.CASCADE)
//     owner = models.ForeignKey(User, on_delete=models.CASCADE)
//     # post = models.ForeignKey(Post, on_delete=models.CASCADE)
//     created_at = models.DateTimeField(auto_now_add=True)
//     updated_at = models.DateTimeField(auto_now=True)

//     dog_name = models.CharField(max_length=255, blank=True)
//     dog_age = IntegerField(default=0)
//     dog_color = CharField(max_length=255, blank=True)
//     dog_bio = models.TextField(blank=True)
//     dog_profile_image = models.ImageField(
//         upload_to='images/', default='../default_dog-profile_gtehul.png'
//     )


// import React from "react";
// import styles from "../../styles/Profile.module.css";
// import btnStyles from "../../styles/Button.module.css";
// import { useCurrentUser } from "../../contexts/CurrentUserContext";
// import { Link } from "react-router-dom";
// import Avatar from "../../components/Avatar";
// import { Button } from "react-bootstrap";
// import { useSetProfileData } from "../../contexts/ProfileDataContext";

// const DogProfile = (props) => {
//   const { dogprofile, mobile, imageSize = 55 } = props;
//   const { id, following_id, image, owner } = dogprofile;

//   const currentUser = useCurrentUser();
//   const is_owner = currentUser?.username === owner;

//   const { handleFollow } = useSetProfileData();

//   return (
//     <div
//       className={`my-3 d-flex align-items-center ${mobile && "flex-column"}`}
//     >
//       <div>
//         <Link className="align-self-center" to={`/dogprofiles/${id}`}>
//           <Avatar src={image} height={imageSize} />
//         </Link>
//       </div>
//       <div className={`mx-2 ${styles.WordBreak}`}>
//         <strong>{owner}</strong>
//       </div>
//       <div className={`text-right ${!mobile && "ml-auto"}`}>
//         {!mobile &&
//           currentUser &&
//           !is_owner &&
//           (following_id ? (
//             <Button
//               className={`${btnStyles.Button} ${btnStyles.BlackOutline}`}
//               onClick={() => {}}
//             >
//               unfollow
//             </Button>
//           ) : (
//             <Button
//               className={`${btnStyles.Button} ${btnStyles.Black}`}
//               onClick={() => handleFollow(dogprofile)}
//             >
//               follow
//             </Button>
//           ))}
//       </div>
//     </div>
//   );
// };

export default DogProfile;