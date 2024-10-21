import InfoSelectedMeet from "@/app/settle/components/info-selected-meet";

export default function layoutSettle({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <InfoSelectedMeet></InfoSelectedMeet>
            {children}
        </>
    );
}
