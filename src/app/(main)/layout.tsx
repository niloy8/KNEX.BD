
import Footer from "./fotter";
import Header from "./header";

export default function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Header></Header>
            {children}
            <Footer></Footer>
        </>
    );
}