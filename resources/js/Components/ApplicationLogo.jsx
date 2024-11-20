import { Link } from "@inertiajs/react";

export default function ApplicationLogo(props) {
    return (
        <Link href="/">
            <div className="w-12 h-12 rounded-full overflow-hidden m-2">
                <img
                    src="/storage/images/jobly.png"
                    alt="Jobly Logo"
                    className="w-full j-full"
                />
            </div>
        </Link>
    );
}
