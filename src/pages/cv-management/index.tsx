import { HtmlHeader } from '@/layouts/components';
import { Auth } from '@/core';
import Management from '@/modules/Resume/pages/Management';

const Page = () => {
  return (
    <>
      <HtmlHeader title="Quản lý CV" />
      <Auth>
        <Management />
      </Auth>
    </>
  );
};

export default Page;
