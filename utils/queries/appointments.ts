export default async function getAppointments(values: any) {
    const res = await fetch(`/api/getAppointments`, {
        method: "POST",
        body: JSON.stringify({ center: values }),
    }).then(r => r.json());

    return res;
}