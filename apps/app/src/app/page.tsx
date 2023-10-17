import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/PageHeading';
import { currentUser } from '@clerk/nextjs';
import type { User } from '@clerk/nextjs/api';

export default async function Index() {
  const user: User | null = await currentUser();
  return (
    <div>
      <PageHeader>
        <PageHeaderHeading>Dashboard</PageHeaderHeading>
        <PageHeaderDescription>
          Welcome back, {user?.firstName} !
        </PageHeaderDescription>
      </PageHeader>
    </div>
  );
}
