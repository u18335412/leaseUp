import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/PageHeading';
import { NextPage } from 'next';

const Documents: NextPage = () => {
  return (
    <div>
      <PageHeader>
        <PageHeaderHeading>Documents</PageHeaderHeading>
        <PageHeaderDescription>
          Your documents are here for you to view, manage and download.
        </PageHeaderDescription>
      </PageHeader>
    </div>
  );
};

export default Documents;