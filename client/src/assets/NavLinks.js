import { IoBarChartSharp } from 'react-icons/io5';
import { MdQueryStats } from 'react-icons/md';
import { FaWpforms } from 'react-icons/fa';
import { ImProfile } from 'react-icons/im';
import { FaSave } from "react-icons/fa";


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
    {
        id: 1,
        text: 'all jobs',
        path: '/dashboard',
        icon: <MdQueryStats />,
    },
    {
        id: 2,
        text: 'saved jobs',
        path: '/dashboard/saved-jobs',
        icon: <FaSave />,
    },
    {
        id: 3,
        text: 'profile',
        path: 'profile',
        icon: <ImProfile />,
    }
]