import { useState, useEffect } from 'react';
import JobListing from './JobListing';
import Spinner from './Spinner';

const JobListings = ({ isHome = false }) => {
    // const JobListings = isHome ? jobs.splice(0, 3) : jobs;
    const [jobs, setJobs] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJobs = async () => {
            const apiUrl = isHome ? '/api/jobs?_limit=3'
            : '/api/jobs';
            try {
                const res = await fetch(apiUrl);
                const data = await res.json();
                setJobs(data);
            } catch (e) {
                console.log('Error fetching jobs');
            } finally {
                setLoading(false);
            }
        };
        fetchJobs();
    }, [])
    console.log(jobs);
    return (
        <div>
            <section className="bg-blue-50 py-4">
                <div className="container mx-auto px-4">
                    <div className="relative">
                        <input
                            type="text"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                            placeholder="Filter jobs..."
                        />
                    </div>
                </div>
            </section>


            <section className="bg-blue-50 px-4 py-10">
                <div className="container-xl lg:container m-auto">
                    <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
                        {isHome ? 'Recent Jobs' : 'Browse Jobs'}
                    </h2>
                    {loading ? (<Spinner loading={loading} />) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                            {jobs.map((job) => (
                                <JobListing key={job.id} job={job} />
                            ))}
                        </div>)}


                </div>
            </section>
        </div>
    )
}

export default JobListings
