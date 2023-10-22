import type { NextPage } from "next";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-heading";

const Reports: NextPage = () => {
  return (
    <div>
      <PageHeader>
        <PageHeaderHeading>Reports</PageHeaderHeading>
        <PageHeaderDescription>
          Get all the reports you need to run your business.
        </PageHeaderDescription>
      </PageHeader>
    </div>
  );
};

export default Reports;
