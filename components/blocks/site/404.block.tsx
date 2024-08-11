import Button from "@/components/Button";
import Link from "next/link";

export default function X404() {
    return (
        <div className="flex flex-col w-full h-full items-center justify-center">
            <div className="font-bold text-4xl">404 | Page Not Found</div>
            <Link href="/">
                <Button
                    accessibleName="Go to Home"
                    className="btn btn-primary m-10">Go to Home</Button>
            </Link>
        </div>
    );
}
