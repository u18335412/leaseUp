import { FC } from "react";
import type { NextPage } from "next";
import { Tenants } from "./tenants";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-heading";
import { UserCheck, Users } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "ui";

const People: FC<{
  children: JSX.Element;
}> = ({ children }) => {
  return (
    <div>
      <Tabs defaultValue="tenants">
        <div>
          <div className="flex items-end justify-between">
            <PageHeader>
              <PageHeaderHeading>People</PageHeaderHeading>
              <PageHeaderDescription>
                Manage all the people in your business
              </PageHeaderDescription>
            </PageHeader>
            <TabsList>
              <TabsTrigger value="tenants" className="flex items-center gap-2">
                <Users
                  className="text-muted-foreground h-4 w-4"
                  aria-hidden="true"
                />
                Tenants
              </TabsTrigger>
              <TabsTrigger value="owners" className="flex items-center gap-2">
                <UserCheck
                  className="text-muted-foreground h-4 w-4"
                  aria-hidden="true"
                />
                Owners
              </TabsTrigger>
            </TabsList>
          </div>

          <div>{children}</div>
        </div>
      </Tabs>
    </div>
  );
};

export default People;
