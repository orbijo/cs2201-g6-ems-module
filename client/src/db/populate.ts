import { getDateString } from '../helpers/functions';
import { db } from './db';

export async function populate() {
    await db.user.bulkAdd([
        {
            id_num: 20102222,
            first_name: 'Sadge',
            last_name: 'Student',
            email: '20102222@usc.edu.ph',
            password: 'password123',
            role: 'PARTICIPANT',
            deleted_at: getDateString(),
            updated_at: getDateString(),
        },
        {
            id_num: 1001500,
            first_name: 'Lab Tech',
            last_name: 'One',
            email: '1001500@usc.edu.ph',
            password: '!password2023',
            role: 'ORGANIZER',
            deleted_at: getDateString(),
            updated_at: getDateString(),
        },
        {
            id_num: 9999,
            first_name: 'Admin',
            last_name: 'Admin',
            email: '9999@usc.edu.ph',
            password: 'admin',
            role: 'APPROVER',
            deleted_at: getDateString(),
            updated_at: getDateString(),
        },
    ])
}