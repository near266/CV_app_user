import { IRootState } from '@/store';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Common } from '@/shared';
const Auth = ({ children }) => {
  const isAuthenticated = useSelector((state: IRootState) => state.auth.isAuthenticated);
  const isFetched = useSelector((state: IRootState) => state.auth.isFetched);
  useEffect(() => {
    if (!isAuthenticated) {
      Common.redirectToAuthenticate();
    }

    return () => {};
  }, [isAuthenticated]);

  const View = isFetched ? children : <span aria-label="Loading ..."></span>;

  return isAuthenticated ? View : null;
};

export default Auth;
