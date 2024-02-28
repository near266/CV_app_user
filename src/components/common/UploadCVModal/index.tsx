import {
  ConfigProvider,
  DatePicker,
  DatePickerProps,
  Input,
  Select,
  Space,
  message,
} from 'antd';
import styles from './indexModal.module.scss';
import TextArea from 'antd/lib/input/TextArea';
import { PlusCircleOutlined } from '@ant-design/icons';
import FileUpload from '../fileUpload';
import locale from 'yup/lib/locale';
import 'dayjs/locale/zh-cn';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState, setAuthUser } from '@/store';
import { useSnackbar } from '@/shared/snackbar';
import { useFormik, Formik, Field, ErrorMessage } from 'formik';
import { SettingForm } from '@/modules/User/pages/Setting/models';
import { validationSchema } from './validationSchema';
import { appLibrary, authService } from '@/shared';
import { FormHelper, TextInput, Form } from '@/shared/forms';
import { ValidationError } from 'yup';
import { log } from 'console';
import React, { useState } from 'react';

const UploadCVModal = ({ onClose }) => {
  const me = useSelector((state: IRootState) => state.auth.me);
  const dispatch = useDispatch();
  const snackbar = useSnackbar();

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };

  const settingForm = useFormik<SettingForm>({
    initialValues: new SettingForm(me),
    validationSchema,
    onSubmit: handleSubmit,
  });

  async function handleSubmit(formValues: SettingForm) {
    appLibrary.showloading();
    const res = await authService
      .updateMeInfo(formValues)
      .catch((errors) => {
        FormHelper.handleValidationErrors(settingForm, errors);
        snackbar.showMessage('Có lỗi, vui lòng kiểm tra lại thông tin', 'error');
      })
      .finally(() => appLibrary.hideloading());

    if (res?.code === 'SUCCESS') {
      dispatch(setAuthUser(res.payload));
      snackbar.showMessage('Cập nhật thông tin thành công', 'success');
    }
  }

  return (
    <>
      <div className={styles.modal}>
        <Form
          initForm={settingForm}
          onSubmit={settingForm.handleSubmit}
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

            <div>
              <p className="text-[#22216D] my-[25px] font-medium">Thông tin cá nhân</p>

              <div>
                <div className="grid tw-grid-cols-3 tw-gap-3">
                  <div>
                    <p className="text-[#44444F] py-2">
                      Họ & Tên <span className="text-[#EB4C4C]">*</span>
                    </p>
                    <Input
                      required
                      name="name"
                      className="rounded-[10px] p-2"
                      placeholder="Nguyễn Văn A"
                    ></Input>
                  </div>

                  <div>
                    <p className="text-[#44444F] py-2">
                      Email <span className="text-[#EB4C4C]">*</span>
                    </p>
                    <Input
                      className="rounded-[10px] p-2"
                      placeholder="nguyenvana123@gmail.com"
                    ></Input>
                  </div>

                  <div>
                    <p className="text-[#44444F] py-2">
                      Số điện thoại <span className="text-[#EB4C4C]">*</span>
                    </p>
                    <Input
                      className="rounded-[10px] p-2"
                      placeholder="0123456789"
                    ></Input>
                  </div>
                </div>

                <div className="flex gap-3 tw-my-3">
                  <div className="w-[25%]">
                    <div className="w-full">
                      <p className="text-[#44444F] py-2">Ngày tháng năm sinh</p>
                      <DatePicker
                        locale={locale}
                        placeholder="12/10/2002"
                        className="rounded-[10px] p-2 w-full"
                        onChange={onChange}
                        format="DD/MM/YYYY"
                      />
                    </div>
                  </div>

                  <div className="w-[25%]">
                    <p className="text-[#44444F] p-2">
                      Giới tính <span className="text-[#EB4C4C]">*</span>
                    </p>

                    <Select
                      bordered={false}
                      className="border rounded-[10px] w-full h-[40.45px] flex tw-items-center"
                      placeholder="Nam"
                    >
                      <option value="male">Nam</option>
                      <option value="female">Nữ</option>
                      <option value="khac">Khác</option>
                    </Select>
                  </div>

                  <div className="w-[50%]">
                    <p className="text-[#44444F] p-2">
                      Lĩnh vực <span className="text-[#EB4C4C]">*</span>
                    </p>

                    <Select
                      bordered={false}
                      className="border rounded-[10px] w-full h-[40.45px] flex tw-items-center"
                      placeholder="Sale & Marketing"
                    ></Select>
                  </div>
                </div>

                <div className="">
                  <p className="text-[#44444F] p-2">
                    Vị trí/Nơi sinh sống <span className="text-[#EB4C4C]">*</span>
                  </p>

                  <div className="flex gap-3 ">
                    <Select
                      bordered={false}
                      className="border w-[20%] rounded-[10px] h-[40.45px] flex tw-items-center"
                      placeholder="Tỉnh/Thành phố"
                    ></Select>

                    <Select
                      bordered={false}
                      className="border w-[20%] rounded-[10px] h-[40.45px] flex tw-items-center"
                      placeholder="Quận/Huyện"
                    ></Select>

                    <Select
                      bordered={false}
                      className="border w-[20%] rounded-[10px] h-[40.45px] flex tw-items-center"
                      placeholder="Xã/Phường"
                    ></Select>

                    <Input
                      className="rounded-[10px] p-2 w-[40%]"
                      placeholder="Vị trí chi tiết"
                    ></Input>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <p className="text-[#22216D] my-[25px] font-medium">Học vấn</p>

              <div>
                <p className="text-[#44444F] py-2">
                  Trường học <span className="text-[#EB4C4C]">*</span>
                </p>
                <Input
                  className="rounded-[10px] p-2"
                  placeholder="Nhập tên trường"
                ></Input>
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

            <div className="my-2 ">
              <p className="py-3 text-[#696974]">
                (Định dạng file .doc, .docx, .pdf dung lượng &le; 5 MB)
              </p>
              <FileUpload></FileUpload>
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
    </>
  );
};

export default UploadCVModal;
