import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/PageHeading';
import { NextPage } from 'next';
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'ui';

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
            <div>Tenants</div>
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
