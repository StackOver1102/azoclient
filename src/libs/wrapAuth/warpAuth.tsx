import { useRouter } from 'next/router';
import { useEffect, ComponentType } from 'react';
import Cookies from 'js-cookie'; // Import thư viện js-cookie

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const AuthenticatedComponent = (props: P) => {
    const router = useRouter();

    useEffect(() => {
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
