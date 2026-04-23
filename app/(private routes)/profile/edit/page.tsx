'use client';

import css from "./EditProfilePage.module.css";
import { updateMe } from "@/lib/api/clientApi";
import { useRouter } from "next/router";
import { useState } from "react";
import Image from 'next/image';
import { User } from "@/types/user";

interface ProfileProps  {
  user: User;
}

export default function EditProfilePage({ user }: ProfileProps) {
    const [username, setUsername] = useState(user.username);
    const router = useRouter();

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        await updateMe(username);
        router.push('/profile');
    };
    const handleCancel = () => {
      router.push('/profile');
    }

    return (
      <main className={css.mainContent}>
        <div className={css.profileCard}>
          <h1 className={css.formTitle}>Edit Profile</h1>

          <Image
            src={user.avatar}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />

          <form className={css.profileInfo} onSubmit={handleSubmit}>
            <div className={css.usernameWrapper}>
              <label htmlFor="username">Username:</label>
              <input id="username"
                type="text"
                className={css.input}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <p>Email: {user.email}</p>
            
            <div className={css.actions}>
              <button type="submit" className={css.saveButton} >
                Save
              </button>
              <button type="button" className={css.cancelButton} onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </main>
    );  
}