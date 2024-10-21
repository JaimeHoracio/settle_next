import FooterSettle from "./footer";
import HeadSettle from "./header";
import SideNav from "./nav-settle/sidenav";

export default function layoutSettle({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="bg-blue-200 max-w-6xl mx-auto p-1 flex min-h-screen flex-col items-center justify-between">
            <HeadSettle></HeadSettle>
            <section className="w-full flex h-screen flex-col md:flex-row md:overflow-hidden">
                <SideNav />
                <div className="flex-grow p-4 md:overflow-y-auto md:p-12">
                    {children}
                </div>
            </section>
            <FooterSettle></FooterSettle>
        </main>
    );
}
