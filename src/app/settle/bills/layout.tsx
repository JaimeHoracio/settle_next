import InfoSelectedMeet from "../components/info-selected-meet";
import HeadBill from "./components/head-bill";

export default function layoutSettle({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <InfoSelectedMeet></InfoSelectedMeet>
            <HeadBill></HeadBill>
            {children}
        </>
    );
}
