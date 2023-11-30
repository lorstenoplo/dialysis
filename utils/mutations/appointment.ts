export default async function scheduleAppointment(values: any) {
    const res = await fetch(`/api/scheduleAppointment`, {
        method: "POST",
        body: JSON.stringify(values),
    });

    return res.json();
}