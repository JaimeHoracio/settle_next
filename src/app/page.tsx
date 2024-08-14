import LoginPage from "./login/login";

export default function Home() {
    return (
        <section className="w-full flex h-screen flex-col md:flex-row md:overflow-hidden">
            <LoginPage></LoginPage>
        </section>
    );
}
