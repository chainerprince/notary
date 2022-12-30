import '../styles/globals.css'
import '../styles/bootstrap.min.css'
import '../styles/Home.module.css'
import { wrapper } from '../state/store';


function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default  wrapper.withRedux(MyApp);
