import css from './ProfilePage.module.css'; 
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Profile',
    description: 'View and edit your profile information.',
    openGraph: {
      title: 'Profile - NoteHub',
      description: 'View and edit your profile information on NoteHub.',
        url: 'https://notehub.com/profile',
        siteName: 'NoteHub',
        images: [
          {
            url: 'https://notehub.com/images/profile-image.jpg',
            width: 1200,
            height: 630,
          },
        ],
    },
};

const Profile = () => {
    return (
        <main className={css.mainContent}>
          <div className={css.profileCard}>
            <div className={css.header}>
              <h1 className={css.formTitle}>Profile Page</h1>
              <a href="/profile/edit" className={css.editProfileButton}>
                Edit Profile
              </a>
            </div>
            <div className={css.avatarWrapper}>
              <img
                src="Avatar"
                alt="User Avatar"
                width={120}
                height={120}
                className={css.avatar}
              />
            </div>
            <div className={css.profileInfo}>
              <p>
                Username: your_username
              </p>
              <p>
                Email: your_email@example.com
              </p>
            </div>
          </div>
        </main>
    );
}

export default Profile;