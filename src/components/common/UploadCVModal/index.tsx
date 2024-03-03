import {
  ConfigProvider,
  DatePicker,
  DatePickerProps,
  Form,
  Input,
  Select,
  Space,
  message,
} from 'antd';
import SrcIcons from '@/assets/icons';
import styles from './indexModal.module.scss';
import TextArea from 'antd/lib/input/TextArea';
import { PlusCircleOutlined } from '@ant-design/icons';
import locale from 'yup/lib/locale';
import 'dayjs/locale/zh-cn';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState, setAuthUser } from '@/store';
import { useSnackbar } from '@/shared/snackbar';
import Image from 'next/image';
import React, { useState } from 'react';
import FormItem from 'antd/lib/form/FormItem';
import { LICENSE_DATA_FIELD, listFeild, listGender } from '@/shared/enums/enum';
import Dragger from 'antd/lib/upload/Dragger';
import { UploadChangeParam } from 'antd/lib/upload';
import { UploadFile } from 'antd/es/upload';

const UploadCVModal = ({ onClose }) => {
  const me = useSelector((state: IRootState) => state.auth.me);
  const dispatch = useDispatch();
  const snackbar = useSnackbar();
  const [form] = Form.useForm();
  const avatarFile = Form.useWatch<UploadChangeParam<UploadFile<any>>>(
    LICENSE_DATA_FIELD.images,
    form
  );
  const [listImgEdit, setListImgEdit] = useState<string[]>([]);
  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };

  const handleFormSubmit = () => {
    console.log('aaa', form.getFieldsValue());
    form.setFieldValue([LICENSE_DATA_FIELD.images], ['aaa']);
  };

  return (
    <div className={styles.modal}>
      <Form
        form={form}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={handleFormSubmit}
        autoComplete="off"
        className="py-[20px] w-[85%] h-[85%] overflow-visible rounded-[16px] bg-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <button
          onClick={onClose}
          className="absolute z-12 cursor-pointer transition-transform transform hover:scale-105 z-10 text-white bg-[#44444F] border-solid border-[6px] border-white top-0 right-0 p-4 -translate-y-[10px] translate-x-[20px] rounded-full"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>

        <p className="text-[#0F0F14] font-medium p-[20px]">
          Tải hồ sơ của bạn lên YOUTH+
        </p>

        <div
          style={{ scrollbarWidth: 'thin' }}
          className="overflow-y-scroll overflow-x-none mb-[30px]  h-[80%] p-[20px]"
        >
          <style jsx global>{`
            ::-webkit-scrollbar {
              width: 10px; /* Độ dày của scrollbar cho trình duyệt WebKit (Chrome, Safari, Edge) */
            }
            ::-webkit-scrollbar-thumb {
              background-color: #ccc; /* Màu của thumb của scrollbar */
              border-radius: 6px; /* Bo tròn thumb của scrollbar */
            }
            ::-webkit-scrollbar-track {
              background-color: #f1f1f1; /* Màu của track của scrollbar */
              border-radius: 8px; /* Bo tròn track của scrollbar */
            }
          `}</style>

          {/* Thông tin các nhân */}
          <div>
            <p className="text-[#22216D] my-[25px] font-medium">Thông tin cá nhân</p>

            <div>
              <div className="grid tw-grid-cols-3 tw-gap-3">
                <div className="w-full">
                  <p className="text-[#44444F] py-2">
                    Họ & Tên <span className="text-[#EB4C4C]">*</span>
                  </p>
                  <FormItem
                    name={LICENSE_DATA_FIELD.license_name}
                    className="w-full"
                    rules={[{ required: true, message: 'Trường này là bắt buộc' }]}
                  >
                    <Input
                      size="large"
                      className="rounded-[10px] p-2"
                      placeholder="Nguyễn Văn A"
                      allowClear
                    ></Input>
                  </FormItem>
                </div>

                <div>
                  <p className="text-[#44444F] py-2">
                    Email <span className="text-[#EB4C4C]">*</span>
                  </p>
                  <FormItem
                    name={LICENSE_DATA_FIELD.license_email}
                    className="w-full"
                    rules={[{ required: true, message: 'Trường này là bắt buộc' }]}
                  >
                    <Input
                      size="large"
                      className="rounded-[10px] p-2"
                      placeholder="nguyenvanA@gmail.com"
                      allowClear
                    ></Input>
                  </FormItem>
                </div>

                <div>
                  <p className="text-[#44444F] py-2">
                    Số điện thoại <span className="text-[#EB4C4C]">*</span>
                  </p>
                  <FormItem
                    name={LICENSE_DATA_FIELD.license_phone}
                    className="w-full"
                    rules={[{ required: true, message: 'Trường này là bắt buộc' }]}
                  >
                    <Input
                      size="large"
                      className="rounded-[10px] p-2"
                      placeholder="0981765379"
                      allowClear
                    ></Input>
                  </FormItem>
                </div>
              </div>

              <div className="gap-3 grid tw-grid-cols-6 tw-grid-rows-1">
                <div className="col-span-1">
                  <p className="text-[#44444F] py-2">Ngày tháng năm sinh</p>
                  <FormItem
                    name={LICENSE_DATA_FIELD.license_day}
                    className="w-full"
                    rules={[{ required: true, message: 'Trường này là bắt buộc' }]}
                  >
                    <DatePicker
                      locale={locale}
                      placeholder="05/10/2001"
                      className="rounded-[10px] p-2 w-full"
                      onChange={onChange}
                      format="DD/MM/YYYY"
                    />
                  </FormItem>
                </div>

                <div className="col-span-1">
                  <p className="text-[#44444F] p-2">
                    Giới tính <span className="text-[#EB4C4C]">*</span>
                  </p>
                  <FormItem
                    name={LICENSE_DATA_FIELD.period}
                    className="w-full"
                    rules={[{ required: true, message: 'Trường này là bắt buộc' }]}
                  >
                    <Select
                      size="large"
                      placeholder="Chọn giới tính"
                      className="!rounded-[10px] bg-white w-full"
                      allowClear
                    >
                      {listGender.map((item: any) => {
                        return (
                          <Select.Option key={item.value} value={item.value}>
                            {item.label}
                          </Select.Option>
                        );
                      })}
                    </Select>
                  </FormItem>
                </div>

                <div className="col-span-4">
                  <p className="text-[#44444F] p-2">
                    Lĩnh vực <span className="text-[#EB4C4C]">*</span>
                  </p>
                  <FormItem
                    name={LICENSE_DATA_FIELD.period}
                    className="w-full"
                    rules={[{ required: true, message: 'Trường này là bắt buộc' }]}
                  >
                    <Select
                      size="large"
                      placeholder="Chọn lĩnh vực"
                      className="!rounded-[10px] bg-white w-full"
                      allowClear
                    >
                      {listFeild.map((item: any) => {
                        return (
                          <Select.Option key={item.value} value={item.value}>
                            {item.label}
                          </Select.Option>
                        );
                      })}
                    </Select>
                  </FormItem>
                </div>
              </div>

              <div className="">
                <p className="text-[#44444F] p-2">
                  Vị trí/Nơi sinh sống <span className="text-[#EB4C4C]">*</span>
                </p>

                <div className="gap-3 grid tw-grid-cols-6 tw-grid-rows-1">
                  <FormItem
                    name={LICENSE_DATA_FIELD.period}
                    className="col-span-1"
                    rules={[{ required: true, message: 'Trường này là bắt buộc' }]}
                  >
                    <Select
                      size="large"
                      placeholder="Tỉnh/Thành phố"
                      className="!rounded-[10px] bg-white w-full"
                      allowClear
                    ></Select>
                  </FormItem>

                  <FormItem
                    name={LICENSE_DATA_FIELD.period}
                    className="col-span-1"
                    rules={[{ required: true, message: 'Trường này là bắt buộc' }]}
                  >
                    <Select
                      size="large"
                      placeholder="Quận/Huyện"
                      className="!rounded-[10px] bg-white w-full"
                      allowClear
                    ></Select>
                  </FormItem>

                  <FormItem
                    name={LICENSE_DATA_FIELD.period}
                    className="col-span-1"
                    rules={[{ required: true, message: 'Trường này là bắt buộc' }]}
                  >
                    <Select
                      size="large"
                      placeholder="Xã/Phường"
                      className="!rounded-[10px] bg-white w-full"
                      allowClear
                    ></Select>
                  </FormItem>

                  <FormItem
                    name={LICENSE_DATA_FIELD.license_phone}
                    className="col-span-3"
                    rules={[{ required: true, message: 'Trường này là bắt buộc' }]}
                  >
                    <Input
                      size="large"
                      className="rounded-[10px] p-2"
                      placeholder="Vị trí chi tiết"
                      allowClear
                    ></Input>
                  </FormItem>
                </div>
              </div>
            </div>
          </div>

          {/* Học vấn */}
          <div>
            <p className="text-[#22216D] my-[25px] font-medium">Học vấn</p>

            <div>
              <p className="text-[#44444F] py-2">
                Trường học <span className="text-[#EB4C4C]">*</span>
              </p>
              <Input className="rounded-[10px] p-2" placeholder="Nhập tên trường"></Input>
            </div>

            <div>
              <p className="text-[#44444F] py-2">
                Chuyên ngành <span className="text-[#EB4C4C]">*</span>
              </p>
              <Input
                className="rounded-[10px] p-2"
                placeholder="Nhập chuyên ngành học"
              ></Input>
            </div>

            <div className="flex tw-gap-3">
              <div className="w-[50%]">
                <p className="text-[#44444F] py-2">Bắt đầu</p>

                <DatePicker
                  placeholder="12/10/2017"
                  className="rounded-[10px] p-2 w-full"
                  onChange={onChange}
                  format="DD/MM/YYYY"
                />
              </div>

              <div className="w-[50%]">
                <p className="text-[#44444F] py-2">Kết thúc</p>
                <DatePicker
                  placeholder="12/10/2022"
                  className="rounded-[10px] p-2 w-full"
                  onChange={onChange}
                  format="DD/MM/YYYY"
                />
              </div>
            </div>

            <div className="py-2 flex items-center ">
              <PlusCircleOutlined className="text-[#30AB7E] tw-me-3" />
              <button className="text-[#30AB7E] tw-font-semibold tw-py-2">
                Thêm phần học vấn
              </button>
            </div>
          </div>

          {/* Kinh nghiệm nghề nghiệp */}
          <div>
            <p className="text-[#22216D] my-[25px] font-medium">Kinh nghiệm làm việc</p>

            <div>
              <p className="text-[#44444F] py-2">Tên công ty</p>
              <Input
                className="rounded-[10px] p-2"
                placeholder="Nhập tên công ty"
              ></Input>
            </div>

            <div>
              <p className="text-[#44444F] py-2">Chức vụ</p>
              <Input
                className="rounded-[10px] p-2"
                placeholder="Nhập chức vụ làm việc"
              ></Input>
            </div>

            <div className="flex tw-gap-3">
              <div className="w-[50%]">
                <p className="text-[#44444F] py-2">Bắt đầu</p>
                <DatePicker
                  placeholder="12/10/2017"
                  className="rounded-[10px] p-2 w-full"
                  onChange={onChange}
                />
              </div>

              <div className="w-[50%]">
                <p className="text-[#44444F] py-2">Kết thúc</p>
                <DatePicker
                  placeholder="12/10/2022"
                  className="rounded-[10px] p-2 w-full"
                  onChange={onChange}
                  format="DD/MM/YYYY"
                />
              </div>
            </div>

            <div className="flex tw-items-center py-2">
              <PlusCircleOutlined className="text-[#30AB7E] tw-me-3" />
              <button className="text-[#30AB7E] tw-font-semibold py-2">
                Thêm phần kinh nghiệm làm việc{' '}
              </button>
            </div>
          </div>

          <div>
            <p className="text-[#22216D] my-[25px] font-medium">Mong muốn công việc</p>

            <div className="grid tw-grid-cols-3 tw-gap-3">
              <div>
                <p className="text-[#44444F] py-2">Vị trí mong muốn</p>
                <Input
                  className="rounded-[10px] p-2"
                  placeholder="Nhập vị trí mong muốn"
                ></Input>
              </div>

              <div>
                <p className="text-[#44444F] py-2">Mức lương mong muốn</p>
                <Input className="rounded-[10px] p-2" placeholder="0"></Input>
              </div>

              <div>
                <p className="text-[#44444F] py-2">Loại hình làm việc</p>
                <Select
                  bordered={false}
                  className="border  rounded-[10px] h-[40.45px] flex tw-items-center"
                ></Select>
              </div>
            </div>
          </div>

          <div>
            <p className="text-[#22216D] my-[25px] font-medium">Lời nhắn</p>

            <TextArea
              rows={4}
              className="rounded-[10px]"
              placeholder="Nhập lời nhắn"
            ></TextArea>
          </div>

          {/* Tải FILE  */}
          <div className="mt-[30px] flex flex-col w-full gap-[10px]">
            <p className="font-[400] mb-1 text-[14px] text-[#696974] ">
              (Định dạng file .doc, .docx, .pdf dung lượng không lớn hơn 5 MB)
            </p>
            <FormItem name={LICENSE_DATA_FIELD.images || ''} className="w-full h-full">
              <Dragger
                className="h-full bg-[#F1F1F5] !rounded-[10px] !border-[3px] !border-dashed border-[#D5D5DC] !overflow-hidden"
                maxCount={1}
                onChange={(info) => {}}
                // showUploadList={false}
                fileList={avatarFile?.fileList}
              >
                {listImgEdit.length > 0 ? (
                  <div className="relative w-full min-h-[52px]">
                    <Image src={listImgEdit[0]} alt="Youth+ Doanh nghiệp" layout="fill" />
                  </div>
                ) : (
                  <div className="ant-upload-drag-icon flex justify-center">
                    <Image
                      src={SrcIcons.file_plus}
                      width={42}
                      height={52}
                      alt="Youth+ Doanh nghiệp"
                    />
                  </div>
                )}
                <p className="ant-upload-text">
                  Kéo thả file vào đây hoặc chọn file từ máy tính
                </p>
                <p className="ant-upload-hint">
                  Kích thước: {Number(avatarFile?.file?.size / 1048576).toFixed(3)} MB
                </p>
                {avatarFile?.file?.name && (
                  <p className="ant-upload-hint">Tên file: {avatarFile?.file?.name}</p>
                )}
              </Dragger>
            </FormItem>
          </div>
        </div>

        <div className="flex tw-justify-end tw-pe-[30px]">
          <button className="text-white bg-[#EB4C4C] w-[110px] font-semibold p-2 mr-3 rounded-[8px]">
            Hủy bỏ
          </button>

          <button
            type="submit"
            className="rounded-[8px] w-[110px] text-white font-semibold p-2 bg-[#403ECC]"
          >
            Tải lên
          </button>
        </div>
      </Form>
    </div>
  );
};

export default UploadCVModal;
