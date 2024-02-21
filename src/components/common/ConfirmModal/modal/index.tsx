import { NextPage } from 'next';
import styles from './indexModal.module.scss';

const AfterTest = ({ onClose }) => {
  return (
    <>
      <div className={styles.modal}>
        <div className="p-[20px] w-[500px] h-[full] overflow-visible rounded-[16px] bg-white fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
          <button
            onClick={onClose}
            className="absolute cursor-pointer transition-transform transform hover:scale-105 z-1000000000000000000000000 text-white bg-[#44444F] border-solid border-[6px] border-white top-0 right-0 p-4 -translate-y-[10px] translate-x-[20px] rounded-full"
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

          <div className="flex justify-center p-3 font-600">
            <p>
              Thêm CV của bạn để được doanh nghiệp chủ động liên hệ, tăng cơ hội có được
              việc làm !
            </p>
          </div>

          <div className="flex justify-center">
            <button
              onClick={onClose}
              className="text-[#403ECC] font-600 boder-solid border-[1px] border-[#403ECC] p-2 mr-3 rounded-[8px]"
            >
              Tạo
            </button>

            <button className="rounded-[8px] text-white font-500 p-2 bg-[#403ECC]">
              Tải lên
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AfterTest;
