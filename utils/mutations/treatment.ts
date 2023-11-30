export default async function scheduleTreatment(values: any) {
    const res = await fetch(`/api/scheduleTreatment`, {
        method: "POST",
        body: JSON.stringify(values),
    });

    return res.json();
}