import { HtmlHeader } from '@/layouts/components';
import PrivacyPolicy from '@/modules/PrivacyPolicy';

const Page = () => {
  return (
    <>
      <HtmlHeader title="Chính sách Quyền riêng tư - Youth+">
        <meta
          name="description"
          content="Tìm thêm thông tin về cách Youth+ xử lý dữ liệu cá nhân mà nó thu thập
          liên quan đến các yêu cầu đặt trước và các đơn hàng."
        />
      </HtmlHeader>
      <PrivacyPolicy />
    </>
  );
};

export default Page;
