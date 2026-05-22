import { Metadata } from 'next';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  try {
    const { slug } = await params;

    const res = await fetch(`${API_URL}/api/colleges/${slug}`);
    if (!res.ok) {
      return { title: 'College Not Found | CollegeScope' };
    }
    const college = await res.json();

    return {
      title: `${college.name} - Courses, Fees & Placements | CollegeScope`,
      description: `Explore ${college.name} located in ${college.location}. View detailed information about fees, placements, courses, and real student reviews.`,
      openGraph: {
        title: `${college.name} | CollegeScope`,
        description: `Explore ${college.name} in ${college.location}. Avg Fees: ₹${college.fees}/yr, Placement Rate: ${college.placementRate}%.`,
      }
    };
  } catch {
    return { title: 'College Details | CollegeScope' };
  }
}

export default function CollegeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

