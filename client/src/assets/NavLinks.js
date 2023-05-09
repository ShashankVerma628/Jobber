import { IoBarChartSharp } from 'react-icons/io5';
import { MdQueryStats } from 'react-icons/md';
import { FaWpforms } from 'react-icons/fa';
import { ImProfile } from 'react-icons/im';


export const clientNavLinks = [
    {
        id: 1,
        text: 'stats',
        path: '/client/dashboard',
        icon: <IoBarChartSharp />,
    },
    {
        id: 2,
        text: 'all jobs',
        path: '/client/dashboard/all-jobs',
        icon: <MdQueryStats />,
    },
    {
        id: 3,
        text: 'add job',
        path: '/client/dashboard/add-job',
        icon: <FaWpforms />,
    },
    {
        id: 4,
        text: 'profile',
        path: '/client/dashboard/profile',
        icon: <ImProfile />,
    },
]

export const candidateNavLinks = [

]