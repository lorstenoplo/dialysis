export default async function getTreatments(values: any) {
    const res = await fetch(`/api/getTreatments`, {
        method: "POST",
        body: JSON.stringify({ center: values }),
    }).then(r => r.json());

    return res;
}