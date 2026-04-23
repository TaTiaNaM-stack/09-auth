import css from './ProfilePage.module.css'; 
import { Metadata } from 'next';
import type { User } from '@/types/user';
import { getMe } from '@/lib/api/serverApi';

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

// interface ProfileProps  {
//   user: User;
// }

const Profile = async () => {
  const user = await getMe();
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
                src={user.avatar}
                alt="User Avatar"
                width={120}
                height={120}
                className={css.avatar}
              />
            </div>
            <div className={css.profileInfo}>
              <p>
                Username: {user.username}
              </p>
              <p>
                Email: {user.email}
              </p>
            </div>
          </div>
        </main>
    );
}

export default Profile;