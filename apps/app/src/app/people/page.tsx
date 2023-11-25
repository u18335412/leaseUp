import type { NextPage } from "next";
import { Tenants } from "./tenants";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-heading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "ui";

const People: NextPage = () => {
  return (
    <div>
      <PageHeader>
        <PageHeaderHeading>People</PageHeaderHeading>
        <PageHeaderDescription>
          Manage all the people in your business
        </PageHeaderDescription>
      </PageHeader>

      <div className="mt-4">
        <Tabs defaultValue="tenants">
          <TabsList>
            <TabsTrigger value="tenants">Tenants</TabsTrigger>
            <TabsTrigger value="owners">Owners</TabsTrigger>
          </TabsList>
          <TabsContent value="tenants">
            <Tenants />
          </TabsContent>
          <TabsContent value="owners">
            <div>Owners</div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default People;
