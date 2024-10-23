import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import { ComponentType, useEffect } from 'react';
import { useRouter } from 'next/router';

// Định nghĩa kiểu cho các props
type WithAuthProps = {
  accessToken: string;  // Bổ sung accessToken vào kiểu props
};

const withAuth = <P extends object>(WrappedComponent: ComponentType<P & WithAuthProps>) => {
  const AuthenticatedComponent = (props: P & WithAuthProps) => {
    const router = useRouter();

    useEffect(() => {
      const accessToken = props.accessToken;

      // Nếu không có access_token phía client, chuyển hướng tới trang signin
      if (!accessToken) {
        router.replace('/signin');
      }
    }, [router, props.accessToken]);

    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = parseCookies(ctx);
  const accessToken = cookies.access_token;

  if (!accessToken) {
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    };
  }

  return {
    props: {
      accessToken, // Truyền access_token cho component
    },
  };
};

export default withAuth;
