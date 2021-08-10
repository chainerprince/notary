 import Document ,{Html,Head,Main,NextScript} from 'next/document'
class Mydocument extends Document{
    static async getInitialProps(ctx){
        const initialProps = await Document.getInitialProps(ctx);
        return {...initialProps};
    }
    render(){
        return (
            <Html>
                <Head>
                {/* <link rel="stylesheet" type="text/css" href="bootstrap.min.css" /> */}
                <link
                        rel="stylesheet"
                        type="text/css"
                        href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
                    />

                </Head>
                
                <body>
                    <Main/>
                    <NextScript />
                    <script src="/jquery.min.js" ></script>
                     <script src="/bs.js" ></script>
                </body>

            </Html>
        )
    }
}
export default Mydocument;