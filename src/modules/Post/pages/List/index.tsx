import { Component } from 'react';
import Link from 'next/link';
import cx from 'classnames';
import PropTypes from 'prop-types';
import Router, { withRouter } from 'next/router';
import { connect } from 'react-redux';
import { Paper, Pagination } from '@mui/material';
import { ceil } from 'lodash-es';

import { IRootState } from '@/store';
import { Post, PopularPost } from '@/components';
import { FullContentLayout } from '@/shared';
import { PostSkeleton } from '@/skeletons';
import { IPost } from '@/interfaces';
import { postService } from '../../shared';
import styles from './styles.module.scss';
import SearchBar from '@/layouts/components/SearchBar';

interface IState {
  posts: IPost[];
  isLoading: boolean;
  activePage: number;
  pageCount: number;
  pageRangeDisplayed: number;
}

export class List extends Component<any, IState> {
  static propTypes = {
    apiUrl: PropTypes.string.isRequired,
    isAuthenticated: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    // responsive paginate
    let pageRangeDisplayed = 8;
    if (screen.width < 600) {
      pageRangeDisplayed = 3;
    }

    this.state = {
      posts: [],
      isLoading: true,
      activePage: 1,
      pageCount: 0,
      pageRangeDisplayed: pageRangeDisplayed,
    };
  }

  componentDidMount() {
    const page = this.props.router.query.page || 1;
    this.getPostData(page);
  }

  componentWillUnmount() {
    // Router.events.off('routeChangeStart', this.changePage);
  }

  changePage = (url) => {
    // this.getPostData(pageNumber);
  };

  handlePageChange = (e, pageNumber: number) => {
    if (pageNumber === this.state.activePage) return false;
    const pathname = this.props.rUri || '/posts';
    Router.push({ pathname: pathname, query: { page: pageNumber } });

    this.getPostData(pageNumber);
  };

  async getPostData(page) {
    const res = await postService.getList(this.props.apiUrl, page).finally(() => {
      this.setState({ isLoading: false });
    });

    const posts = res.payload;
    posts.data.map((post) => {
      post.liked = post.liked.length > 0;
    });
    this.setState({
      posts: posts.data,
      activePage: posts.current_page,
      pageCount: ceil(posts.total / posts.per_page),
    });
    window.scrollTo(0, 0);
  }

  render() {
    const Posts = this.state.posts.map((item, index) => (
      <Post key={index} post={item} isAuthenticated={this.props.isAuthenticated} />
    ));

    const Loading = Array(2)
      .fill(0)
      .map((item, index) => (
        <Paper key={index} className={styles.feed}>
          <PostSkeleton />
        </Paper>
      ));

    return (
      <FullContentLayout className={styles.page}>
        <div className="container">
          <Link href="/posts/create" className="">
            <a className="btn btn-common write-post tw-mb-5">
              <i className="fa fa-pencil-alt" aria-hidden="true"></i>
              <span className="d-none d-md-inline">Viết bài</span>
            </a>
          </Link>
          <div className="tw-mb-5 tw-flex tw-gap-4 ">
            <SearchBar
              customStyle={{
                searchBar: 'tw-w-[44%] tw-absolute tw-z-10 tw-translate-x-[10px]',
                searchBox__input: 'tw-h-[30px] -tw-translate-x-[10px]',
              }}
            />
          </div>
          <div className="row tw-mt-9 ">
            <div className={cx('col-md-8', styles.listPost)}>
              {this.state.isLoading ? (
                Loading
              ) : Posts.length > 0 ? (
                Posts
              ) : (
                <div className={styles.noPosts}>
                  <p className={styles.noPosts__title}>Không có bài viết nào</p>
                  <Link href="/explore">
                    <a>
                      <button
                        type="button"
                        className={cx(styles.noPosts__generalButton, 'btn btn-common')}
                      >
                        Theo dõi topic
                      </button>
                    </a>
                  </Link>
                  <Link href="/posts">
                    <a>
                      <button
                        type="button"
                        className={cx(styles.noPosts__generalButton, 'btn btn-common')}
                      >
                        Tất cả
                      </button>
                    </a>
                  </Link>
                </div>
              )}

              {Posts.length > 0 && (
                <Paper className="tw-p-2 tw-flex tw-justify-center tw-mt-4">
                  <Pagination
                    count={this.state.pageCount}
                    page={this.state.activePage}
                    shape="rounded"
                    onChange={this.handlePageChange}
                  />
                </Paper>
              )}
            </div>
            <div className="col-md-4">
              {/* <div className={styles.banner}>
                <a
                  href="https://bit.ly/membershipfromweb"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src="/images/membership/banner.gif" alt="Membership" />
                </a>
              </div> */}
              {/* <div style={{ marginBottom: '10px' }}>
                <AdSense adFormat="rectangle" adSlot="6848968161" />
              </div> */}
              <PopularPost />
            </div>
          </div>
        </div>
      </FullContentLayout>
    );
  }
}

const mapStateToProps = (state: IRootState) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};

export default connect(mapStateToProps)(withRouter(List));
