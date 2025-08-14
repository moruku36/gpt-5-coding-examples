export default function Head() {
  return (
    <>
      <meta
        httpEquiv="Content-Security-Policy"
        content="default-src 'self'; img-src 'self' data: https:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; script-src 'self' https: 'unsafe-inline'; connect-src 'self'; frame-ancestors 'self'; base-uri 'self'; object-src 'none'; upgrade-insecure-requests"
      />
      <meta httpEquiv="Referrer-Policy" content="no-referrer" />
      <meta httpEquiv="Permissions-Policy" content="camera=(), microphone=()" />
    </>
  );
}


