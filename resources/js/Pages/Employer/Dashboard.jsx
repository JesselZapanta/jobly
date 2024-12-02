import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth,role }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    {role} Dashboard
                </h2>
            }
            auth={auth}
        >
            <Head title="Dashboard" />

            <div className="pt-4 pb-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {role} Dashboard
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
