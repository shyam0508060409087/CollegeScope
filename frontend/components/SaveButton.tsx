'use client';

import { Heart } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function SaveButton({ collegeId, saved: initialSaved = false }: { collegeId: string; saved?: boolean }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [saved, setSaved] = useState(initialSaved);
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    if (!session) {
      router.push('/login');
      return;
    }

    const prev = saved;
    setSaved(!saved);
    setLoading(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const token = (session as any)?.user?.accessToken;
      if (prev) {
        const res = await fetch(`${apiUrl}/api/saved/${collegeId}`, { 
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!res.ok) throw new Error();
        toast.success('Removed from saved');
      } else {
        const res = await fetch(`${apiUrl}/api/saved`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ collegeId }),
        });
        if (!res.ok) throw new Error();
        toast.success('Saved to favorites!');
      }
    } catch {
      setSaved(prev);
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`p-2.5 rounded-xl border transition-all duration-200 ${
        saved
          ? 'bg-red-50 border-red-200 text-red-500'
          : 'border-gray-200 text-gray-400 hover:border-red-200 hover:text-red-500 hover:bg-red-50'
      } ${loading ? 'opacity-50' : ''}`}
      title={saved ? 'Unsave' : 'Save'}
    >
      <Heart className={`w-4 h-4 ${saved ? 'fill-red-500' : ''}`} />
    </button>
  );
}
