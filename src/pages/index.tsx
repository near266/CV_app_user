import { HtmlHeader } from '@/layouts/components';
import Home from '@/modules/Home';

const Page = () => {
  return (
    <>
      <HtmlHeader title="Trang chủ - Eztekfhausihfosdho" />
      <Home />
    </>
  );
};

export default Page;
export async function getStaticProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}
