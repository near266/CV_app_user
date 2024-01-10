import { HtmlHeader } from '@/layouts/components';
import { Auth } from '@/core';
import Create from '@/modules/Post/pages/Create';

const Page = () => {
  return (
    <>
      <HtmlHeader title="Viết bài - Youth+" />
      <Auth>
        <Create />
      </Auth>
    </>
  );
};

export default Page;
