import { BaseSyntheticEvent, useRef, useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CircularProgress } from '@mui/material';
import { useDispatch } from 'react-redux';
import cx from 'classnames';

import { setUserFieldValue } from '@/store';
import { userService } from '../../../../shared';
import UserContext from '../../contexts/userContext';
import styles from './styles.module.scss';

const Avatar = ({ avatarUrl, userName }) => {
  const dispatch = useDispatch();
  const { showForCurrentUser } = useContext(UserContext);
  const fileRef = useRef<any>();

  const [processing, setProcessing] = useState<boolean>(false);
  const [internalAvatar, setInternalAvatar] = useState<string>('');

  useEffect(() => {
    setInternalAvatar(avatarUrl);
  }, [avatarUrl]);

  const showFileChooser = () => {
    if (processing || !showForCurrentUser) {
      return;
    }

    fileRef.current.click();
  };

  const handleFileChange = (e: BaseSyntheticEvent) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      setProcessing(true);

      // create form data
      const formData = new FormData();
      formData.append('image', files['0']);

      userService
        .changeAvatar(formData)
        .then((res) => {
          if (res?.code === 'SUCCESS') {
            setInternalAvatar(res.payload.url);
            dispatch(setUserFieldValue({ key: 'avatar', value: res.payload.url }));
          }
        })
        .finally(() => setProcessing(false));
    }
  };

  return (
    <div
      className={showForCurrentUser ? styles.avatarWrapper : styles.avatarNoUploadWrapper}
      onClick={showFileChooser}
    >
      <img src={internalAvatar} alt={userName} />
      {processing && (
        <div
          className={cx(
            styles.processingWrapper,
            'd-flex align-items-center justify-content-center'
          )}
        >
          <CircularProgress size={26} color="secondary" />
        </div>
      )}
      <input
        className={styles.fileUpload}
        onChange={(e) => handleFileChange(e)}
        name="image"
        type="file"
        ref={fileRef}
      />
    </div>
  );
};

Avatar.propTypes = {
  avatarUrl: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
};

export default Avatar;
