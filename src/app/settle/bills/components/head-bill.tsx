import Link from "next/link";
import { Label } from "@radix-ui/react-label";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { ADD_BILL_URL } from "@/app/settle/components/constants";

export default function HeadBill() {
    return (
        <div className="flex flex-row justify-between mt-2">
            <Label>Lista de Pagos</Label>
            <Link className="pr-2" href={ADD_BILL_URL}>
                <PlusCircledIcon></PlusCircledIcon>
            </Link>
        </div>
    );
}
