export const getAge = (dobString: string): number => {
    const dob = new Date(dobString);
    const today = new Date();

    if (isNaN(dob.getTime())) {
        throw new Error("Invalid date format. Use 'YYYY-MM-DD'.");
    }

    let age = today.getFullYear() - dob.getFullYear();

    const hasHadBirthdayThisYear =
        today.getMonth() > dob.getMonth() ||
        (today.getMonth() === dob.getMonth() && today.getDate() >= dob.getDate());

    if (!hasHadBirthdayThisYear) {
        age--;
    }

    return age;
}