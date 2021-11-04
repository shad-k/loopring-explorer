import Document, { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

class CustomDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `
              var localDarkModeValue = localStorage.getItem('darkMode');
              if(!localDarkModeValue || localDarkModeValue && JSON.parse(localDarkModeValue)) {
                document.documentElement.classList.add('dark')
              }
          `,
            }}
          ></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default CustomDocument;
