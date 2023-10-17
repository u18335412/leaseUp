import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/PageHeading';
import { NextPage } from 'next';

const People: NextPage = () => {
  return (
    <div>
      <PageHeader>
        <PageHeaderHeading>People</PageHeaderHeading>
        <PageHeaderDescription>
          Manage all the people in your business
        </PageHeaderDescription>
      </PageHeader>
    </div>
  );
};

export default People;
