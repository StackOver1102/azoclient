import { useRouter } from 'next/router';
import { useEffect, ComponentType } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const AuthenticatedComponent = (props: P) => {
    const router = useRouter();
    const userLogin = useSelector((state: RootState) => state.user);

    useEffect(() => {
      if (!userLogin.access_token) {
        router.replace('/signin'); 
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
