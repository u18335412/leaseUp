import { currentUser } from "@clerk/nextjs";
import type { User } from "@clerk/nextjs/api";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-heading";

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
