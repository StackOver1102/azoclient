import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { ComponentType, useEffect } from 'react';

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const AuthenticatedComponent = (props: P) => {
    const router = useRouter();

    useEffect(() => {
      // TODO: Nếu URL là /refill thì chuyển hướng đến trang 404
      if (router.pathname === '/refill') {
        router.replace('/404');
        return;
      }

      // Lấy token từ cookie
      const token = Cookies.get('access_token');
      if (!token) {
        // Chuyển hướng đến trang signin nếu không có token
        router.replace('/signin');
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
