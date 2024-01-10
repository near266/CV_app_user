import { useRouter } from 'next/router';
import { Paper } from '@mui/material';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { SocialShare } from '@/components';
import { AssessmentEnum, FullContentLayout } from '@/shared';
import styles from './styles.module.scss';

const Show = ({ ast }) => {
  const router = useRouter();
  const letTest = () => {
    const isConfirmed = confirm('Bạn có muốn làm bài ngay không?');
    if (isConfirmed) {
      const path = `/try-test/${ast.slug}${ast.isEvent ? '?event=true' : ''}`;
      router.push(path);
    }
  };

  return (
    <FullContentLayout className={styles.page}>
      <div className="container">
        <div className="row">
          <div className="col-md-9">
            <Paper className={styles.contentArea}>
              <div className={styles.uiHeader}>
                <h1 className={styles.uiHeader__title}>{ast.name}</h1>
              </div>

              {/* Avatar */}
              {ast.avatar && (
                <div className={styles.pageAvatar}>
                  <img src={ast.avatar} alt={ast.name} />
                </div>
              )}

              {/* Content */}
              <div className={styles.pageContent}>
                <div
                  className="content ck-content"
                  dangerouslySetInnerHTML={{ __html: ast.content }}
                ></div>

                {/* Share */}
                <div className={styles.pageContent__share}>
                  <SocialShare title={ast.name} />
                </div>
              </div>
            </Paper>
          </div>
          <div className="col-md-3">
            <div className="right-content">
              <Paper className={styles.additional}>
                <p className={cx(styles.additional__saleFree, 'text-success')}>
                  Miễn phí
                </p>
                <button
                  type="button"
                  className="btn btn-common btn-block"
                  onClick={letTest}
                >
                  Test ngay
                </button>
                <p
                  className={cx(styles.additional__des, 'font-weight-bold')}
                  style={{ margin: '10px 0 15px', fontSize: '16px' }}
                >
                  Thông tin bao gồm:
                </p>
                <p className={styles.additional__des}>
                  <i className="far fa-file-alt"></i>
                  Số lượng đánh giá: 01
                </p>
                {ast.sale_code === AssessmentEnum.SALE_CODE_FREE && (
                  <p className={styles.additional__des}>
                    <i className="fas fa-bolt"></i>
                    Xem kết quả miễn phí
                  </p>
                )}
                <p className={styles.additional__des}>
                  <i className="fas fa-redo"></i>
                  Lượt test : 1
                </p>
              </Paper>
            </div>
          </div>
        </div>
      </div>
    </FullContentLayout>
  );
};

Show.propTypes = {
  ast: PropTypes.object.isRequired,
};

export default Show;
