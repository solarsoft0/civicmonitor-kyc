// _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file

// ./pages/_document.js
import Document, { Head, Main, NextScript } from "next/document";
import "../styles/style.css";


// import store from "../redux/store/index";
// import { addArticle } from "../redux/actions/index";

// window.store = store;
// window.addArticle = addArticle;


export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <html>
        <Head>
          <style>{`body { margin: 0 } /* custom! */`}</style>
          <link rel='stylesheet' type='text/css' href='/static/nprogress.css' />

        </Head>
        <body className="font-sans text-black antialiased leading-tight bg-grey-lighter">
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
