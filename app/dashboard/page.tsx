"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getSession } from 'next-auth/react';
import TodoForm from '@/components/Form';

export default function Page() {
  const router = useRouter();
  const [session, setSession] = useState(null);

  useEffect(() => {
    async function checkSession() {
      const session = await getSession();
      setSession(session);

      if (!session) {
        router.push("/register");
      }
    }

    checkSession();
  }, [router]);

  if (session) {
    return (
      <div>
       <TodoForm/>
      </div>
    );
  }

  
  return null;
}

