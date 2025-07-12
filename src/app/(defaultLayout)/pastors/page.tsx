import PastoreCard from "@/components/modules/Pastores/PastoreCard";


const page = () => {
    return (
        <div className="my-6 bg-secondary p-6 rounded-lg">
            <h2 className="md:text-2xl text-xl font-semibold mb-6">Leader & Pastors</h2>

            <PastoreCard />
        </div>
    );
};

export default page;