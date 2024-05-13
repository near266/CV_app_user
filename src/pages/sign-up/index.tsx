import React from 'react';
import SrcImages from '@/assets/image';
import Image from 'next/image';
import Link from 'next/link';
import { Checkbox, Form, message } from 'antd';
import { TextBoxWithLabel } from '@/components';

const SignUp = () => {
  const [form] = Form.useForm();

  const LoginModule = () => {
    // const [form] = Form.useForm();
    // const handleLogin = async () => {
    //   const { email, password, remember_me } = form.getFieldsValue();
    //   if (!email || !password) {
    //     message.warning('Vui lòng nhập đầy đủ thông tin');
    //     return;
    //   }
    //   onLogin(email, password, remember_me);
  };

  const onLogin = async () =>
    //   email: FORM_DATA_FIELD.email,
    //   password: FORM_DATA_FIELD.password,
    //   remember_me: boolean
    {
      //   try {
      //     appLibrary.showloading();
      //     const { code, payload }: { code: SV_RES_STATUS_CODE; payload: LoginResponse } =
      //       await loginInstance.login(email, password, remember_me);
      //     if (code === SV_RES_STATUS_CODE.success) {
      //       message.success('Đăng nhập thành công');
      //       message.success('Đang chuyển hướng đến trang quản trị');
      //       setCookie(TokenPair.access_token, payload.access_token, {
      //         expires: new Date(Date.now() + 1000 * 60 * 60 * 12),
      //         secure: payload.secure,
      //       });
      //       setCookie(TokenPair.refresh_token, payload.refresh_token, {
      //         expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      //         secure: payload.secure,
      //       });
      //       redirectToAdmin();
      //     }
      //   } catch (error) {
      //     appLibrary.hideloading();
      //     message.error(error?.response?.data?.error ?? 'Đăng nhập thất bại');
      //   }
    };

  const onAllStepComplete = () => {};
  return (
    <div className="grid grid-cols-2 h-full m-auto max-w-[1310px] bg-white shadow-[3px_-5px_40px_rgba(205,205,212,0.1)] rounded-[20px] overflow-hidden">
      <div className="relative min-h-[645px] h-full w-full">
        <Image
          src={SrcImages.sideImage}
          alt="Youth"
          layout="fill"
          objectFit="fill"
          priority
        />
      </div>
      <div className="w-full">
        <div className="px-[27px] py-[36px] h-full flex flex-col">
          <Form
            className="w-full flex flex-col"
            onFinish={onAllStepComplete}
            form={form}
            autoComplete="off"
          >
            <div className="form-title mt-6">
              <h1 className="font-semibold text-3xl leading-[39px] text-gray-900">
                Đăng kí tài khoản
              </h1>
              <p className="text-[#696974] max-w-[467px] leading-[26px] font-[16px] mt-4">
                Đăng kí tài khoản , vui lòng điền thông tin dưới đây
              </p>
            </div>
            <div className="steps-content mt-2">
              <div className="flex flex-col gap-4 mt-5">
                <Form.Item
                  name="email"
                  className="w-full"
                  required
                  rules={[
                    {
                      required: true,
                      message: 'Email không được để trống',
                    },
                  ]}
                >
                  <TextBoxWithLabel name="email" label="Tên đăng nhập" />
                </Form.Item>
                <Form.Item
                  name="password"
                  className="w-full"
                  required
                  rules={[
                    {
                      required: true,
                      message: 'Mật khẩu không được để trống',
                    },
                  ]}
                >
                  <TextBoxWithLabel
                    name="password"
                    label="Mật khẩu"
                    inputType="password"
                  />
                </Form.Item>
              </div>
            </div>
          </Form>
          <div className="steps-action flex m-auto mt-0">
            <button className="border-gray-500">Đăng kí</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
