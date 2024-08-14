import Link from "next/link";

export default function HomePage() {
    return (
        <div className="p-5 grid text-center space-x-2 lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
            <Link key="settle" className="shadow" href="/settle">
                <h2 className="mb-3 text-2xl font-semibold">Settle</h2>
                <p className="m-0 max-w-[30ch] text-sm opacity-50">
                    Registre pagos y comparta gastos entre amigos.
                </p>
            </Link>
            <Link key="settle_2" className="shadow" href="/settle">
                <h2 className="mb-3 text-2xl font-semibold">Settle</h2>
                <p className="m-0 max-w-[30ch] text-sm opacity-50">
                    Registre pagos y comparta gastos entre amigos.
                </p>
            </Link>
        </div>
    );
}
