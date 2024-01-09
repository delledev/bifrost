import getAllApplications from './getAllApplications';
import getUserById from './getUserById';

export default async function getAllApplicationsToObject(token) {
  const headersList = {
    Accept: '*/*',
    'Content-Type': 'application/json',
    authorization: `Bearer ${token}`,
  };

  const res_applications = await getAllApplications(token);
  if (!res_applications.success) {
    return { success: false, message: res_applications?.message };
  }

  const non_applications = res_applications?.applications;

  const applicationPromises = non_applications.map(async (appl) => {
    const userRes = await getUserById(token, appl?.userId);
    if (userRes.success) {
      const user = userRes?.user;
      return {
        id: appl.id,
        userId: user.id,
        userSince: appl.userSince,
        totalAssetValueInTRY: appl.totalAssetValueInTRY,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
      };
    }
  });

  const applications = await Promise.all(applicationPromises);

  return { success: true, allApplications: applications.filter(Boolean) };
}
