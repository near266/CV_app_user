import { Component } from 'react';
import Link from 'next/link';

import { httpClient } from '@/core';
import { formatServerDateToDurationString } from '@/helpers/date-helper';
import styles from './styles.module.scss';

interface IState {
  isLoading: boolean;
  posts: any[];
  categories: any[];
}

export class PopularPost extends Component<any, IState> {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      posts: [],
      categories: [],
    };
  }

  componentDidMount() {
    this.getPostData();
  }

  getPostData() {
    httpClient.get('posts/popular').then((response) => {
      const posts = response.data.payload.posts;
      const categories = response.data.payload.categories;
      this.setState({
        posts: posts,
        categories: categories,
      });
    });
  }

  render() {
    return (
      <div className={styles.popularPost}>
        <h2>Nổi bật trong tháng</h2>
        <div className={styles.posts}>
          {this.state.posts.map((item, index) => (
            <div className={styles.posts__line} key={index}>
              <div className={styles.posts__leftContent}>
                <Link href={`/profile/${item.creator.username}`}>
                  <a title={item.creator.name}>
                    <img
                      className="avatar-user-general"
                      src={item.creator.avatar}
                      alt="avatar"
                    />
                  </a>
                </Link>
              </div>
              <div className={styles.posts__rightContent}>
                <Link href={`/posts/${item.slug}`}>
                  <a className={styles.posts__title}>{item.name}</a>
                </Link>
                <span className={styles.posts__time}>
                  {formatServerDateToDurationString(item.created_at)}
                </span>
              </div>
            </div>
          ))}
        </div>

        <h2 className={styles.popularPost__categoryTitle}>Danh mục nổi bật</h2>
        <div className={styles.categories}>
          {this.state.categories.map((item, index) => (
            <div className={styles.categories__line} key={index}>
              <div className={styles.categories__leftContent}>
                <Link href={`/topic/${item.slug}`}>
                  <a title={item.name}>
                    <img
                      className={styles.categories__avatar}
                      src={item.avatar}
                      alt="avatar"
                    />
                  </a>
                </Link>
              </div>
              <div className={styles.categories__rightContent}>
                <Link href={`/topic/${item.slug}`}>
                  <a className={styles.categories__title}>{item.name}</a>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
