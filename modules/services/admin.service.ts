import { adminRepository } from '../repositories/admin.repository';

export const adminService = {
    // get user
    deleteUserById: async function (userId: string) {
        return await adminRepository.deleteUserById(userId);
    },
};
