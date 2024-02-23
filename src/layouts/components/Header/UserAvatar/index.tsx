import cx from 'classnames';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';

import { CustomDropdown } from '@/components';
import { asyncLogoutAuth, IRootState } from '@/store';
import { useEffect, useState } from 'react';
import styles from './styles.module.scss';

const UserAvatar = () => {
  const me = useSelector((state: IRootState) => state.auth.me);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(asyncLogoutAuth());
  };

  return (
    <CustomDropdown
      dropdownMenu={
        <div className={styles.menu}>
          <div className={styles.currentUser}>
            <div className={styles.currentUser__name}>{me.name}</div>
            <div className="username">{`@${me.username}`}</div>
          </div>
          <div className={styles.divider} />
          <ul className={styles.expandMenu}>
            <li>
              <Link href={`/profile/${me.username}`}>
                <a className={styles.expandMenu__item}>
                  <i className="fa-solid fa-user" />
                  Trang cá nhân
                </a>
              </Link>
            </li>
            <li>
              <Link href="/account/setting">
                <a className={styles.expandMenu__item}>
                  <i className="fa fa-cog" />
                  Cài đặt tài khoản
                </a>
              </Link>
            </li>
            <li>
              <Link href="/cv-management">
                <a className={styles.expandMenu__item}>
                  <i className="fas fa-book" />
                  Quản lý CV
                </a>
              </Link>
            </li>
            <li>
              <Link href="/explore">
                <a className={styles.expandMenu__item}>
                  <i className="fas fa-rocket" />
                  Khám phá
                </a>
              </Link>
            </li>
            <li>
              <Link href="/account/history">
                <a className={styles.expandMenu__item}>
                  <i className="fa fa-shopping-cart" />
                  Lịch sử đơn hàng
                </a>
              </Link>
            </li>
            <li>
              <Link href="/ranking">
                <a className={styles.expandMenu__item}>
                  <i className="fa fa-trophy" />
                  Bảng xếp hạng
                </a>
              </Link>
            </li>
            <div className={styles.divider} />
            <li>
              {/* TODOKOGAP: Xem co che dang xuat khac hay hon k */}
              <span className={styles.expandMenu__item} onClick={logout}>
                <i className="fa fa-sign-out-alt" />
                Đăng xuất
              </span>
            </li>
          </ul>
        </div>
      }
    >
      <div className={cx(styles.userHeader, 'menu-styled')}>
        <img src={me.avatar || '/images/avatar/default.png'} alt={me.name} />
      </div>
    </CustomDropdown>
  );
};

export default UserAvatar;
