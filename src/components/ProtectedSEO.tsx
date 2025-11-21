import { Helmet } from "react-helmet";

/**
 * SEO component for protected routes (portal, admin, auth)
 * Prevents these pages from being indexed by search engines
 */
const ProtectedSEO = ({ title }: { title: string }) => {
  return (
    <Helmet>
      <title>{title} | Grilly Cheese</title>
      <meta name="robots" content="noindex, nofollow" />
      <meta name="googlebot" content="noindex, nofollow" />
    </Helmet>
  );
};

export default ProtectedSEO;
